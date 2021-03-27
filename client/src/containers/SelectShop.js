import {
    Button,
    Card,
    CardHeader,
    Dialog,
    DialogActions,
    DialogTitle,

    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, TextField
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from "react";
import logo from "../assets/userLogo.jpg";
import { useSelector } from "react-redux";


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
        height: 140,
        width: "100%",
        // backgroundColor: "black",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        marginBottom: 20,
        boxSizing: "border-box",
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
        padding: "10px 10px",
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
    dialogBox: {
        padding: 10,
        // justifyContent: "center",
        // display: "flex"
    },
    dialogText: {
        width: "calc(100% - 40px)",
    },
    textContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
});

const SelectShop = (props) => {
    const { classes } = props;

    const fName = useSelector(state => state.auth.firstName)
    const lName = useSelector(state => state.auth.lastName)

    const [dialogOpen, setDialogOpen] = useState(false);
    const [storeId, setStoreId] = useState("");

    const closeHandler = () => {
        setDialogOpen(false);
    };

    console.log(fName, lName)

    return (
        <div className={classes.screen}>
            <div className={classes.nameBar}>
                <img src={logo} alt="logo" className={classes.logo} />
                <div className={classes.userName}>{fName} {lName}</div>
            </div>
            <div className={classes.shopContainer}>
                {/* {shops.map((shop, key) => (
                    <Card
                        key={key}
                        className={classes.shopCard}
                        onClick={() => {
                            props.history.push("/userShop");
                        }}
                    >
                        {shop.title}
                    </Card>
                ))} */}
                <Card className={classes.shopCard}>
                    <CardHeader
                        style={{ padding: "4px", paddingTop: "2px" }}
                        title="Available shops"
                    />
                    <Divider />
                    <List
                        style={{ padding: "1px 0px 1px 0px" }}
                    >
                        {shops.map((shop, key) => (
                            <ListItem
                                style={{ padding: "6px 4px 6px 4px" }}
                                divider={key < shops.length - 1}
                                key={key}
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
                                    primary={shop.title}
                                    secondary={`subtitle`}
                                />
                                {/* <IconButton
                            edge="end"
                            size="small"
                        >
                            <MoreVertIcon />
                        </IconButton> */}
                            </ListItem>
                        ))}
                    </List>
                </Card>
            </div>
            <div
                className={classes.newButton}
                onClick={() => {
                    setDialogOpen(true);
                }}
            >
                <AddIcon style={{ color: "white", fontSize: 35 }} />
            </div>

            <Dialog
                className={classes.dialogBox}
                onClose={closeHandler}
                open={dialogOpen}
                fullWidth
            >
                <DialogTitle className={classes.dialogTitle}>
                    Enter Store's UPI ID
                </DialogTitle>
                <div className={classes.textContainer}>
                    <TextField
                        className={classes.dialogText}
                        variant="outlined"
                        placeholder="Store UPI ID"
                        value={storeId}
                        onChange={(e) => {
                            setStoreId(e.target.value);
                        }}
                    />
                </div>
                <DialogActions>
                    <Button onClick={closeHandler} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={closeHandler} color="primary">
                        Enter
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default withStyles(styles)(SelectShop);
