import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
    AppBar,
    Button,
    Card,
    Dialog,
    IconButton,
    Slide,
    TextField,
    Toolbar,
    Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import logo from "../assets/userLogo.jpg";
import axios from "axios";
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
    appBar: {
        position: "relative",
        marginBottom: 20,
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    formContainer: {
        width: "100%",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
    },
    txtfield: {
        marginBottom: 20,
    },
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const OwnerSelectShop = (props) => {
    const { classes } = props;

    const [dialogOpen, setDialogOpen] = useState(false);
    const [storeName, setStoreName] = useState("");
    const [hostId, setHostId] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [userData, setUserData] = useState();
    const [userName, setUserName] = useState("")
    const [stores, setStores] = useState([]);

    const uid = localStorage.getItem("userId");

    useEffect(() => {
        const urlProfile = `${config.basrUrl}api/user/${uid}`;
        function getUser() {
            axios.get(urlProfile).then((res) => {
                console.log(res)
                setUserData(res.data);
            });
        }
        getUser();
    }, [setUserData]);

    const closeHandler = () => {
        setDialogOpen(false);
    };

    return (
        <div className={classes.screen}>
            <div className={classes.nameBar}>
                <img src={logo} alt="logo" className={classes.logo} />
                <div className={classes.userName}></div>
            </div>
            <div className={classes.shopContainer}>
                {shops.map((shop, key) => (
                    <Card
                        key={key}
                        className={classes.shopCard}
                        onClick={() => {
                            props.history.push("/ownerShop");
                        }}
                    >
                        {shop.title}
                    </Card>
                ))}
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
                fullScreen
                open={dialogOpen}
                onClose={closeHandler}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={closeHandler}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            New Store
                        </Typography>
                        <Button color="inherit" onClick={closeHandler}>
                            Save
                        </Button>
                    </Toolbar>
                </AppBar>
                <div className={classes.formContainer}>
                    <TextField
                        variant="outlined"
                        label="Store Name"
                        fullWidth
                        className={classes.txtfield}
                        value={storeName}
                        onChange={(e) => {
                            setStoreName(e.target.value);
                        }}
                    />
                    <TextField
                        variant="outlined"
                        label="Host ID"
                        fullWidth
                        className={classes.txtfield}
                        value={hostId}
                        onChange={(e) => {
                            setHostId(e.target.value);
                        }}
                    />
                    <TextField
                        variant="outlined"
                        label="Email ID"
                        fullWidth
                        type="email"
                        className={classes.txtfield}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <TextField
                        variant="outlined"
                        label="Phone Number"
                        fullWidth
                        type="number"
                        className={classes.txtfield}
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default withStyles(styles)(OwnerSelectShop);
