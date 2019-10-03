import React from 'react';
import axios from 'axios';
import IspCpConfig from "../IspCpConfig";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from '@material-ui/core/TextField';
import ListItem from "@material-ui/core/ListItem";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {slugify} from 'transliteration';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import {ListItemText} from "@material-ui/core";
import NativeSelect from "@material-ui/core/NativeSelect";
import {serialize} from "react-serialize";
import IspCpHelper from "../IspCpHelper";
import IssueForm from "./IssueForm";
import Address from "../models/Address";
import Engineer from "../models/Engineer";
import Issue from "../models/Issue";
import IssueStatusSelect from "./IssueStatusSelect";

var he = require('he');

var issusesInstance;

export default class Issues extends React.Component {
    updateTimeout = 10000;
    modalFormOpen = true;

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            data: []
        };
        this.ispcpHelper = new IspCpHelper();
        this.passState = this.passState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.callUpdate = this.callUpdate.bind(this);
        issusesInstance = this;
    }

    callUpdate() {
        this.componentDidMount();
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(event.currentTarget);
        window.Target = event.currentTarget;

        if (event.currentTarget.dataset.update) {
            // var issueForm = document.querySelector("form#issue-edit-" + event.currentTarget.dataset.update);
            console.log("Udate " + event.currentTarget.dataset.update);
            // window.issueForm = issueForm;
            const comment = document.querySelector("#comment-" + event.currentTarget.dataset.update).value;
            this.updateIssue(event.currentTarget.dataset.update, comment);
        }
        if (event.currentTarget.dataset.resolve) {
            // var issueForm = document.querySelector("form#issue-edit-" + event.currentTarget.dataset.resolve);
            console.log("Resolve " + event.currentTarget.dataset.resolve);
            this.resolveIssue(event.currentTarget.dataset.resolve);
        }
    }

    resolveIssue(id) {
        new IspCpHelper().callApi("/issues/resolve/" + id, null, this.componentDidMount);
    }

    updateIssue(id, comment) {
        let report = {
            address: Address,
            engineer: Engineer,
            comment: comment
        };
        new IspCpHelper().callApi("/issues/update/" + id + "?comment=" + JSON.stringify(report), null, this.componentDidMount);
    }


    componentDidMount() {
        let apiPath = "/issues/";
        let location = this.props.location.pathname;
        if (location.startsWith("/issues/") && location.length > "/issues/".length) {
            apiPath = location;
        }
        new IspCpHelper().callApi(apiPath, null, this.passState);
    }

    passState = (response) => {
        response.data.index = JSON.parse(response.data.index);
        response.data.index.map((issue) => {
            const decoded = he.decode(issue.comment);
            var model = Object.assign(Issue,issue);
            try {
                const parsed = JSON.parse(decoded);
                if (typeof(parsed)==="object") {
                    Object.assign(model,parsed);
                } else {
                    model.comment = parsed
                }
            } catch (e) {
                model.comment = JSON.parse(decoded);
            }
            Object.assign(issue,model);
        })
        this.setState(() => {
            return {
                success: response.data.success,
                data: response.data.index
            }
        });

    };


    render() {
        if (this.state.success) {
            const data = this.state.data;
            console.log(data);
            // setTimeout(this.componentDidMount, this.updateTimeout);
            return (
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Issue</TableCell>
                                <TableCell>Reported </TableCell>
                                <TableCell>Resolved</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Engineer</TableCell>
                                <TableCell>Comment</TableCell>
                                <TableCell>
                                    <IssueForm afterReport={this.callUpdate}/>
                                </TableCell>
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
                                </TableCell>
                                <TableCell>
                                    {issue.address.city.title} /
                                    {issue.address.street.title} /
                                    {issue.address.home.title} /
                                    {issue.address.flat.title}
                                </TableCell>
                                <TableCell>
                                    {issue.engineer.title}
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        label="Комментарий"
                                        id={"comment-" + issue.id}
                                        defaultValue={issue.comment}
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
                </Paper>
            );
        }
        return ('');
    }
}



