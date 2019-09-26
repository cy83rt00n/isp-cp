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
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <IconButton aria-controls="menu-top" aria-hidden="false" aria-haspopup="false" onClick={handleClick}
                                edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {username}@ISP.CP
                    </Typography>
                    <Menu id={"menu-top"} anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}>
                        <MenuItem key={"tm-1"}><Button component={Link} to="/" color={"primary"}
                                                       variant={"contained"}>Home</Button></MenuItem>
                        <MenuItem key={"tm-2"}><Button component={Link} to="/issues/" color={"primary"}
                                                       variant={"contained"}>Issues</Button></MenuItem>
                        <MenuItem key={"tm-3"}><Button component={Link} to="/terms/" color={"primary"}
                                                       variant={"contained"}>Terms</Button></MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Route path="/issues" component={Issues}/>
            <Route path="/terms" component={Terms}/>
            <Route path="/options" component={Options}/>
        </Router>
    ]);
}