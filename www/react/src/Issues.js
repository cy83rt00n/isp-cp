import React from 'react';
import axios from 'axios';
import IspCpConfig, {IspCpHelper} from "./IspCpConfig";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


var he = require('he');


export default class Issues extends React.Component {
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

        if (event.currentTarget.dataset.report) {
            var issueForm = document.querySelector("form#issue-report");
            console.log("Report : " + issueForm.comment.value);
            this.reportIssue(issueForm.comment.value);
        }
        if (event.currentTarget.dataset.update) {
            var issueForm = document.querySelector("form#issue-edit-" + event.currentTarget.dataset.update);
            console.log("Udate " + event.currentTarget.dataset.update);
            this.updateIssue(event.currentTarget.dataset.update, issueForm.comment.value);
        }
        if (event.currentTarget.dataset.resolve) {
            var issueForm = document.querySelector("form#issue-edit-" + event.currentTarget.dataset.resolve);
            console.log("Resolve " + event.currentTarget.dataset.resolve);
            this.resolveIssue(event.currentTarget.dataset.resolve);
        }
    }

    reportIssue(comment) {
        let url = IspCpConfig.ApiRootRequest("/issues/report/?comment=\"" + comment + "\"");
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
        let url = IspCpConfig.ApiRootRequest("/issues/update/" + id + "?comment=\"" + comment + "\"");
        axios.get(url).then(
            result => {
                this.componentDidMount()
            }
        );
    }


    componentDidMount() {
        axios.get(IspCpConfig.ApiRootRequest("/issues"))
            .then(
                result => {
                    this.setState({
                        success: result.data.success,
                        data: result.data.index
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
                <div>
                    <List>
                        {data.map(issue =>
                            <ListItem>
                                <ListItemIcon>{issue.id}</ListItemIcon>
                                <ListItemText>
                                    Reported {new Date(parseInt(issue.report_date) * 1000).toLocaleDateString()}
                                </ListItemText>
                                {
                                    (issue.resolve_date > 0)
                                        ?
                                        <ListItemText>{"Resolved" + new Date(parseInt(issue.resolve_date) * 1000).toLocaleDateString()}</ListItemText>
                                        : ''
                                }

                                <form action="" id={"issue-edit-" + issue.id} method="GET" onSubmit={this.handleSubmit}>
                                    <TextField
                                        label="Комментарий"
                                        name={"comment"}
                                        defaultValue={he.decode(issue.comment)}
                                        margin="normal"
                                        variant="outlined"
                                    />
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
                                </form>
                            </ListItem>
                        )}
                    </List>
                    <form action="" id={"issue-report"} method="GET">
                        <TextField
                            label="Комментарий"
                            name={"comment"}
                            defaultValue=""
                            margin="normal"
                            variant="outlined"
                        />
                        <Button type="button" data-report="1" onClick={this.handleSubmit} variant="contained"
                                color="primary">
                            REPORT
                        </Button>
                    </form>
                </div>
            );
        }
        return ('');
    }
}