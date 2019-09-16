import React from 'react';
import axios from 'axios';
import IspCpConfig, {IspCpHelper} from "./IspCpConfig";

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

        if (event.target.report)
            this.reportIssue(event.target.comment.value);
        if (event.target.update)
            this.updateIssue(event.target.update.value, event.target.comment.value);
        if (event.target.resolve)
            this.resolveIssue(event.target.resolve.value);
    }

    reportIssue(comment) {
        let url = IspCpConfig.ApiRootRequest("/issues/report/?comment=\"" + comment + "\"");
        axios.get(url);
        this.componentDidMount();
    }

    resolveIssue(id) {
        let url = IspCpConfig.ApiRootRequest("/issues/resolve/" + id);
        axios.get(url);
        this.componentDidMount();
    }

    updateIssue(id, comment) {
        let url = IspCpConfig.ApiRootRequest("/issues/update/" + id + "?comment=\"" + comment + "\"");
        axios.get(url);
        this.componentDidMount();
    }



    componentDidMount() {
        axios.get(IspCpConfig.ApiRootRequest("/issues"))
            .then(
                result => {
                    this.setState({
                        success: result.data.success,
                        data: result.data.index
                    });
                    console.log(result);
                }
            )
    }

    render() {
        if (this.state.success) {
            const data = JSON.parse(this.state.data);
            setTimeout(this.componentDidMount, this.updateTimeout);
            return (
                <div>
                    {console.log(data[0].report_date)}
                    <ul>
                        {data.map(issue =>
                            <li>
                                {issue.id}.
                                Reported {new Date(parseInt(issue.report_date) * 1000).toLocaleDateString()}.
                                {
                                    (issue.resolve_date > 0)
                                        ? "Resolved" + new Date(parseInt(issue.resolve_date) * 1000).toLocaleDateString() + '.'
                                        : ''
                                }
                                <code>
                                    {he.decode(issue.comment)}
                                </code>

                                <form action="" method="GET" onSubmit={this.handleSubmit}>
                                    <input type="hidden" name="update" value={issue.id}/>
                                    <input type="text" name="comment" defaultValue=""/>
                                    <input type="submit" value="update report"/>
                                </form>

                                <form action="" method="GET" onSubmit={this.handleSubmit}>
                                    <input type="hidden" name="resolve" value={issue.id}/>
                                    <input type="submit" value="resolve report"/>
                                </form>
                            </li>
                        )}
                    </ul>
                    <form action="" method="GET" onSubmit={this.handleSubmit}>
                        <input type="hidden" name="report" value="0"/>
                        <input type="text" name="comment" defaultValue=""/>
                        <input type="submit" value="send report"/>
                    </form>
                </div>
            );
        }
        return ('');
    }
}