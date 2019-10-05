import React from 'react';
import {makeStyles} from "@material-ui/core";
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

export default function TermsListItem(props) {
    console.log("I'm TermsListItem : ");
    console.log(props);
    const item = (props.term.children.length === 0) ?
        <EmptyTerm key={"term-" + props.term.id} title={props.term.title} handleDeleteTerm={props.handleDeleteTerm} id={props.term.id}/> :
        <HierTerm key={"term-" + props.term.id} term={props.term} handleDeleteTerm={props.handleDeleteTerm} id={props.term.id}/>;
    return (item);
}

/**
 *
 * @param props
 * @constructor
 */
function EmptyTerm(props) {
    const itemClass = props.className || "";
    return (
        <ListItem key={"term-" + props.id} button className={itemClass}>
            <ListItemAvatar>
                <ListItemIcon>
                    <LabelIcon/>
                </ListItemIcon>
            </ListItemAvatar>
            <ListItemText primary={props.title}/>
            <ListItemSecondaryAction>
                <Button type="button" onClick={props.handleDeleteTerm} data-delete={props.id} color="primary"
                        variant={"outlined"}>
                    DELETE
                </Button>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

/**
 *
 * @param props
 * @constructor
 */
function ParentTerm(props) {
    const itemClass = props.className || "";
    return (
        <ListItem key={"term-" + props.id} button className={itemClass} onClick={props.onClick}>
            <ListItemAvatar>
                <ListItemIcon>
                    <FolderIcon/>
                </ListItemIcon>
            </ListItemAvatar>
            <ListItemText primary={props.title}/>
            <ListItemSecondaryAction>
                <Button type="button" onClick={props.handleDeleteTerm} data-delete={props.id} color="primary"
                        variant={"outlined"}>
                    DELETE
                </Button>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

const hierStyles = makeStyles(theme => ({
    root  : {
        width          : '100%',
        maxWidth       : 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function HierTerm(props) {
    const classes = hierStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return ([
        <ParentTerm key={"term-" + props.term.id + "-root"} title={props.term.title} handleDeleteTerm={props.handleDeleteTerm} onClick={handleClick} id={props.term.id}/>,
        <Collapse key={"term-" + props.term.id + "-collapse"} in={open} timeout="auto" unmountOnExit>
            <List key={"term-" + props.term.id + "-neseted"} component="div" disablePadding className={classes.nested}>
                {
                    props.term.children.map(child => {
                        return (
                            <TermsListItem key={"term-" + child.id} term={child}
                                           handleDeleteTerm={props.handleDeleteTerm} id={child.id}/>
                        );
                    })
                }
            </List>
        </Collapse>
    ]);
}