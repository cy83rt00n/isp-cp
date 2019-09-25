import Container from "@material-ui/core/Container";
import {Box} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React from "react";

export default function LoginForm(props) {
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