import {
    Avatar,


    Box, Card, CardHeader, Divider, List, ListItem,
    ListItemAvatar, ListItemText,




    Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel,
    Tooltip
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
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
    },
    shopCard: {
        width: "90%",
        marginTop: 10,
        padding: "10px 10px",
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
});

const UserShop = (props) => {
    const { classes } = props;

    // const [expandedA, setExpandedA] = useState(false);
    // const [expandedB, setExpandedB] = useState(false);

    // const handleExpandedA = () => {
    //     setExpandedA(!expandedA);
    // };

    // const handleExpandedB = () => {
    //     setExpandedB(!expandedB);
    // };

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
                <div className={classes.shopContainer}>
                    <Card className={classes.shopCard}>
                        <CardHeader
                            style={{ padding: "4px", paddingTop: "2px" }}
                            title="Current tier"
                        />
                        <Divider />
                        <List
                            style={{ padding: "1px 0px 1px 0px" }}
                        >
                            <ListItem
                                style={{ padding: "6px 4px 6px 4px" }}
                                onClick={() => {
                                    props.history.push("/userShop");
                                }}
                            >
                                <ListItemAvatar>
                                    <img
                                        alt={shop.title}
                                        src={logo}
                                        style={{
                                            height: 48,
                                            width: 48
                                        }}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={"Noob"}
                                    secondary={`desc`}
                                />
                            </ListItem>
                        </List>
                    </Card>
                </div>
                <div className={classes.shopContainer}>
                    <Card className={classes.shopCard}>
                        <CardHeader
                            style={{ padding: "4px", paddingTop: "2px" }}
                            title="Next tier"
                        />
                        <Divider />
                        <List
                            style={{ padding: "1px 0px 1px 0px" }}
                        >
                            <ListItem
                                style={{ padding: "6px 4px 6px 4px" }}
                                onClick={() => {
                                    props.history.push("/userShop");
                                }}
                            >
                                <ListItemAvatar>
                                    <img
                                        alt={shop.title}
                                        src={logo}
                                        style={{
                                            height: 48,
                                            width: 48
                                        }}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={"Amateur"}
                                    secondary={`desc`}
                                />
                            </ListItem>
                        </List>
                    </Card>
                </div>
                <div className={classes.shopContainer}>
                    <Card className={classes.transCard}>
                        <CardHeader title="Recent transactions" />
                        <Divider />
                        {/* <PerfectScrollbar> */}
                        <Box sx={{ minWidth: 800 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Transaction amount
                            </TableCell>
                                        <TableCell sortDirection="desc">
                                            <Tooltip
                                                enterDelay={300}
                                                title="Sort"
                                            >
                                                <TableSortLabel
                                                    active
                                                    direction="desc"
                                                >
                                                    Date
                                </TableSortLabel>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transactions.map((transaction, key) => (
                                        <TableRow
                                            hover
                                            key={key}
                                        >
                                            <TableCell>
                                                {transaction.amount}
                                            </TableCell>
                                            <TableCell>
                                                {transaction.date}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                        {/* </PerfectScrollbar> */}
                    </Card>
                </div>
                {/* <div>Recent Transactions</div>
                {transactions.map((txn, key) => (
                    <div key={key}>
                        {txn.amount}, {txn.date}
                    </div>
                ))} */}
            </div>
        </div>
    );
};

export default withStyles(styles)(UserShop);
