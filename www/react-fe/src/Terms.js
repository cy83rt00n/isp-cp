import React from 'react';
import axios from 'axios';
import IspCpConfig from "./IspCpConfig";
import {slugify} from 'transliteration';

var he = require('he');


export default class Terms extends React.Component {
    updateTimeout = 10000;

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            data: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(event.target.type);
        if (event.target.create)
            this.createTerm(event.target.slug.value, event.target.title.value, event.target.parent.value);
        if (event.target.dataset.delete)
            this.deleteTerm(event.target.dataset.delete);
    }

    createTerm(slug, title, parent) {
        let url = IspCpConfig.ApiRootRequest(
            "/terms/create/" +
            "?slug=" + slug +
            "&title=" + title +
            "&parent=" + parent
        );
        axios.get(url);
        // console.log(url);
        this.componentDidMount();
    }

    deleteTerm(id) {
        let url = IspCpConfig.ApiRootRequest("/terms/delete/" + id);
        axios.get(url);
        this.componentDidMount();
    }

    onParentSelect(event) {
        let value = event.target.selectedOptions.item(0).value;
        let slug = '';
        if (parseInt(value) === 0) {
            slug = "root";
        } else {
            slug = slugify(event.target.selectedOptions.item(0).textContent);
        }
        document.querySelector("input[name=slug]").value = slug;
    }


    componentDidMount() {
        let path = '/terms/root';
        if (window.location.pathname.startsWith("/terms"))
            path = IspCpConfig.ApiRootRequest(window.location.pathname);

        axios.get(path)
            .then(
                result => {
                    this.setState({
                        success: result.data.success,
                        data: result.data.data
                    });
                }
            )
            .catch(reason => {
                console.log(reason)
            })
    }

    render() {
        if (this.state.success) {
            const {term} = this.state.data;
            const {children} = this.state.data;
            setTimeout(this.componentDidMount, this.updateTimeout);

            return (
                <div>
                    <Term id={term.id} title={term.title} slug={term.slug}/>
                    {children.map(child =>
                        <Term id={child.id} title={child.title} slug={child.slug} onclick={this.handleSubmit}/>
                    )}
                    <form onSubmit={this.handleSubmit}>
                        <input type="hidden" name={"create"} defaultValue={0}/>
                        <input type={"text"} name={"title"} defaultValue={''}/>
                        <input type={"hidden"} name={"slug"} defaultValue={'root'}/>
                        <select name={"parent"} onChange={this.onParentSelect}>
                            <option value={0}>Корень</option>
                            <option value={term.id}>{term.title}</option>
                            {children.map(child =>
                                <option value={child.id} data-slug={child.slug}>{child.title}</option>
                            )}
                        </select>
                        <input type={"submit"} defaultValue={"create term"}/>
                    </form>
                </div>
            );
        }
        return ('');
    }
}

function Term(props) {
    if (props.id == 0) return '';
    return <div>
        <a href={"/terms/" + slugify(props.title)}>{props.id}. {props.title}</a>
        <button type={"button"} data-delete={props.id} onClick={props.onclick}>Удалить</button>
    </div>
}