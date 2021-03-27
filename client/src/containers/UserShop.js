import { Avatar, Card } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import React, { useState } from "react";
import logo from "../assets/userLogo.jpg";
import CircularProgressBar from "../components/CircularProgressBar";
import StoreHeader from "../components/StoreHeader";

const shop = [
    { title: "Demo Shop" },
];

const transactions = [
    { amount: 1000, date: "13/03/2021" },
    { amount: 1000, date: "13/03/2021" },
    { amount: 1000, date: "13/03/2021" },
];

const styles = (theme) => ({
    screen: {
        height: "100vh",
        width: "100%",
        overflow: "auto",
        backgroundColor: "#bac9fe",
    },
    container: {
        width: "100%",
        padding: "0px 20px",
        boxSizing: "border-box",
    },
    levelIndicator: {
        display: "flex",
        marginTop: 10,
        marginBottom: 10,
    },
    descCard: {
        marginBottom: 20,
        padding: 10,
    },
    avatar: {
        marginRight: "8px",
    }
});

const UserShop = (props) => {
    const { classes } = props;

    const [expandedA, setExpandedA] = useState(false);
    const [expandedB, setExpandedB] = useState(false);

    const handleExpandedA = () => {
        setExpandedA(!expandedA);
    };

    const handleExpandedB = () => {
        setExpandedB(!expandedB);
    };

    return (
        <div className={classes.screen}>
            <StoreHeader>
                <Avatar className={classes.avatar}>
                    <img
                        alt={shop.title}
                        src={logo}
                        style={{
                            height: 48,
                            width: 48
                        }}
                    />
                </Avatar>
                Demo Shop
            </StoreHeader>
            <div className={classes.container}>
                {/* <LinearProgress variant="determinate" value={80} /> */}
                <CircularProgressBar />
                <div
                    className={classes.levelIndicator}
                    onClick={handleExpandedA}
                >
                    <div>Noob</div>
                    {expandedA ? (
                        <KeyboardArrowUpIcon />
                    ) : (
                        <KeyboardArrowDownIcon />
                    )}
                </div>
                {expandedA ? (
                    <Card className={classes.descCard}>Desc 1</Card>
                ) : null}
                <div
                    className={classes.levelIndicator}
                    onClick={handleExpandedB}
                >
                    <div>Amatuer</div>
                    {expandedB ? (
                        <KeyboardArrowUpIcon />
                    ) : (
                        <KeyboardArrowDownIcon />
                    )}
                </div>
                {expandedB ? (
                    <Card className={classes.descCard}>Desc 2</Card>
                ) : null}
                <div>Recent Transactions</div>
                {transactions.map((txn, key) => (
                    <div key={key}>
                        {txn.amount}, {txn.date}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default withStyles(styles)(UserShop);
