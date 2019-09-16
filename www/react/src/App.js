import React from 'react';
import logo from './logo.svg';
import './App.css';
import Issues from "./Issues";
import Options from './Options';
import Terms from "./Terms";

let component = undefined;
if (window.location.pathname.startsWith("/issues"))
    component = <Issues/>;
if (window.location.pathname.startsWith("/terms"))
    component = <Terms/>;
if (window.location.pathname.startsWith("/options"))
    component = <Options/>;


function App() {
    return (
        <div>
            {component}
        </div>
    );
}

export default App;
