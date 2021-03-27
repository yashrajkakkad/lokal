import { withStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

const styles = (theme) => ({
    container: {
        width: "100%",
        // padding: "0px 20px",
        boxSizing: "border-box",
    },
});

const CommunityDetails = (props) => {
    const { classes } = props;

    const [posts, setPosts] = useState([]);

    const path = window.location.pathname.split("/");
    const storeId = path[path.length - 1];

    useEffect(() => {
        const url = `${config.basrUrl}api/posts/${storeId}`;
        function getPosts() {
            axios.get(url).then((res) => {
                console.log(res.data);
            });
        }
        getPosts();
    });

    return <div className={classes.container}>Posts</div>;
};

export default withStyles(styles)(CommunityDetails);
