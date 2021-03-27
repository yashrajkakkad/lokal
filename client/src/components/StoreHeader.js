import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
    screen: {
        minHeight: 100,
        width: "100%",
        backgroundColor: "#4a83fe",
        padding: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
    },
});

const StoreHeader = (props) => {
    const { classes } = props;

    return <div className={classes.screen}>{props.children}</div>;
};

export default withStyles(styles)(StoreHeader);
