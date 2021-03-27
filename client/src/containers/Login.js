import {
    Avatar,
    Button,
    Card,
    CircularProgress,
    Link,
    TextField
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { LockOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";


const styles = (theme) => ({
    screen: {
        height: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        backgroundColor: "white"
    },
    baseCard: {
        width: "80%",
        padding: "20px 10px",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#DCD9D4",
        backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%), radial-gradient(at 50% 0%, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.50) 50%)",
        backgroundBlendMode: "soft-light,screen",
        boxShadow: "0 8px 6px -6px black",
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },
    avatar: {
        backgroundColor: "#424E5B",
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 20,
        marginBottom: 20,
    },
    marginStyle: {
        marginBottom: 20,
    },
    loginButton: {
        // width: "50%",
        // height: 50,
        // borderRadius: 25,
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "#424E5B",
        color: "#fafafa",
    },
    switch: {
        color: "#424E5B",
        marginTop: 20,
    },
});

const LoginPage = (props) => {
    const { classes } = props;
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const usernameHandler = (event) => {
        setUsername(event.target.value);
    };

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    };

    const submitHandler = () => {
        setIsLoading(true);
        const user = {
            username: username,
            password: password,
        };
        dispatch(authActions.login(user))
            .then((res) => {
                // console.log(res);
                if (res.type === "member") {
                    props.history.push("/selectShop");
                } else {
                    props.history.push("/ownerSelectShop");
                }
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };

    return (
        <div className={classes.screen}>
            <Card className={classes.baseCard}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <div className={classes.cardTitle}>Login</div>
                <TextField
                    className={classes.marginStyle}
                    label="Username"
                    variant="outlined"
                    value={username}
                    fullWidth
                    onChange={usernameHandler}
                />
                <TextField
                    className={classes.marginStyle}
                    label="Password"
                    variant="outlined"
                    value={password}
                    fullWidth
                    type="password"
                    onChange={passwordHandler}
                />

                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <Button
                        className={classes.loginButton}
                        variant="contained"
                        onClick={submitHandler}
                    >
                        Login
                    </Button>
                )}

                <Link
                    className={classes.switch}
                    onClick={() => {
                        props.history.push("/signup");
                    }}
                >
                    Don't have an account? Sign Up.
        </Link>
            </Card>
        </div>
    );
};

export default withStyles(styles)(LoginPage);
