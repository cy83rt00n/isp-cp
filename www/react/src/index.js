import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import './index.css';
import IspPanel from './App';
import * as serviceWorker from './serviceWorker';
import SignIn from "./SignIn";


ReactDOM.render(<Router><SignIn/></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

