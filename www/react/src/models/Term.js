import React from "react";
import {Button, Link, ListItem} from "@material-ui/core";
import {slugify} from "transliteration";

export default class Term extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({
            id: this.props.id || 0,
            slug: this.props.slug || 'root',
            title: this.props.title || '',
            parentId: this.props.parentId || 4,
            onClick: this.props.onClick || undefined
        });
    }

    render() {
        return (
            <ListItem>
                <Link href={"/terms/" + slugify(this.props.title)}>{this.props.title}</Link>
                <Button type={"button"} data-delete={this.props.id} onClick={this.props.onClick}>DELETE</Button>
            </ListItem>
        )
    }

}