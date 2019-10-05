import React from "react";
import axios from "axios";
import IspCpConfig from "../IspCpConfig";
import User from "../models/User";
import LoginForm from "./LoginForm";
import DefaultPanel from "./DefaultPanel";
import {AppBar} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from "@material-ui/core";

import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

export default class IspPanel extends React.Component {

    constructor(props) {
        super(props);
        const user = new User();
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
        }).catch((exception) => {
            console.log(exception);
        });
    }

    render() {
        if (window.location.pathname === '/logout/') {
            sessionStorage.clear();
            window.location.href = window.location.origin;
        }
        const email = sessionStorage.getItem("email") || this.state.user.email;
        const pass = sessionStorage.getItem("password") || this.state.user.pass;
        const id = this.state.user.id || sessionStorage.getItem("id");
        if (parseInt(id) > 0) {
            axios.defaults.params = {
                email: email,
                password: pass
            };
            sessionStorage.setItem("id",id);
            sessionStorage.setItem("email",email);
            sessionStorage.setItem("password",pass);
            const username = email.split("@")[0].toUpperCase();

            return ([<DefaultPanel username={username}/>]);
        }
        return ([<IspPanelAppBar/>, <LoginForm onSubmit={this.handleSubmitLoginForm} email={email} pass={pass}/>]);
    }

}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


function IspPanelAppBar(props) {
    const classes = useStyles();
    const username = props.username || '';

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {username}@ISP.CP
                </Typography>
            </Toolbar>
        </AppBar>
    );
}