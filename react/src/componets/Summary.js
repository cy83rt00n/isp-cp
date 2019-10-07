import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {Input, NativeSelect} from "@material-ui/core";
import IspCpHelper from "../IspCpHelper";
import {slugify} from "transliteration";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";

const HTMLEntity = require("html-entities");
const dateFormat = require("dateformat");

export default class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: []
        }
    }

    handleClickFind = (event) => {
        event.preventDefault();
        IspCpHelper.debug(event.target);

        var status = "/" + event.target.status.value;
        var date = "/" + event.target.date.value;
        IspCpHelper.callApi('/summary' + date + status,{}).then((response) => {
            this.setState({index: response.data.index})
        })
    }

    render() {
        return ([
            <IssueSearchForm key={"issue-search-form"} onClickFind={this.handleClickFind}/>,
            <IssueSearchList key={"issue-search-list"} index={this.state.index}/>
        ]);
    }
}

function IssueSearchForm(props) {
    const [statuses, setStatuses] = React.useState([]);


    const passStatuses = (response) => {
        setStatuses(response.data.terms);
    }

    if (statuses.length === 0) {
        IspCpHelper.callApi('/terms/' + slugify('Статусы заявок')).then(passStatuses)
    }

    return (
        <Box component={"div"} p={4} my={2} boxShadow={4}>
            <form onSubmit={props.onClickFind}>
                <Grid container={true}>
                    <Grid item={true} xs={2}>
                        <FormControl fullWidth={true} margin={"dense"}>
                            <InputLabel shrink={true}>{"Дата"}</InputLabel>
                            <Input id={"date"} type={"date"} name={"date"} defaultValue={dateFormat("yyyy-mm-dd")}/>
                        </FormControl>
                    </Grid>
                    <Grid item={true} xs={2}>
                        <FormControl fullWidth={true} margin={"dense"}>
                            <InputLabel shrink={true}>Статус заявки</InputLabel>
                            <NativeSelect name={"status"} defaultValue={"closed"}>
                                <option value={"closed"}>Завершенные</option>
                                <option value={"new"}>Новые</option>
                                <option value={"progress"}>В работе</option>
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                    <Grid item={true} xs={2}>
                        <Box mx={4}>
                            <Button type="submit" color="primary" variant={"contained"} size={"large"}>
                                FIND
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

function IssueSearchList(props) {
    IspCpHelper.debug(props);
    return (
        <Box component={"div"} p={4} my={2} boxShadow={4}>
            <Grid container>
                {props.index.map((index_entry, index_key) => {
                    const comment = JSON.parse(HTMLEntity.AllHtmlEntities.decode(index_entry.comment));
                    const resolved = () => {
                        if (index_entry.resolve_date > 0) {
                            const rd = new Date(parseInt(index_entry.resolve_date) * 1000).toLocaleDateString();
                            return (
                                <Chip
                                    size={"small"}
                                    label={"Выполнена: " + rd}
                                    color="secondary"
                                />
                            )
                        }
                        return (
                            <Chip
                                size={"small"}
                                label={"Не закрыта"}
                                color="primary"
                            />
                        );
                    }
                    return (
                        <Box component={"div"} p={0.5} my={0.5} width={1}>
                            <Grid container item sm={12} justify={"space-between"} spacing={2}>
                                <Grid item sm={12} md={"auto"} style={{flexShrink: 0}}>
                                    <Box my={0.3}>
                                        {resolved()}
                                    </Box>
                                    <Box my={0.3}>
                                        <Chip
                                            size={"small"}
                                            label={(comment.report_status.title || "Новая")}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item sm={12} md={"auto"} style={{flexShrink: 0}}>
                                    {comment.address.city.title} /
                                    {comment.address.street.title} /
                                    {comment.address.home.title} /
                                    {comment.address.flat.title}
                                </Grid>
                                <Grid item sm={12} md={"auto"}>
                                    {comment.contacts}
                                </Grid>
                                <Grid item sm={12} md={"auto"}>
                                    {comment.engineer.title}
                                </Grid>
                                <Grid item sm={12} md={"auto"}>
                                    {comment.comment}
                                </Grid>
                            </Grid>
                        </Box>
                    );
                })}
            </Grid>
        </Box>
    );
}