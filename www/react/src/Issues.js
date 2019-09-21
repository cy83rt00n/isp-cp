import React from 'react';
import axios from 'axios';
import {IspCpConfig} from "./IspCpConfig";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import NativeSelect from '@material-ui/core/NativeSelect';
import {slugify} from 'transliteration';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';


var he = require('he');

var issusesInstance;

export default class Issues extends React.Component {
    updateTimeout = 10000;
    modalFormOpen = true;

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            data   : []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        issusesInstance = this;
    }

    callUpdate()
    {
        this.componentDidMount();
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(event.currentTarget);
        window.Target = event.currentTarget;

        // if (event.currentTarget.dataset.report) {
        //     var issueForm = document.querySelector("form#issue-report");
        //     console.log("Report : " + issueForm.comment.value);
        //     this.reportIssue(issueForm.comment.value);
        // }
        if (event.currentTarget.dataset.update) {
            // var issueForm = document.querySelector("form#issue-edit-" + event.currentTarget.dataset.update);
            console.log("Udate " + event.currentTarget.dataset.update);
            // window.issueForm = issueForm;
            // this.updateIssue(event.currentTarget.dataset.update, issueForm.comment.value);
        }
        if (event.currentTarget.dataset.resolve) {
            // var issueForm = document.querySelector("form#issue-edit-" + event.currentTarget.dataset.resolve);
            console.log("Resolve " + event.currentTarget.dataset.resolve);
            // this.resolveIssue(event.currentTarget.dataset.resolve);
        }
    }

    resolveIssue(id) {
        let url = IspCpConfig.ApiRootRequest("/issues/resolve/" + id);
        axios.get(url).then(
            result => {
                this.componentDidMount()
            }
        );
    }

    updateIssue(id, comment) {
        let url = IspCpConfig.ApiRootRequest("/issues/update/" + id + "?comment=" + comment);
        axios.get(url).then(
            result => {
                this.componentDidMount()
            }
        );
    }


    componentDidMount() {
        let apiPath = IspCpConfig.ApiRootRequest("/issues/");
        let location = this.props.location.pathname;
        if (location.startsWith("/issues/") && location.length > "/issues/".length) {
            apiPath = IspCpConfig.ApiRootRequest(location);
        }

        axios.get(apiPath)
             .then(
                 result => {
                     this.setState({
                         success: result.data.success,
                         data   : result.data.index
                     });
                     // console.log(result);
                 }
             )
    }


    render() {
        if (this.state.success) {
            const data = JSON.parse(this.state.data);
            // setTimeout(this.componentDidMount, this.updateTimeout);
            return (
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Issue</TableCell>
                                <TableCell>Reported </TableCell>
                                <TableCell>Resolved</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Comment</TableCell>
                                <TableCell>
                                    <IssueForm/>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{data.map(issue =>
                            <TableRow key={"issue-" + issue.id}>
                                <TableCell>{issue.id}</TableCell>
                                <TableCell>{new Date(parseInt(issue.report_date) * 1000).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    {
                                        (issue.resolve_date > 0)
                                            ? new Date(parseInt(issue.resolve_date) * 1000).toLocaleDateString()
                                            : ''
                                    }
                                </TableCell>
                                <TableCell>
                                    <AddressList location={"/terms/15"} id={"address-" + issue.id} value={0}/>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        label="Комментарий"
                                        id={"comment-" + issue.id}
                                        defaultValue={issue.comment ? he.decode(issue.comment) : ''}
                                        margin="normal"
                                        variant="outlined"
                                    /></TableCell>
                                <TableCell>
                                    <ButtonGroup size="small">
                                        <Button type="button" onClick={this.handleSubmit} data-update={issue.id}
                                                color="primary">
                                            UPDATE
                                        </Button>
                                        <Button type="button" onClick={this.handleSubmit} data-resolve={issue.id}
                                                color="secondary">
                                            RESOLVE
                                        </Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </Paper>
            );
        }
        return ('');
    }
}

const formStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function IssueForm() {

    const classes = formStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const reportIssue = (event) => {
        event.preventDefault();
        console.log(event.target.comment_new.value);
        let url = IspCpConfig.ApiRootRequest("/issues/report/?comment=" + event.target.comment_new.value);
        axios.get(url).then(
            result => {
                handleClose();
                issusesInstance.callUpdate();
            }
        );
    }

    return (
        <div>
            <Button onClick={handleOpen} color="secondary" variant={"outlined"}>REPORT</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                closeAfterTransition
                onClose={handleClose}
                className={classes.modal}
            >

                <form className={classes.paper} onSubmit={reportIssue}>
                    <h2 id="transition-modal-title">REPORT ISSUE</h2>
                    <div>
                        <AddressList location={"/terms/1"} id={"address-new"} value={0}/>
                    </div>
                    <div>
                        <TextField
                            label="Комментарий"
                            id={"transition-modal-description"}
                            defaultValue={""}
                            margin="normal"
                            variant="outlined"
                            name={"comment_new"}
                        />
                        <Button type="submit" color="secondary" variant={"outlined"}>REPORT</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );

};

class AddressList extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            address: {term:{id:0},children:[]},
            houses: {term:{id:0},children:[]},
            flats: {term:{id:0},children:[]},
            selectedAddress:0,
            selectedHouse:0,
            selectedFlat:0
        };
        this.apiPath = IspCpConfig.ApiRootRequest("/terms/");
        this.location = props.location;
        this.addrSelected = this.addrSelected.bind(this);
    }

    componentDidMount() {

        if (this.location.startsWith("/terms/") && this.location.length > "/terms/".length) {
            this.apiPath = IspCpConfig.ApiRootRequest(this.location);
        }

        axios.get(this.apiPath)
             .then(
                 result => {
                     this.setState({
                         address: result.data,
                         houses: {term:{id:0},children:[]},
                         flats: {term:{id:0},children:[]},
                         selectedAddress: result.data.term.id,
                         selectedHouse:0,
                         selectedFlat:0
                     });
                 }
             )
             .catch(reason => {
                 console.log("Axios error: " + reason)
             })
        ;
    }

    addrSelected = (event) => {
        console.log(event.target.value);
        var selectedId = event.target.value;
        var apiPath = IspCpConfig.ApiRootRequest("/terms/" + selectedId);
        axios.get(apiPath)
             .then(
                 result => {
                     this.setState({
                         address: this.state.address,
                         houses: result.data,
                         flats: {term:{id:0},children:[]},
                         selectedAddress: selectedId,
                         selectedHouse:0,
                         selectedFlat:0
                     });
                     this.forceUpdate();
                 }
             )
             .catch(reason => {
                 console.log("Axios error: " + reason)
             })
        ;

    }

    houseSelected = (event) => {
        console.log(event.target.value);
        var selectedId = event.target.value;
        var apiPath = IspCpConfig.ApiRootRequest("/terms/" + selectedId);
        axios.get(apiPath)
             .then(
                 result => {
                     this.setState({
                         address: this.state.address,
                         houses: this.state.houses,
                         flats: result.data,
                         selectedAddress: this.state.selectedAddress,
                         selectedHouse:selectedId,
                         selectedFlat:0
                     });
                     this.forceUpdate();
                 }
             )
             .catch(reason => {
                 console.log("Axios error: " + reason)
             })
        ;

    }

    flatSelected = (event) => {
        console.log(event.target.value);
        var selectedId = event.target.value;
        this.setState({
            address: this.state.address,
            houses: this.state.houses,
            flats: this.state.flats,
            selectedAddress: this.state.selectedAddress,
            selectedHouse:this.state.selectedHouse,
            selectedFlat:selectedId
        });
        this.forceUpdate();

    }

    render() {
        console.log(this.state);
        return (
            <div>
            <NativeSelect
                id={this.props.id}
                value={this.state.selectedAddress}
                onChange={this.addrSelected}
            >
                <option value={0}>Улица</option>
                {this.state.address.children.map(child =>
                    <option key={child.id} value={child.id} data-slug={slugify(child.title)}>{child.title}</option>
                )}
            </NativeSelect>
                <NativeSelect
                    id={this.props.id + "-houses"}
                    value={this.state.selectedHouse}
                    onChange={this.houseSelected}
                >
                    <option value={0}>Дом</option>
                    {this.state.houses.children.map(child =>
                        <option key={child.id} value={child.id} data-slug={slugify(child.title)}>{child.title}</option>
                    )}
                </NativeSelect>
                <NativeSelect
                    id={this.props.id + "flats"}
                    value={this.state.selectedFlat}
                    onChange={this.flatSelected}
                >
                    <option value={0}>Квартира</option>
                    {this.state.flats.children.map(child =>
                        <option key={child.id} value={child.id} data-slug={slugify(child.title)}>{child.title}</option>
                    )}
                </NativeSelect>
            </div>
        );
    }
}

class HousesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            term    : {},
            children: []
        };
        this.apiPath = IspCpConfig.ApiRootRequest("/terms/");
        this.location = props.location;
    }

    componentDidMount() {

        if (this.location.startsWith("/terms/") && this.location.length > "/terms/".length) {
            this.apiPath = IspCpConfig.ApiRootRequest(this.location);
        }

        axios.get(this.apiPath)
             .then(
                 result => {
                     console.log(result);
                     this.setState({
                         term    : result.data.term,
                         children: result.data.children
                     });
                 }
             )
             .catch(reason => {
                 console.log("Axios error: " + reason)
             })
        ;
    }

    render() {
        return (
            <NativeSelect
                id={this.props.id}
                value={this.props.value}
            >
                {this.state.children.map(child =>
                    <option key={child.id} value={child.id} data-slug={slugify(child.title)}>{child.title}</option>
                )}
            </NativeSelect>
        );
    }
}

class ApartmentsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            term    : {},
            children: []
        };
        this.apiPath = IspCpConfig.ApiRootRequest("/terms/");
        this.location = props.location;
    }

    componentDidMount() {

        if (this.location.startsWith("/terms/") && this.location.length > "/terms/".length) {
            this.apiPath = IspCpConfig.ApiRootRequest(this.location);
        }

        axios.get(this.apiPath)
             .then(
                 result => {
                     console.log(result);
                     this.setState({
                         term    : result.data.term,
                         children: result.data.children
                     });
                 }
             )
             .catch(reason => {
                 console.log("Axios error: " + reason)
             })
        ;
    }

    render() {
        return (
            <NativeSelect
                id={this.props.id}
                value={this.props.value}
            >
                {this.state.children.map(child =>
                    <option key={child.id} value={child.id} data-slug={slugify(child.title)}>{child.title}</option>
                )}
            </NativeSelect>
        );
    }
}