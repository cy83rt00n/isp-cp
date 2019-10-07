import React from "react";
import {slugify} from "transliteration";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import {Input, makeStyles, NativeSelect} from "@material-ui/core";
import IspCpHelper from "../IspCpHelper";
import ChainedList from "./ChainedList";
import IssueStatus from "../models/IssueStatus";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import MuiPhoneNumber from "material-ui-phone-number";

const dateformat = require("dateformat");

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
    const [engineer, setEngineer] = React.useState({id: 0, title: ''});

    const afterReport = props.afterReport;

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const reportIssue = (event) => {
        event.preventDefault();
        let issue = Object.assign(
            {address: address},
            {engineer: engineer},
            {comment: event.target.comment_new.value},
            {report_status: new IssueStatus()},
            {execution_date: new Date(event.target.execution_date.value).getTime() / 1000},
            {contacts: event.target.contacts_phone.value}
        );
        Object.assign(issue, {history: [JSON.stringify(issue)]});
        let url = "/issues/report/";
        IspCpHelper.callApi(url, {comment: issue}).then(afterReport);
        handleClose();
    }

    const onChangeAddress = (event) => {
        var address_new = Object.assign({}, address);

        IspCpHelper.debug(event.currentTarget);
        IspCpHelper.debug(event.target);

        switch (event.target.id) {
            case "city-new":
                address_new.city = {
                    title: event.target.selectedOptions.item(0).text,
                    id: event.target.value
                };
                address_new.city.title = event.target.selectedOptions.item(0).text;
                IspCpHelper.callApi("/term/" + address_new.city.id).then((response) => {
                    setStreets(response.data.term.children || [])
                });
                break;
            case "street-new":
                address_new.street = {
                    title: event.target.selectedOptions.item(0).text,
                    id: event.target.value
                };
                IspCpHelper.callApi("/term/" + address_new.street.id).then((response) => {
                    setHomes(response.data.term.children || [])
                });
                break;
            case "home-new":
                address_new.home = {
                    title: event.target.selectedOptions.item(0).text,
                    id: event.target.value
                };
                IspCpHelper.callApi("/term/" + address_new.home.id).then((response) => {
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
        IspCpHelper.callApi("/terms/" + slugify("Адреса")).then((response) => {
            setCities(response.data.terms)
        });
    }

    if (engineers.length === 0) {
        IspCpHelper.callApi("/terms/" + slugify("Монтажники")).then((response) => {
            setEngineers(response.data.terms)
        });
    }

    const execution_date = undefined;
    return (
        <div>
            <Button fullWidth={true} onClick={handleOpen} color="secondary" variant={"outlined"}>REPORT</Button>
            <Dialog
                aria-labelledby="scroll-dialog-title"
                open={open}
                onClose={handleClose}
                scroll={"body"}
            >
                <DialogTitle id="scroll-dialog-title">Создать заявку</DialogTitle>
                <DialogContent dividers={false}>
                    <DialogContentText>
                        <Box component={"form"} onSubmit={reportIssue}>
                            <ChainedList label="Город" value={address.city.id||0} children={cities}
                                         onChange={onChangeAddress} id={"city-new"}/>
                            <ChainedList label="Улица" value={address.street.id} children={streets}
                                         onChange={onChangeAddress} id={"street-new"}/>
                            <ChainedList label="Дом" value={address.home.id} children={homes}
                                         onChange={onChangeAddress}
                                         id={"home-new"}/>
                            <ChainedList label="Квартира" value={address.flat.id} children={flats}
                                         onChange={onChangeAddress} id={"flat-new"}/>
                            <FormControl fullWidth={true} margin={"dense"}>
                                <InputLabel shrink={true}>Монтажник</InputLabel>
                                <NativeSelect value={engineer.id} onChange={onChangeEngineer} >
                                    <option value={0}></option>
                                    {
                                        engineers.map(item => {
                                            return (
                                                <option value={item.id}>{item.title}</option>)
                                        })
                                    }
                                </NativeSelect>
                            </FormControl>
                            <FormControl fullWidth={true} margin={"dense"}>
                                <InputLabel shrink={true}>{"Дата выполнения"}</InputLabel>
                                <Input id={"date"} type={"date"} name={"execution_date"} defaultValue={execution_date} />
                            </FormControl>
                            <MuiPhoneNumber
                                id={"issue-contact-phone"}
                                label={"Контактный телефон"}
                                type={"text"}
                                name={"contacts_phone"}
                                onlyCountries={["ru"]}
                                defaultCountry={"ru"}
                                fullWidth={true}
                                countryCodeEditable={false}
                            />
                            <TextField
                                label="Комментарий"
                                id={"transition-modal-description"}
                                defaultValue={""}
                                margin="dense"
                                variant="outlined"
                                name={"comment_new"}
                                InputLabelProps={{shrink:true}}
                                fullWidth={true}
                                multiline={true}
                                rowsMax={5}
                                rows={5}
                            />
                            <Button align={"right"} type="submit" color="primary" variant={"contained"}>REPORT</Button>
                        </Box>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );

};