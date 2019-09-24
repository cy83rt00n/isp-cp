import React from "react";
import axios from "axios"
import IspCpConfig from "./IspCpConfig";

export default class Options extends React.Component {
    state = {
        success: false,
        name: undefined,
        value: undefined
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        axios.get(IspCpConfig.ApiRequest("/options/get/roles"))
            .then(
                (result) => {
                    console.log(this.state);
                    this.setState(result.data);
                    console.log(this.state);
                }
            )
            .catch(
                (error) => {
                    console.log(error);
                }
            )
    }

    render() {
        if (this.state.success) {
            const {role} = JSON.parse(this.state.value.value);
            return (
                <div>
                    <p>{role.id}.{role.name}[{role.access.toString()}]</p>
                </div>
            );
        }
        return '';
    }

}


//{value.map(prop=>{<p>{prop}</p>})}
