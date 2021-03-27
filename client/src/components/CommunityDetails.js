import {
    AppBar,
    Avatar,
    Box,
    Card,
    CardHeader,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tabs,
    Tooltip,
    Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import logo from "../assets/userLogo.jpg";
import CircularProgressBar from "./CircularProgressBar";
import axios from 'axios'
import config from '../config'

const styles = (theme) => ({
    container: {
        width: "100%",
        // padding: "0px 20px",
        boxSizing: "border-box",
    },
});

const CommunityDetails = (props) => {
    const { classes } = props;

    const [posts, setPosts] = useState([])

    return (
        <div className={classes.container}>
            fdfdngjndfgjnjdfngj
        </div>
    );
};

export default withStyles(styles)(CommunityDetails);
