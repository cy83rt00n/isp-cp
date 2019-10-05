import Container from "@material-ui/core/Container";
import {Box, makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";


const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    cardContainer: {
        marginTop: "1.5em",
    }
});

export default function LoginForm(props) {

    const classes = useStyles();

    return (
        <Container className={classes.cardContainer} maxWidth={"sm"}>
            <Card className={classes.card} maxWidth={"md"} component={"form"} onSubmit={props.onSubmit}>
                <CardContent>
                    <Box component={"div"}>
                        <TextField type={"email"} name={"email"} placeholder={"Login"} defaultValue={props.email}/>
                    </Box>
                    <Box component={"div"}>
                        <TextField type={"password"} name={"pass"} placeholder={"Password"} defaultValue={props.pass}>
                            Password
                        </TextField>
                    </Box>


                </CardContent>
                <CardActions>
                    <Button type={"submit"}>SGIN IN</Button>
                </CardActions>
            </Card>
        </Container>
    )
}