import React from 'react';
import ReactDOM from 'react-dom';
import IspPanel from "./componets/IspPanel";
import * as serviceWorker from './serviceWorker';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiButton: {
            // Name of the rule
            root: {
                // Some CSS
                cursor: "pointer"
            },
        },
    },
});

ReactDOM.render(<IspPanel key={"application-ispcp"} theme={theme}></IspPanel>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

