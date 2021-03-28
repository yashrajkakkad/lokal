import {
    AppBar,
    Button,
    Dialog,
    IconButton,




    ListItem,
    ListItemAvatar,
    ListItemText, Slide,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import React, { useEffect, useState } from "react";
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
    const [userName, setUserName] = useState("");
    const [stores, setStores] = useState([]);

    const uid = localStorage.getItem("userId");

    useEffect(() => {
        const urlProfile = `${config.basrUrl}api/user/user/${uid}`;
        const urlShop = `${config.basrUrl}api/store/allStores/owner/${uid}`;
        function getUser() {
            axios.get(urlProfile).then((res) => {
                setUserData(res.data);
                setUserName(res.data.firstName + " " + res.data.lastName);
            });
            axios.get(urlShop).then((res) => {
                console.log(res.data);
                setStores(res.data);
            });
        }
        getUser();
    }, [setUserData]);

    const closeHandler = () => {
        setDialogOpen(false);
    };

    const newStoreHandler = () => {
        const data = {
            name: storeName,
            hostId: uid,
            emailId: email,
            phoneNumber: phone,
            storeTiers: [
                {
                    name: "Silver",
                    description: "You will get access to all the games",
                    level: 1,
                    minValue: 1,
                    maxValue: 10,
                },
                {
                    name: "Gold",
                    description: "You will get early access to new games",
                    level: 2,
                    minValue: 11,
                    maxValue: 20,
                },
            ],
        };
        const storeUrl = `${config.basrUrl}api/store/create`;
        axios.post(storeUrl, data).then((res) => {
            console.log(res);
            window.location.reload();
        });
    };

    return (
        <div className={classes.screen}>
            <UserHeader>
                <div className={classes.logoContainer}>
                    <img src={logo} alt="logo" className={classes.logo} />
                </div>
                <div className={classes.userName}>
                    {userName}
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
                                props.history.push(`/ownerShop/${shop._id}`);
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
                        <Button color="inherit" onClick={newStoreHandler}>
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
                    {/* <TextField
                        variant="outlined"
                        label="Host ID"
                        fullWidth
                        className={classes.txtfield}
                        value={hostId}
                        onChange={(e) => {
                            setHostId(e.target.value);
                        }}
                    /> */}
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
