import Box from "@material-ui/core/Box";
import NativeSelect from "@material-ui/core/NativeSelect";
import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {FormControl, InputLabel} from "@material-ui/core";

export default function ChainedList(props) {
    const onChange = props.onChange;
    const children = props.children;

    return (
        <FormControl fullWidth={true} margin={"dense"}>
            <InputLabel shrink={true}>{props.label}</InputLabel>
            <NativeSelect name={props.id} onChange={onChange} id={props.id} value={props.value}>
                <option value={0}></option>
                {children.map(child => {
                    return (<option value={child.id}>{child.title}</option>);
                })}
            </NativeSelect>
        </FormControl>
    );
}