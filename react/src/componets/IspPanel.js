import React from "react";
import axios from "axios";
import IspCpConfig from "../IspCpConfig";
import User from "../models/User";
import LoginForm from "./LoginForm";
import DefaultPanel from "./DefaultPanel";

export default class IspPanel extends React.Component {

    constructor(props) {
        super(props);
        const user = User;
        this.state = {
            user: user
        }
        this.handleSubmitLoginForm = this.handleSubmitLoginForm.bind(this);
    }

    handleSubmitLoginForm(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const user = User;
        user.email = form.email.value;
        user.pass = form.pass.value;

        axios.get(IspCpConfig.ApiRequest("/users/login"), {
            params: {email: user.email, password: user.pass}
        }).then(response => {
            user.id = response.data.item.id || undefined;
            this.setState({
                user: user
            });
        });
    }

    render() {
        const email = this.state.user.email;
        const pass = this.state.user.pass;
        const id = this.state.user.id || undefined;
        if (parseInt(id) > 0) {
            axios.defaults.params = {
                email: email,
                password: pass
            };
            return (<DefaultPanel/>);
        }
        return (<LoginForm onSubmit={this.handleSubmitLoginForm} email={email} pass={pass}/>);
    }

}