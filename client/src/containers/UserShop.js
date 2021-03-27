import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import StoreHeader from "../components/StoreHeader";
import { Card, LinearProgress } from "@material-ui/core";

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
            <StoreHeader>Demo Shop</StoreHeader>
            <div className={classes.container}>
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
                <LinearProgress variant="determinate" value={80} />
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
