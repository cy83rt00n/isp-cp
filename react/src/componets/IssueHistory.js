import React from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import {makeStyles, NativeSelect} from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import IspCpHelper from "../IspCpHelper";

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

export default function IssueHistory(props) {

    const classes = formStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    if (props.history.length===0) {
        return('');
    }
    const key_prefix = "index-issue-" + props.issue_id + "history-entry-";
    return ([
            <Button key={key_prefix + "button"} onClick={handleOpen} color="secondary" variant={"outlined"}>History</Button>,
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                closeAfterTransition
                onClose={handleClose}
                className={classes.modal}
                key={key_prefix + "modal"}
            >

                <Box component={"div"} className={classes.paper}>
                    <h2 id="transition-modal-title">REPORT #{props.issue_id} HISTORY</h2>
                    {props.history.map((index_entry,index_key)=>{
                        const report = JSON.parse(index_entry);
                        IspCpHelper.debug(report);
                        const report_status = report.report_status.title||'Новая';
                        const execution_date = (report.execution_date != undefined && report.execution_date != "" && report.execution_date != 0)?"назначена на " + new Date(report.execution_date*1000).toLocaleDateString() : "";
                        return([
                            <Box component={"div"}>
                                {report_status}, &nbsp;Монтажник:&nbsp;{report.engineer.title}, &nbsp; {execution_date}
                            </Box>,
                            <Box component={"div"}>
                                Адрес:&nbsp;{report.address.city.title}/{report.address.street.title}/{report.address.home.title}/{report.address.flat.title}
                            </Box>,
                            <Box component={"div"}>
                                Примечание:&nbsp;{report.comment}
                            </Box>,
                            <Box component={"p"}/>
                        ]);
                    })}
                </Box>
            </Modal>
    ]);

};