import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import logo from "../assets/userLogo.jpg";

const shops = [
    { title: "Demo Shop" },
    { title: "Demo Shop" },
    { title: "Demo Shop" },
    { title: "Demo Shop" },
];

const styles = (theme) => ({
    screen: {
        height: "100vh",
        width: "100%",
        overflow: "auto",
        backgroundColor: "#bac9fe",
    },
    nameBar: {
        height: 100,
        width: "100%",
        // backgroundColor: "black",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    userName: {
        marginLeft: 20,
        fontSize: 30,
    },
    shopCard: {
        width: "80%",
        marginBottom: 20,
        padding: "20px 15px",
    },
    shopContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    newButton: {
        position: "fixed",
        bottom: 20,
        right: 15,
        backgroundColor: "#4a83fe",
        height: 60,
        width: 60,
        borderRadius: 30,
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});

const SelectShop = (props) => {
    const { classes } = props;

    return (
        <div className={classes.screen}>
            <div className={classes.nameBar}>
                <img src={logo} alt="logo" className={classes.logo} />
                <div className={classes.userName}>John Doe</div>
            </div>
            <div className={classes.shopContainer}>
                {shops.map((shop, key) => (
                    <Card key={key} className={classes.shopCard}>
                        {shop.title}
                    </Card>
                ))}
            </div>
            <div className={classes.newButton}>
                <AddIcon style={{ color: "white", fontSize: 35 }} />
            </div>
        </div>
    );
};

export default withStyles(styles)(SelectShop);
