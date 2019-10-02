import React from "react";
import IspCpConfig from "../IspCpConfig";
import axios from "axios";
import {slugify} from "transliteration";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import {makeStyles, NativeSelect} from "@material-ui/core";
import IspCpHelper from "../IspCpHelper";
import ChainedList from "./ChainedList";

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

export default function IssueForm(props) {

    const classes = formStyles();
    const [open, setOpen] = React.useState(false);

    const [address, setAddress] = React.useState({city: {}, street: {}, home: {}, flat: {}});
    const [cities, setCities] = React.useState([]);
    const [streets, setStreets] = React.useState([]);
    const [homes, setHomes] = React.useState([]);
    const [flats, setFlats] = React.useState([]);
    const [engineers, setEngineers] = React.useState([])
    const [engineer, setEngineer] = React.useState({id:0,title:''});

    const afterReport = props.afterReport;

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const reportIssue = (event) => {
        event.preventDefault();

        let issue = Object.assign({address: address}, {engineer: engineer}, {comment: event.target.comment_new.value});
        let url = "/issues/report/";
        new IspCpHelper().callApi(url,{
            params: {
                email: axios.defaults.params.email,
                password: axios.defaults.params.password,
                comment: issue
            }
        }, ()=>{handleClose();afterReport();});
    }

    const onChangeAddress = (event) => {
        var address_new = Object.assign({}, address);

        switch (event.target.id) {
            case "city-new":
                address_new.city = {
                    title: event.target.selectedOptions.item(0).text,
                    id: event.target.value
                };
                address_new.city.title = event.target.selectedOptions.item(0).text;
                new IspCpHelper().callApi("/term/" + address_new.city.id,null, (response) => {
                    setStreets(response.data.term.children || [])
                });
                break;
            case "street-new":
                address_new.street = {
                    title: event.target.selectedOptions.item(0).text,
                    id: event.target.value
                };
                new IspCpHelper().callApi("/term/" + address_new.street.id,null, (response) => {
                    setHomes(response.data.term.children || [])
                });
                break;
            case "home-new":
                address_new.home = {
                    title: event.target.selectedOptions.item(0).text,
                    id: event.target.value
                };
                new IspCpHelper().callApi("/term/" + address_new.home.id,null, (response) => {
                    setFlats(response.data.term.children || [])
                });
                break;
            case "flat-new":
                address_new.flat = {
                    title: event.target.selectedOptions.item(0).text,
                    id: event.target.value
                };
                break;
        }
        setAddress(address_new);
    }

    const onChangeEngineer = (event) => {
        setEngineer({
            title: event.target.selectedOptions.item(0).text,
            id: event.target.value
        })
    }

    if (cities.length === 0) {
        new IspCpHelper().callApi("/terms/" + slugify("Адреса"),null, (response) => {
            setCities(response.data.terms)
        });
    }

    if (engineers.length === 0) {
        new IspCpHelper().callApi("/terms/" + slugify("Монтажники"),null, (response) => {
            setEngineers(response.data.terms)
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
                        <ChainedList root_title="Город" value={address.city.id} children={cities}
                                     onChange={onChangeAddress} id={"city-new"}/>
                        <ChainedList root_title="Улица" value={address.street.id} children={streets}
                                     onChange={onChangeAddress} id={"street-new"}/>
                        <ChainedList root_title="Дом" value={address.home.id} children={homes} onChange={onChangeAddress}
                                     id={"home-new"}/>
                        <ChainedList root_title="Квартира" value={address.flat.id} children={flats}
                                     onChange={onChangeAddress} id={"flat-new"}/>
                    </Box>
                    <Box component={"div"}>
                        <NativeSelect value={engineer.id} onChange={onChangeEngineer}>
                            <option value={0}>Монтажник</option>
                            {
                                engineers.map(item => {
                                    return(<option key={"engineer-id-" + item.id} value={item.id}>{item.title}</option>)
                                })
                            }
                        </NativeSelect>
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