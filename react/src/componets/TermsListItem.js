import React from 'react';
import LabelIcon from '@material-ui/icons/Label';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import {makeStyles} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";

export default function TermsListItem(props) {
    console.log("I'm TermsListItem : ");
    console.log(props);
    const item = (props.term.children.length === 0) ? <EmptyTerm  title={props.term.title} handleDeleteTerm={props.handleDeleteTerm} id={props.term.id}/> :
        <HierTerm term={props.term}  handleDeleteTerm={props.handleDeleteTerm} id={props.term.id}/>;
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
            <ListItemIcon>
                <LabelIcon/>
            </ListItemIcon>
            <ListItemText primary={props.title}/>
            <Button type="button" onClick={props.handleDeleteTerm} data-delete={props.id} color="primary" variant={"outlined"}>
                DELETE
            </Button>
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
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return ([
        <EmptyTerm title={props.term.title} handleDeleteTerm={props.handleDeleteTerm} id={props.term.id}/>,
        <ListItem key={"term-" + props.term.id}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List key={"term-" + props.term.id + "-neseted"} component="div" disablePadding>
                    {
                        props.term.children.map(child => {
                            return (

                                <EmptyTerm key={"term-" + child.id} className={classes.nested} title={child.title} handleDeleteTerm={props.handleDeleteTerm} id={child.id}/>
                            );
                        })
                    }
                </List>
            </Collapse>
        </ListItem>
    ]);
}