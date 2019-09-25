import React from 'react';
import {BrowserRouter as Router, Link as RLink, Route} from "react-router-dom";
import axios from 'axios';
import IspCpConfig from "../IspCpConfig";
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
    TextField,
    Grid,
    Paper,
    makeStyles
} from "@material-ui/core";

import Term from "../models/Term";

var he = require('he');

export default class Terms extends React.Component {

    updateTimeout;

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            term: {},
            children: [],
            create: Term
        };
        this.updateTimeout = 10000;
        this.onSubmit = this.onSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onParentSelect = this.onParentSelect.bind(this);
        this.setInitialState = this.setInitialState.bind(this);
        this.setInitialState();
    }

    createTerm(slug, title, parent) {
        let url = IspCpConfig.ApiRequest("/terms/create/");
        axios.get(url,{
            params: {
                email: axios.defaults.params.email,
                password: axios.defaults.params.password,
                slug: slug,
                title: title,
                parent: parent
            }
        }).then(
            result => {
                this.componentDidMount();
            })
    }

    deleteTerm(id) {
        let url = IspCpConfig.ApiRequest("/terms/delete/");
        axios.get(url,{
            params: {
                email: axios.defaults.params.email,
                    password: axios.defaults.params.password,
                    id: id
            }
        }).then(
            result => {
                this.componentDidMount();
            })
    }

    onSubmit(event) {
        event.preventDefault();
        console.log(event.target);
        const Target = event.target;
        const CurTarget = event.currentTarget;
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
            params: {
                email: axios.defaults.params.email,
                password: axios.defaults.params.password
            }
        })
            .then(
                result => {
                    console.log(result);
                    this.setState({
                        success: result.data.success,
                        term: result.data.term,
                        children: result.data.children,
                        create: Term
                    });
                }
            )
            .catch(reason => {
                console.log(reason)
            })
    }

    setInitialState() {
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
        } else {
            return (
                <div>
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

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
}));

function TermsForm(props) {
    const term = props.term || {id: false};
    const children = props.children || [];
    const classes = useStyles();

    return (
       <Box component={"form"} onSubmit={props.onSubmit} variant={"outlined"}>

            <Grid container justify="flex-start" spacing={4}>
                <Grid key={0} item>
                    <TextField
                    label={"Название"}
                    name={"title"}
                    defaultValue={''}
                    variant={"standard"}
                >
                </TextField>
                </Grid>
                <Grid key={1} item>
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
                </Grid>
                <Grid key={2} item>
                    <Button data-create={0} type={"submit"} variant={"outlined"} color={"primary"}
                            size={"large"}>SUBMIT</Button>
                </Grid>
            </Grid>

            <Input type={"hidden"} name={"create"} value={0}/>
            <Input type={"hidden"} name={"slug"} value={props.slug}/>



       </Box>
    );
}



