import React from 'react';
import {BrowserRouter as Router, Link as RLink, Route} from "react-router-dom";
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
            term: {},
            children: {},
            create: Term
        };
        this.updateTimeout = 10000;
        this.onSubmit = this.onSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onParentSelect = this.onParentSelect.bind(this);
    }

    createTerm(slug, title, parent) {
        let url = IspCpConfig.ApiRequest(
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
        let url = IspCpConfig.ApiRequest("/terms/delete/" + id);
        axios.get(url).then(
            result => {
                this.componentDidMount();
            })
    }

    onSubmit(event) {
        event.preventDefault();
        if (event.target.create)
            this.createTerm(event.target.slug.value, event.target.title.value, event.target.parent.value);
        if (event.currentTarget.dataset.delete)
            this.deleteTerm(event.currentTarget.dataset.delete);
    }

    onParentSelect(event) {

        this.setState({
            create : new Term({
                parentId: event.target.value,
                slug:event.target.selectedOptions.item(0).dataset.slug
            })
        });
        // this.state.create.parentId = event.target.value;
        // this.state.create.slug = event.target.selectedOptions.item(0).dataset.slug;

        console.log(this.state.create);
    }


    componentDidMount() {
        let apiPath = IspCpConfig.ApiRequest("/terms/");
        let location = this.props.location.pathname;
        if (location.startsWith("/terms/") && location.length > "/terms/".length) {
            apiPath = IspCpConfig.ApiRequest(location);
        }

        axios.get(apiPath, {
            params: axios.defaults.params
        })
            .then(
                result => {
                    console.log(result);
                    this.setState({
                        success: result.data.success,
                        term: result.data.term,
                        children: result.data.children,
                        create: new Term({parentId: result.data.term.id, slug: slugify(result.data.term.title)})
                    });
                }
            )
            .catch(reason => {
                console.log(reason)
            })
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps.location);
        console.log(this.props.location);
        if (this.props.location !== prevProps.location) {
            this.componentDidMount();
        }
    }

    render() {

        const {term} = this.state.term;
        const {children} = this.state.children;
        if (this.state.success) {
            // setTimeout(this.componentDidMount, this.updateTimeout);

            return (
                <div>
                    <List>
                        {this.state.children.map(child =>
                            <TermsListItem key={child.id} id={child.id} title={child.title} slug={child.slug} onClick={this.onSubmit}/>
                        )}
                    </List>
                    <TermsForm
                        term={this.state.term}
                        slug={this.state.create.slug}
                        parentId={this.state.create.parentId}
                        title={this.state.create.title}
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

function TermsListItem(props) {
    if (!props.id) return '';
    return(
        <ListItem>
            <Link to={"/terms/" + props.id} component={RLink}>{props.title}</Link>
            <Button type={"button"} data-delete={props.id} onClick={props.onClick}>DELETE</Button>
        </ListItem>
    );
}

function TermsForm(props) {
    const term = props.term || {id: false};
    const children = props.children || [];

    return (
        <form onSubmit={props.onSubmit}>
            <Input type={"hidden"} name={"create"} value={0}/>
            <Input type={"hidden"} name={"slug"} value={props.slug}/>
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
                >
                    <option key={0} value={0} data-slug={"root"}>Корень</option>
                    {term.id && <option key={term.id} value={term.id}>{term.title}</option>}
                    {children.map(child =>
                        <option key={child.id} value={child.id} data-slug={slugify(child.title)}>{child.title}</option>
                    )}
                </NativeSelect>
            </FormControl>
            <Button data-create={0} type={"submit"} variant={"outlined"} color={"primary"}
                    size={"large"}>SUBMIT</Button>
        </form>
    );
}



