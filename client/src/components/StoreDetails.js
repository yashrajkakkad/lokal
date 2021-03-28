import React, { useEffect, useState } from "react";
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
    Typography,
    CircularProgress,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import logo from "../assets/userLogo.jpg";
import CircularProgressBar from "../components/CircularProgressBar";
import axios from "axios";
import config from "../config";

const shop = [{ title: "Demo Shop" }];

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
        backgroundColor: "white",
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
    },
    shopCard: {
        width: "90%",
        marginTop: 10,
        // padding: "10px 10px",
    },
    transCard: {
        width: "90%",
        marginTop: 10,
        marginBottom: 10,
        padding: "10px 10px",
    },
    shopContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    fieldKey: {
        width: "100%",
        marginTop: 15,
        padding: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        color: "white",
        background:
            "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898",
        backgroundBlendMode: "multiply,multiply",
    },
    fieldValue: {
        width: "100%",
        padding: 5,
        backgroundColor: "#DCD9D4",
        backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%), radial-gradient(at 50% 0%, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.50) 50%)",
        backgroundBlendMode: "soft-light,screen",
        boxShadow: "0 8px 6px -6px black",
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },
    tableCell: {
        padding: "4px",
    },
});

const StoreDetails = (props) => {
    const { classes } = props;

    const path = window.location.pathname.split("/");
    const storeId = path[path.length - 1];
    const [storeData, setStoreData] = useState();

    const uid = localStorage.getItem("userId");

    useEffect(() => {
        function getStore() {
            const url = `${config.basrUrl}api/user/tier/${uid}/${storeId}`;
            axios.get(url).then((res) => {
                console.log(res);
                setStoreData(res.data);
            });
        }
        getStore();
    }, [setStoreData]);

    if (storeData) {
        return (
            <div className={classes.container}>
                <CircularProgressBar
                    currValue={
                        storeData.percentage ? storeData.percentage : 100
                    }
                />
                <div className={classes.fieldKey}>
                    <Typography variant="h5">Current tier</Typography>
                </div>
                <div className={classes.fieldValue}>
                    <ListItem
                        className={classes.listItem}
                        style={{ padding: "6px 4px 6px 4px" }}
                        // onClick={() => {
                        //     props.history.push("/userShop");
                        // }}
                    >
                        <ListItemAvatar>
                            <img
                                alt={shop.title}
                                src={logo}
                                style={{
                                    height: 48,
                                    width: 48,
                                }}
                            />
                        </ListItemAvatar>
                        <ListItemText primary={storeData.curTier.name} secondary={`desc`} />
                    </ListItem>
                </div>
                <div className={classes.fieldKey}>
                    <Typography variant="h5">Next tier</Typography>
                </div>
                <div className={classes.fieldValue}>
                    <ListItem
                        className={classes.listItem}
                        style={{ padding: "6px 4px 6px 4px" }}
                        // onClick={() => {
                        //     props.history.push("/userShop");
                        // }}
                    >
                        <ListItemAvatar>
                            <img
                                alt={shop.title}
                                src={logo}
                                style={{
                                    height: 48,
                                    width: 48,
                                }}
                            />
                        </ListItemAvatar>
                        <ListItemText primary={storeData.nextTier.name} secondary={`desc`} />
                    </ListItem>
                </div>
                <div className={classes.fieldKey}>
                    <Typography variant="h5">Recent transactions</Typography>
                </div>
                <div className={classes.fieldValue}>
                    {/* <Box sx={{ minWidth: 800 }}> */}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableCell}>
                                    Transaction amount
                                </TableCell>
                                <TableCell
                                    className={classes.tableCell}
                                    sortDirection="desc"
                                >
                                    <Tooltip enterDelay={300} title="Sort">
                                        <TableSortLabel active direction="desc">
                                            Date
                                        </TableSortLabel>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {storeData.transactions.map((transaction, key) => (
                                <TableRow hover key={key}>
                                    <TableCell className={classes.tableCell}>
                                        {transaction.amount}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {transaction.date}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* </Box> */}
                </div>
            </div>
        );
    } else {
        return (
            <div
                style={{
                    height: "100vh",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                }}
            >
                <CircularProgress />
            </div>
        );
    }
};

export default withStyles(styles)(StoreDetails);
