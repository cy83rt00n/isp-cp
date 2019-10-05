import Box from "@material-ui/core/Box";
import NativeSelect from "@material-ui/core/NativeSelect";
import React from "react";

export default function ChainedList(props) {
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