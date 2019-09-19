import React from 'react';
import axios from 'axios';
import {IspCpConfig} from "./IspCpConfig";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import NativeSelect from '@material-ui/core/NativeSelect';
import {slugify} from 'transliteration';


var he = require('he');


export default class Issues extends React.Component {
    updateTimeout = 10000;

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            data   : []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(event.currentTarget);
        window.Target = event.currentTarget;

        // if (event.currentTarget.dataset.report) {
        //     var issueForm = document.querySelector("form#issue-report");
        //     console.log("Report : " + issueForm.comment.value);
        //     this.reportIssue(issueForm.comment.value);
        // }
        if (event.currentTarget.dataset.update) {
            // var issueForm = document.querySelector("form#issue-edit-" + event.currentTarget.dataset.update);
            console.log("Udate " + event.currentTarget.dataset.update);
            // window.issueForm = issueForm;
            // this.updateIssue(event.currentTarget.dataset.update, issueForm.comment.value);
        }
        if (event.currentTarget.dataset.resolve) {
            // var issueForm = document.querySelector("form#issue-edit-" + event.currentTarget.dataset.resolve);
            console.log("Resolve " + event.currentTarget.dataset.resolve);
            // this.resolveIssue(event.currentTarget.dataset.resolve);
        }
    }

    reportIssue(comment) {
        let url = IspCpConfig.ApiRootRequest("/issues/report/?comment=" + comment);
        axios.get(url).then(
            result => {
                this.componentDidMount()
            }
        );
    }

    resolveIssue(id) {
        let url = IspCpConfig.ApiRootRequest("/issues/resolve/" + id);
        axios.get(url).then(
            result => {
                this.componentDidMount()
            }
        );
    }

    updateIssue(id, comment) {
        let url = IspCpConfig.ApiRootRequest("/issues/update/" + id + "?comment=" + comment);
        axios.get(url).then(
            result => {
                this.componentDidMount()
            }
        );
    }


    componentDidMount() {
        let apiPath = IspCpConfig.ApiRootRequest("/issues/");
        let location = this.props.location.pathname;
        if (location.startsWith("/issues/") && location.length > "/issues/".length) {
            apiPath = IspCpConfig.ApiRootRequest(location);
        }

        axios.get(apiPath)
             .then(
                 result => {
                     this.setState({
                         success: result.data.success,
                         data   : result.data.index
                     });
                     // console.log(result);
                 }
             )
    }

    render() {
        if (this.state.success) {
            const data = JSON.parse(this.state.data);
            // setTimeout(this.componentDidMount, this.updateTimeout);
            return (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Issue</TableCell>
                            <TableCell>Reported </TableCell>
                            <TableCell>Resolved</TableCell>
                            <TableCell>Comment</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{data.map(issue =>
                        <TableRow key={"issue-" + issue.id}>
                            <TableCell>{issue.id}</TableCell>
                            <TableCell>{new Date(parseInt(issue.report_date) * 1000).toLocaleDateString()}</TableCell>
                            <TableCell>
                                {
                                    (issue.resolve_date > 0)
                                        ? new Date(parseInt(issue.resolve_date) * 1000).toLocaleDateString()
                                        : ''
                                }
                            </TableCell>
                            <TableCell>
                                <AddressList location={"/terms/15"} id={"address-" + issue.id} value={0}/>
                                <HousesList location={"/terms/16"} id={"address-" + issue.id} value={0}/>
                                <ApartmentsList location={"/terms/19"} id={"address-" + issue.id} value={0}/>
                            </TableCell>
                            <TableCell>
                                <TextField
                                    label="Комментарий"
                                    id={"comment-" + issue.id}
                                    defaultValue={issue.comment ? he.decode(issue.comment) : ''}
                                    margin="normal"
                                    variant="outlined"
                                /></TableCell>
                            <TableCell>
                                <ButtonGroup size="small">
                                    <Button type="button" onClick={this.handleSubmit} data-update={issue.id}
                                            color="primary">
                                        UPDATE
                                    </Button>
                                    <Button type="button" onClick={this.handleSubmit} data-resolve={issue.id}
                                            color="secondary">
                                        RESOLVE
                                    </Button>
                                </ButtonGroup>
                            </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            );
        }
        return ('');
    }
}

class AddressList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            term    : {},
            children: []
        };
        this.apiPath = IspCpConfig.ApiRootRequest("/terms/");
        this.location = props.location;
    }

    componentDidMount() {

        if (this.location.startsWith("/terms/") && this.location.length > "/terms/".length) {
            this.apiPath = IspCpConfig.ApiRootRequest(this.location);
        }

        axios.get(this.apiPath)
             .then(
                 result => {
                     console.log(result);
                     this.setState({
                         term    : result.data.term,
                         children: result.data.children
                     });
                 }
             )
             .catch(reason => {
                 console.log("Axios error: " + reason)
             })
        ;
    }

    render() {
        return (
            <NativeSelect
                id={this.props.id}
                value={this.props.value}
            >
                {this.state.children.map(child =>
                    <option key={child.id} value={child.id} data-slug={slugify(child.title)}>{child.title}</option>
                )}
            </NativeSelect>
        );
    }
}

class HousesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            term    : {},
            children: []
        };
        this.apiPath = IspCpConfig.ApiRootRequest("/terms/");
        this.location = props.location;
    }

    componentDidMount() {

        if (this.location.startsWith("/terms/") && this.location.length > "/terms/".length) {
            this.apiPath = IspCpConfig.ApiRootRequest(this.location);
        }

        axios.get(this.apiPath)
             .then(
                 result => {
                     console.log(result);
                     this.setState({
                         term    : result.data.term,
                         children: result.data.children
                     });
                 }
             )
             .catch(reason => {
                 console.log("Axios error: " + reason)
             })
        ;
    }

    render() {
        return (
            <NativeSelect
                id={this.props.id}
                value={this.props.value}
            >
                {this.state.children.map(child =>
                    <option key={child.id} value={child.id} data-slug={slugify(child.title)}>{child.title}</option>
                )}
            </NativeSelect>
        );
    }
}

class ApartmentsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            term    : {},
            children: []
        };
        this.apiPath = IspCpConfig.ApiRootRequest("/terms/");
        this.location = props.location;
    }

    componentDidMount() {

        if (this.location.startsWith("/terms/") && this.location.length > "/terms/".length) {
            this.apiPath = IspCpConfig.ApiRootRequest(this.location);
        }

        axios.get(this.apiPath)
             .then(
                 result => {
                     console.log(result);
                     this.setState({
                         term    : result.data.term,
                         children: result.data.children
                     });
                 }
             )
             .catch(reason => {
                 console.log("Axios error: " + reason)
             })
        ;
    }

    render() {
        return (
            <NativeSelect
                id={this.props.id}
                value={this.props.value}
            >
                {this.state.children.map(child =>
                    <option key={child.id} value={child.id} data-slug={slugify(child.title)}>{child.title}</option>
                )}
            </NativeSelect>
        );
    }
}