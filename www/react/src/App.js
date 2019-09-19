import './App.css';
import React from 'react';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Issues from "./Issues";
import Options from "./Options";
import Terms from "./Terms";
import Button from "@material-ui/core/Button";

// let component = undefined;
// if (window.location.pathname.startsWith("/issues"))
//     component = <Issues/>;
// if (window.location.pathname.startsWith("/terms"))
//     component = <Terms/>;
// if (window.location.pathname.startsWith("/options"))
//     component = <Options/>;


export default function IspPanel() {
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
