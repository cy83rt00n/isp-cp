import React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Issues from "./Issues";
import Terms from "./Terms";
import Options from "./Options";
import {AppBar, makeStyles} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from '@material-ui/icons/Menu';
import IspPanel from "./IspPanel";
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(1),
        color: "white"
    },
    title: {
        flexGrow: 1,
    },
}));

export default function DefaultPanel(props) {
    const classes = useStyles();
    const username = props.username || '';
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return ([
        <Router key={"app-router"}>
            <AppBar position="static">
                <Toolbar>

                    <Button component={Link} to="/" color={"primary"}
                            variant={"text"} className={classes.menuButton}>Home</Button>
                    <Button component={Link} to="/issues/" color={"primary"}
                            variant={"text"} className={classes.menuButton}>Issues</Button>
                    <Button component={Link} to="/terms/" color={"primary"}
                            variant={"text"} className={classes.menuButton}>Terms</Button>
                    <Button component={Link} to="/logout/" color={"primary"}
                            variant={"text"} className={classes.menuButton}>Log out</Button>

                    <Typography variant="h6" className={classes.title} align={"right"}>
                        {username}@ISP.CP
                    </Typography>
                </Toolbar>
            </AppBar>
            <Route path="/issues" component={Issues}/>
            <Route path="/terms" component={Terms}/>
            <Route path="/options" component={Options}/>
            <Route path="/logout" component={IspPanel}/>
        </Router>
    ]);
}