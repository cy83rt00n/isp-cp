import React from 'react';
import axios from 'axios';
import IspCpConfig from "../IspCpConfig";
import {slugify} from 'transliteration';
import {
    Box,
    Button,
    FormControl,
    Grid,
    Input,
    InputLabel,
    List,
    makeStyles,
    NativeSelect,
    TextField
} from "@material-ui/core";

import Term from "../models/Term";
import TermsListItem from "./TermsListItem";

var he = require('he');

export default class Terms extends React.Component {

    updateTimeout;

    constructor(props) {
        super(props);
        console.log("I'm constructor");
        this.state = {
            success: false,
            terms: [],
            create: new Term({})
        };
        console.log("My state is " + JSON.stringify(this.state));
        this.updateTimeout = 10000;
        this.onSubmit = this.onSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onParentSelect = this.onParentSelect.bind(this);
        this.setInitialState = this.setInitialState.bind(this);
        this.setInitialState();
        this.styles = makeStyles(theme => ({
            root: {
                width: '100%',
                maxWidth: 360,
                backgroundColor: theme.palette.background.paper,
            },
            nested: {
                paddingLeft: theme.spacing(4),
            },
        }));
    }

    createTerm(eventTarget) {
        let url = IspCpConfig.ApiRequest("/terms/create/");
        axios.get(url, {
            params: {
                email: axios.defaults.params.email,
                password: axios.defaults.params.password,
                slug: eventTarget.slug.value,
                title: eventTarget.title.value,
                parent: eventTarget.parent.value
            }
        }).then(
            result => {
                this.setState({
                    create: new Term({})
                });
                this.componentDidMount();
            })
    }

    deleteTerm(id) {
        let url = IspCpConfig.ApiRequest("/terms/delete/");
        axios.get(url, {
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
        console.log(event.currentTarget.dataset.delete);
        event.preventDefault();
        if (event.target.create) {
            this.createTerm(event.target);
        }
        if (event.currentTarget.dataset.delete) {
            this.deleteTerm(event.currentTarget.dataset.delete);
        }
    }

    onParentSelect(event) {

        console.log(event.target.value);
        let slice = this.state.create;
        slice.parentId = event.target.value;
        slice.slug = slugify(event.target.selectedOptions.item(0).textContent);
        const create = slice;
        this.setState({
            create: create
        });
    }


    componentDidMount() {

        console.log("I'm diMount");
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
                    console.log("Did mount api result : " + JSON.stringify(result));
                    this.setState({
                        success: result.data.success,
                        terms: result.data.terms,
                        create: {children: [new Term({})].concat(result.data.terms)}
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
        console.log("I'm render");
        console.log(this.state);
        // setTimeout(this.componentDidMount, this.updateTimeout);

        const list = (state) => {
            console.log("Im arow list func");
            console.log(state);
            if (state.success === false) {
                return ('');
            } else {
                return (
                    <List component={"div"}>
                        {state.terms.map(term => {
                            return (
                                <TermsListItem key={term.id} term={term}
                                               handleDeleteTerm={this.onSubmit}></TermsListItem>
                            )
                        })}
                    </List>
                )
            }
        };

        return (
            <Box component={"div"}>
                {list(this.state)}
                <TermsForm
                    term={this.state.create}
                    onSubmit={this.onSubmit}
                    onChange={this.onParentSelect}
                />
            </Box>
        );
    }
}

const termsFormStyles = makeStyles(theme => ({
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
    const classes = termsFormStyles();
    console.log("Form props : " + JSON.stringify(props));

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
                            value={props.term.parentId}
                        >
                            <TermsOptionsList key={"terms-options-list" + props.term.id} term={props.term}/>
                        </NativeSelect>
                    </FormControl>
                </Grid>
                <Grid key={2} item>
                    <Button data-create={0} type={"submit"} variant={"outlined"} color={"primary"}
                            size={"large"}>SUBMIT</Button>
                </Grid>
            </Grid>

            <Input type={"hidden"} name={"create"} value={0}/>
            <Input type={"hidden"} name={"slug"} value={props.term.slug}/>


        </Box>
    );
}

function TermsOptionsList(props) {
    console.log(props.term);
    if (props.term.children.length === 0) {
        return (
            <option key={"terms-option" + props.term.id} value={props.term.id}
                    data-slug={slugify(props.term.title)}>{props.term.title}</option>
        );
    } else {
        console.log("ImOptionsList");
        console.log(props.term);
        return ([
            props.term.id && <option key={"terms-option" + props.term.id} value={props.term.id}>{props.term.title}</option>,

            props.term.children.map(child =>
                <TermsOptionsList key={"terms-options-list" + child.id} term={child}/>
            )

        ]);
    }
}



