import {
    AppBar,

    Box,
    Tab,
    Tabs,
    Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import logo from "../assets/userLogo.jpg";
import CommunityDetails from "../components/CommunityDetails";
import StoreDetails from "../components/StoreDetails";
import StoreHeader from "../components/StoreHeader";

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
    tableCell: {
        padding: "4px",
    }
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const UserShop = (props) => {
    const { classes } = props;

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                <div className={classes.logoContainer}>
                    <img src={logo} alt="logo" className={classes.logo} />
                </div>
                {/* <Avatar className={classes.avatar}>
                    <img
                        alt={shop.title}
                        src={logo}
                        style={{
                            height: 48,
                            width: 48,
                        }}
                    />
                </Avatar> */}
                Demo Shop
            </StoreHeader>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab label="Store Details" {...a11yProps(0)} />
                    <Tab label="Community" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <StoreDetails />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CommunityDetails />
            </TabPanel>
        </div>
    );
};

export default withStyles(styles)(UserShop);
