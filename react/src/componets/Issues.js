import React from 'react';
import axios from 'axios';
import IspCpConfig from "../IspCpConfig";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from '@material-ui/core/TextField';
import ListItem from "@material-ui/core/ListItem";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {slugify} from 'transliteration';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import {ListItemText} from "@material-ui/core";
import NativeSelect from "@material-ui/core/NativeSelect";
import {serialize} from "react-serialize";


var he = require('he');

var issusesInstance;

export default class Issues extends React.Component {
    updateTimeout = 10000;
    modalFormOpen = true;

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            data: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        issusesInstance = this;
    }

    callUpdate() {
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
            const comment = document.querySelector("#comment-" + event.currentTarget.dataset.update).value;
            this.updateIssue(event.currentTarget.dataset.update, comment);
        }
        if (event.currentTarget.dataset.resolve) {
            // var issueForm = document.querySelector("form#issue-edit-" + event.currentTarget.dataset.resolve);
            console.log("Resolve " + event.currentTarget.dataset.resolve);
            this.resolveIssue(event.currentTarget.dataset.resolve);
        }
    }

    resolveIssue(id) {
        let url = IspCpConfig.ApiRequest("/issues/resolve/" + id);
        axios.get(url,).then(
            result => {
                this.componentDidMount()
            }
        );
    }

    updateIssue(id, comment) {
        let url = IspCpConfig.ApiRequest("/issues/update/" + id + "?comment=" + comment);
        axios.get(url).then(
            result => {
                this.componentDidMount()
            }
        );
    }


    componentDidMount() {
        let apiPath = IspCpConfig.ApiRequest("/issues/");
        let location = this.props.location.pathname;
        if (location.startsWith("/issues/") && location.length > "/issues/".length) {
            apiPath = IspCpConfig.ApiRequest(location);
        }

        axios.get(apiPath, {
            params: axios.defaults.params
        })
            .then(
                result => {
                    this.setState({
                        success: result.data.success,
                        data: result.data.index
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
                                <TableCell>Engineer</TableCell>
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
        console.log(event.target);
        window.Target = event.target;
        let issue = Object.assign(address, {comment: event.target.comment_new.value});
        let url = IspCpConfig.ApiRequest("/issues/report/?comment=" + JSON.stringify(issue));
        axios.get(url, {
            params: {
                email: axios.defaults.params.email,
                password: axios.defaults.params.password
            }
        }).then(
            result => {
                handleClose();
                issusesInstance.callUpdate();
            }
        );
    }

    const [address, setAddress] = React.useState({city: 0, street: 0, home: 0, flat: 0});
    const [cities, setCities] = React.useState([]);
    const [streets, setStreets] = React.useState([]);
    const [homes, setHomes] = React.useState([]);
    const [flats, setFlats] = React.useState([]);

    const onChangeAddress = (event) => {
        var address_new = Object.assign({}, address);

        switch (event.target.id) {
            case "city-new":
                address_new.city = event.target.value;
                setFromApi("/term/" + address_new.city, (data) => {
                    setStreets(data.term.children)
                });
                break;
            case "street-new":
                address_new.city = event.target.value;
                setFromApi("/term/" + address_new.city, (data) => {
                    setHomes(data.term.children)
                });
                break;
            case "home-new":
                address_new.home = event.target.value;
                setFromApi("/term/" + address_new.home, (data) => {
                    setFlats(data.term.children)
                });
                break;
            case "flat-new":
                address_new.flat = event.target.value;
                break;
        }
        setAddress(address_new);
    }

    const setFromApi = (uri, callback) => {

        axios.get(IspCpConfig.ApiRequest(uri), {
            params: {
                email: axios.defaults.params.email,
                password: axios.defaults.params.password
            }
        }).then(
            response => {
                callback(response.data)
            }
        );
    }

    if (cities.length === 0) {
        setFromApi("/terms/" + slugify("Адреса"), (data) => {
            setCities(data.terms)
        });
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

                <Box component={"form"} className={classes.paper} onSubmit={reportIssue}>
                    <h2 id="transition-modal-title">REPORT ISSUE</h2>
                    <Box component={"div"}>
                        <ChainedList root_title="Город" value={address.city} children={cities}
                                     onChange={onChangeAddress} id={"city-new"}/>
                        <ChainedList root_title="Улица" value={address.street} children={streets}
                                     onChange={onChangeAddress} id={"street-new"}/>
                        <ChainedList root_title="Дом" value={address.home} children={homes} onChange={onChangeAddress}
                                     id={"home-new"}/>
                        <ChainedList root_title="Квартира" value={address.flat} children={flats}
                                     onChange={onChangeAddress} id={"flat-new"}/>
                    </Box>
                    <Box component={"div"}>
                        <TextField
                            label="Комментарий"
                            id={"transition-modal-description"}
                            defaultValue={""}
                            margin="normal"
                            variant="outlined"
                            name={"comment_new"}
                        />
                        <Button type="submit" color="secondary" variant={"outlined"}>REPORT</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );

};


function ChainedList(props) {
    const onChange = props.onChange;
    const children = props.children;

    return (
        <Box component={"div"}>
            <NativeSelect name={props.id} onChange={onChange} id={props.id} value={props.value}>
                <option key={"address-root-item-" + props.id} value={0}>{props.root_title}</option>
                {children.map(child => {
                    return (<option key={"address-item-" + child.id} value={child.id}>{child.title}</option>);
                })}
            </NativeSelect>
        </Box>
    );
}