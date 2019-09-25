import './App.css';
import React from 'react';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Issues from "./Issues";
import Options from "./Options";
import Terms from "./Terms";
import Button from "@material-ui/core/Button";
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import {Box} from "@material-ui/core";
import User from "./models/User";
import {IspCpConfig} from "./IspCpConfig";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

class IspPanel extends React.Component {

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
            return (<IspControl/>);
        }
        return (<LoginForm onSubmit={this.handleSubmitLoginForm} email={email} pass={pass}/>);
    }

}

export default IspPanel;

function LoginForm(props) {
    return (
        <Container maxWidth={"md"}>
            <form onSubmit={props.onSubmit}>
                <Box>
                    <TextField type={"email"} name={"email"} placeholder={"Login"} defaultValue={props.email}/>
                </Box>
                <Box>
                    <TextField type={"password"} name={"pass"} placeholder={"Password"} defaultValue={props.pass}>
                        Password
                    </TextField>
                </Box>
                <Button type={"submit"}>SGIN IN</Button>
            </form>
        </Container>
    )
}

function IspControl() {
    return (
        <Router>
            <div>
                <Button component={Link} to="/" color={"primary"} variant={"contained"}>Home</Button>
                <Button component={Link} to="/issues/" color={"primary"} variant={"contained"}>Issues</Button>
                <Button component={Link} to="/terms/" color={"primary"} variant={"contained"}>Terms</Button>
                <Button component={Link} to="/options/" color={"primary"} variant={"contained"}>Options</Button>

                <hr/>
                <Route path="/issues" component={Issues}/>
                <Route path="/terms" component={Terms}/>
                <Route path="/options" component={Options}/>
            </div>
        </Router>
    );
}