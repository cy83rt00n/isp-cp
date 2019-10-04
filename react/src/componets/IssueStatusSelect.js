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


const ch = ()=>{
    return 0;
}

function IssueStatusSelect(props)
{
    const [statuses, setStatuses] = React.useState([]);

    var issue = props.issue;


    const passStatuses = (response)=>{
        setStatuses(response.data.terms);
    }

    if (statuses.length === 0) {
        new IspCpHelper().callApi('/terms/' + slugify('Статусы заявок'), null, passStatuses);
    }

    return(
        <NativeSelect id={"status-for-issue-" + issue.id} inputProps={{"data-issueindex":props.issueIndex}} value={issue.report_status.id} onChange={props.onChange}>
            <option key={"issue-status-" + 0} value={0}>{"Статус"}</option>
            {statuses.map(option=>{
                return(
                    <option key={"issue-status-" + option.id} value={option.id}>{option.title}</option>
                );
            })}
        </NativeSelect>
    );
}

export default IssueStatusSelect;