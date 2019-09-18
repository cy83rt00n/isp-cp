import React from 'react';
import axios from 'axios';
import IspCpConfig from "./IspCpConfig";
import {slugify} from 'transliteration';
import {
    Box,
    Button,
    FormControl,
    Input,
    InputLabel,
    Link,
    List,
    ListItem,
    NativeSelect,
    TextField
} from "@material-ui/core";

import Term from "./models/Term";

var he = require('he');


export default class Terms extends React.Component {

    updateTimeout;

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            term: Term,
            children: {},
            create: Term
        };
        this.updateTimeout = 10000;
        this.onSubmit = this.onSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onParentSelect = this.onParentSelect.bind(this);
    }

    createTerm(slug, title, parent) {
        let url = IspCpConfig.ApiRootRequest(
            "/terms/create/" +
            "?slug=" + slug +
            "&title=" + title +
            "&parent=" + parent
        );
        axios.get(url).then(
            result => {
                this.componentDidMount();
            })
    }

    deleteTerm(id) {
        let url = IspCpConfig.ApiRootRequest("/terms/delete/" + id);
        axios.get(url).then(
            result => {
                this.componentDidMount();
            })
    }

    onSubmit(event) {
        event.preventDefault();
        console.log(event.currentTarget.type);
        if (event.currentTarget.dataset.create)
            this.createTerm(event.target.slug.value, event.target.title.value, event.target.parent.value);
        if (event.currentTarget.dataset.delete)
            this.deleteTerm(event.target.dataset.delete);
    }

    onParentSelect(event) {
        console.log(event.target.selectedOptions.item(0).dataset.slug);
        window.Selected = event.target.selectedOptions;
        console.log(this.state.create);
        this.state.create.setState({
            parentId: event.target.value,
            slug: event.target.selectedOptions.item(0).dataset.slug
        });
        console.log(this.state.create);
    }


    componentDidMount() {
        let apiPath = IspCpConfig.ApiRootRequest("/terms/root/");
        let location = window.location.pathname;
        if (location.startsWith("/terms/") && location.length > "/terms/") {
            apiPath = IspCpConfig.ApiRootRequest(window.location.pathname);
        }

        axios.get(apiPath)
            .then(
                result => {
                    this.setState({
                        success: result.data.success,
                        term: result.data.term,
                        children: result.data.children,
                        create: new Term({})
                    });
                    this.state.create.componentDidMount();
                }
            )
            .catch(reason => {
                console.log(reason)
            })
    }

    render() {
        const {term} = this.state.term;
        const {children} = this.state.children;
        if (this.state.success) {
            // setTimeout(this.componentDidMount, this.updateTimeout);
            console.log(this.state.create);
            return (
                <div>
                    <List>
                        <Term id={this.state.term.id} title={this.state.term.title} slug={this.state.term.slug}/>
                        {this.state.children.map(child =>
                            <Term id={child.id} title={child.title} slug={child.slug} onClick={this.onSubmit}/>
                        )}
                    </List>
                    <TermsForm
                        term={this.state.term}
                        slug={this.state.create.props.slug}
                        parentId={this.state.create.props.parentId}
                        title={this.state.create.props.title}
                        children={this.state.children}
                        onSubmit={this.onSubmit}
                        onChange={this.onParentSelect}
                    />
                </div>
            );
        }
        return ('');
    }

}


function TermsForm(props) {
    const term = props.term || {id: false};
    const children = props.children || [];

    return (
        <form onSubmit={props.onSubmit}>
            <Input type={"hidden"} name={"create"} value={0}/>
            <Input type={"hidden"} name={"slug"} id="new-term-slug" value={props.slug}/>
            <TextField
                label={"Название"}
                name={"title"}
                defaultValue={''}
                variant={"standard"}
            >
            </TextField>
            <FormControl>
                <InputLabel shrink htmlFor="parent-id-select">
                    Родитель
                </InputLabel>
                <NativeSelect
                    onChange={props.onChange}
                    inputProps={{
                        name: 'parent',
                        id: 'parent-id-select',
                    }}
                    value={props.parentId}
                    displayEmpty
                >
                    <option value={0} data-slug={"root"}>Корень</option>
                    {term.id && <option value={term.id} selected={true}>{term.title}</option>}
                    {children.map(child =>
                        <option value={child.id} data-slug={slugify(child.title)}>{child.title}</option>
                    )}
                </NativeSelect>
            </FormControl>
            <Button data-create={0} type={"submit"} variant={"outlined"} color={"primary"}
                    size={"large"}>SUBMIT</Button>
        </form>
    );
}
