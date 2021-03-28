import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import logo from "../assets/userLogo.jpg";
import UserHeader from "../components/UserHeader";
import config from "../config";


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
        backgroundColor: "white",
    },
    logoContainer: {
        textAlign: "center",
    },
    logo: {
        margin: 10,
        height: 100,
        width: 100,
        borderRadius: 50,
        boxShadow: "0 8px 6px -6px black",
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
        width: "100%",
        padding: "0px 20px",
        boxSizing: "border-box",
    },
    newButton: {
        position: "fixed",
        bottom: 20,
        right: 15,
        background:
            "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898",
        backgroundBlendMode: "multiply,multiply",
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
    fieldKey: {
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
        padding: 5,
        backgroundColor: "#DCD9D4",
        backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%), radial-gradient(at 50% 0%, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.50) 50%)",
        backgroundBlendMode: "soft-light,screen",
        boxShadow: "0 8px 6px -6px black",
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },
});

const SelectShop = (props) => {
    const { classes } = props;

    const fName = useSelector((state) => state.auth.firstName);
    const lName = useSelector((state) => state.auth.lastName);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [storeId, setStoreId] = useState("");
    const [stores, setStores] = useState([]);

    const uid = localStorage.getItem("userId");

    useEffect(() => {
        const url = `${config.basrUrl}api/store/allStores/${uid}`;
        function getStores() {
            axios
                .get(url)
                .then((res) => {
                    console.log(res.data)
                    setStores(res.data);
                })
                .catch((err) => {
                    setStores([]);
                });
        }
        getStores();
    }, [setStores]);

    const closeHandler = () => {
        setDialogOpen(false);
    };

    const joinStoreHandler = () => {
        const data = {
            storeId: storeId,
            userId: uid,
        };
        const url = `${config.basrUrl}api/store/join`;
        axios.post(url, data).then((res) => {
            console.log(res);
            window.location.reload();
        });
    };

    console.log(fName, lName);

    return (
        <div className={classes.screen}>
            <UserHeader>
                <div className={classes.logoContainer}>
                    <img src={logo} alt="logo" className={classes.logo} />
                </div>
                <div className={classes.userName}>
                    {fName} {lName}
                </div>
            </UserHeader>
            <div className={classes.shopContainer}>
                <div className={classes.fieldKey}>
                    <Typography variant="h5">Available shops</Typography>
                </div>
                <div className={classes.fieldValue}>
                    {stores.map((shop, key) => (
                        <ListItem
                            style={{ padding: "6px 4px 6px 4px" }}
                            divider={key < stores.length - 1}
                            key={key}
                            onClick={() => {
                                props.history.push(`/userShop/${shop._id}`);
                            }}
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
                            <ListItemText primary={shop.name} secondary={`subtitle`} />
                        </ListItem>
                    ))}
                </div>
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
                    <Button onClick={joinStoreHandler} color="primary">
                        Enter
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default withStyles(styles)(SelectShop);
