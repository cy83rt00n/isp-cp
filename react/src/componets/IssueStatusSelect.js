import React from 'react';
import {makeStyles, NativeSelect} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import FolderIcon from '@material-ui/icons/Folder';
import Collapse from "@material-ui/core/Collapse";
import LabelIcon from '@material-ui/icons/Label';
import IspCpHelper from "../IspCpHelper";
import {slugify} from "transliteration";
import Term from "../models/Term";
import Select from "@material-ui/core/Select";
import {FormControl} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";


const ch = ()=>{
    return 0;
}

function IssueStatusSelect(props)
{
    const [statuses, setStatuses] = React.useState([]);
    const issue = props.issue;


    const passStatuses = (response)=>{
        setStatuses(response.data.terms);
    }

    if (statuses.length === 0) {
        IspCpHelper.callApi('/terms/' + slugify('Статусы заявок')).then(passStatuses)
    }

    const input_props = {
        "data-issue_id":issue.id
    }

    return(
        <FormControl fullWidth={true} margin={"dense"}>
            <InputLabel shrink={true}>Статус заявки</InputLabel>
            <NativeSelect inputProps={input_props} value={issue.report_status.id} onChange={props.onChange}>
                <option value={0}></option>
                {statuses.map((option, index_key)=>{
                    return(
                        <option value={option.id}>{option.title}</option>
                    );
                })}
            </NativeSelect>
        </FormControl>
    );
}

export default IssueStatusSelect;