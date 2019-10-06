import React from 'react';
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {slugify} from 'transliteration';
import IspCpHelper from "../IspCpHelper";
import IssueForm from "./IssueForm";

import Issue from "../models/Issue";
import IssueStatusSelect from "./IssueStatusSelect";
import IssueStatus from "../models/IssueStatus";
import IssueUpdateReport from "../models/IssueUpdateReport";
import IssueHistory from "./IssueHistory";
import Box from "@material-ui/core/Box";

const HTMLEntity = require("html-entities");
const IsJSON = require("is-json");
const dateformat = require("dateformat");

export default class Issues extends React.Component {
    updateTimeout = 10000;
    modalFormOpen = true;

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            data: [],
            issues: [],
        };
        this.getList();
    }

    getList = () => {
        IspCpHelper.debug("get list action");
        let apiPath = "/issues/";
        let location = this.props.location.pathname;
        if (location.startsWith("/issues/") && location.length > "/issues/".length) {
            apiPath = location;
        }
        IspCpHelper.callApi(apiPath).then(this.passState);
    }

    passState = (response) => {
        IspCpHelper.debug("passing state to component");
        IspCpHelper.debug(response);

        var index = response.data.index;

        index.map((index_entry, index_key) => {
            try {
                let issue = Object.assign(new Issue(),index_entry);
                let comment = JSON.parse(HTMLEntity.AllHtmlEntities.decode(index_entry.comment));

                if (typeof comment === "object") {
                    issue = Object.assign(issue, comment);
                } else {
                    issue.comment = comment;
                }

                issue.report_ts = issue.report_date || issue.report_ts;
                issue.resolve_ts = issue.resolve_date || issue.report_ts;
                issue.exec_ts = issue.execution_date || issue.exec_ts;
                issue.report_status = Object.assign(new IssueStatus(),issue.report_status);
                issue.history = issue.history || [];

                Object.assign(index[index_key],issue);

            } catch (e) {
                IspCpHelper.debug(e);
            }
        });

        this.setState(
            {
                success: response.data.success,
                data: index,
                issues: index
            });

    };

    handleSubmit = (event) => {
        event.preventDefault();
        IspCpHelper.debug(event.currentTarget);

        if (event.currentTarget.dataset.update) {
            IspCpHelper.debug(event.currentTarget.dataset.update);

            const issue = this.state.issues.find(index_entry=>{
                return index_entry.id == event.currentTarget.dataset.update
            });

            let history = issue.history || [];
            let report = {
                address: issue.address,
                engineer: issue.engineer,
                comment: issue.comment,
                report_status: issue.report_status,
                execution_date: (typeof issue.execution_date === "string")?new Date(issue.execution_date).getTime()/1000:issue.execution_date
            };
            Object.assign(report,{history:history.concat(JSON.stringify(report))});
            IspCpHelper.debug(report);
            this.updateIssue(event.currentTarget.dataset.update, report);
        }
        if (event.currentTarget.dataset.resolve) {
            IspCpHelper.debug("Resolve " + event.currentTarget.dataset.resolve);
            this.resolveIssue(event.currentTarget.dataset.resolve);
        }
    }

    resolveIssue = (id) => {
        IspCpHelper.callApi("/issues/resolve/" + id).then(this.getList);
    }

    updateIssue(id, report) {
        const data = {
            comment: JSON.stringify(report)
        }
        IspCpHelper.callApi("/issues/update/" + id,data ).then(this.getList);
    }

    onStatusSelect = (event) => {
        IspCpHelper.debug(event.target.value);
        IspCpHelper.debug(event.target.dataset);
        const issue = this.state.issues.find(index_entry=>{
            return index_entry.id === event.target.dataset.issue_id
        });
        let report_status = new IssueStatus();
        let report = new IssueUpdateReport();
        let history = issue.history || [];
        report.address = issue.address;
        report.engineer = issue.engineer;
        report.comment = issue.comment;
        report.execution_date = (typeof issue.execution_date === "string")?new Date(issue.execution_date).getTime()/1000:issue.execution_date;
        report_status.id = event.target.value;
        report_status.title= event.target.selectedOptions.item(0).text;
        IspCpHelper.debug(report_status);
        report.report_status = report_status;
        IspCpHelper.debug(report);
        Object.assign(report,{history:history.concat(JSON.stringify(report))});
        this.updateIssue(issue.id,report);
    }

    onCommentTextChange = (event) => {
        IspCpHelper.debug(event.target.value);
        IspCpHelper.debug(event.target.dataset.issue_id);
        const issue = this.state.issues.find(index_entry=>{
            return index_entry.id === event.target.dataset.issue_id
        });
        issue.comment = event.target.value;
    }

    onChangeExecutionDate = (event) => {
        IspCpHelper.debug(event.target.value)
        IspCpHelper.debug(new Date(event.target.value).getTime()/1000)
        IspCpHelper.debug(event.target.dataset.issue_id);
        const issue = this.state.issues.find(index_entry=>{
            return index_entry.id === event.target.dataset.issue_id
        });
        issue.execution_date= new Date(event.target.value).getTime()/1000;
    }


    render() {
        IspCpHelper.debug("component render");
        if (this.state.success) {
            const index = this.state.issues;

            IspCpHelper.debug(index);
            return (
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Issue</TableCell>
                                <TableCell>Reported </TableCell>
                                <TableCell>Resolved</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Engineer</TableCell>
                                <TableCell>Execution date</TableCell>
                                <TableCell>Comment</TableCell>
                                <TableCell>Action</TableCell>
                                <TableCell>
                                    <IssueForm afterReport={this.getList}/>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{index.map((index_entry, index_key) => {
                            const execution_date = () => {
                                if (index_entry.execution_date == undefined || index_entry.execution_date == "") {
                                    return undefined;
                                } else {
                                    let date = new Date(index_entry.execution_date * 1000);
                                    return dateformat(date,"yyyy-mm-dd");
                                }
                            }
                            IspCpHelper.debug(execution_date());
                            return (
                                <TableRow key={"index-issues-key-" + index_key}>
                                    <TableCell>{index_entry.id}</TableCell>
                                    <TableCell>
                                        <Box component={"div"}>
                                        {new Date(parseInt(index_entry.report_ts) * 1000).toLocaleDateString()}
                                        </Box>
                                        <Box component={"div"}>
                                            by {index_entry.reporter.split("@")[0]}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {
                                            (index_entry.resolve_date > 0)
                                                ? new Date(parseInt(index_entry.resolve_ts) * 1000).toLocaleDateString()
                                                : ''
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <IssueStatusSelect issue={index[index_key]} issuse_index_key={index_key}
                                                           defaultValue={index_entry.report_status.id}
                                                           onChange={this.onStatusSelect}/>
                                    </TableCell>
                                    <TableCell>
                                        {index_entry.address.city.title} /
                                        {index_entry.address.street.title} /
                                        {index_entry.address.home.title} /
                                        {index_entry.address.flat.title}
                                    </TableCell>
                                    <TableCell>
                                        {index_entry.engineer.title}
                                    </TableCell>
                                    <TableCell>
                                    <TextField
                                        id="date"
                                        label="Дата выполнения"
                                        type="date"
                                        name={"execution_date"}
                                        defaultValue={execution_date()}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={this.onChangeExecutionDate}
                                        inputProps={{"data-issue_id":index_entry.id}}
                                    />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            label="Комментарий"
                                            id={"comment-" + index_entry.id}
                                            defaultValue={index_entry.comment}
                                            margin="normal"
                                            variant="outlined"
                                            onChange={this.onCommentTextChange}
                                            inputProps={{"data-issue_id":index_entry.id}}
                                        /></TableCell>
                                    <TableCell>
                                        <ButtonGroup size="small">
                                            <Button type="button" onClick={this.handleSubmit} data-update={index_entry.id}
                                                    color="primary">
                                                UPDATE
                                            </Button>
                                            <Button type="button" onClick={this.handleSubmit} data-resolve={index_entry.id}
                                                    color="secondary">
                                                RESOLVE
                                            </Button>
                                        </ButtonGroup>
                                    </TableCell>
                                    <TableCell>
                                        <IssueHistory issue_id={index_entry.id} history={index_entry.history}/>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                        }
                        </TableBody>
                    </Table>
                </Paper>
            );
        }
        return ('');
    }
}



