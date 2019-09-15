import React, {Component} from "react";
import axios from "axios"

class Issues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            data: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/issues?id=991")
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

            return (
                <ul>
                    {data.map(issue => <li><b>{issue.id}</b>&nbsp;
                        <blockquote>{issue.comment}</blockquote>
                    </li>)}
                </ul>
            );
        }
        return ("");
    }
}

export default Issues;