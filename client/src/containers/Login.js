import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, TextField } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { useDispatch } from "react-redux";

import * as authActions from "../store/actions/auth";

const styles = (theme) => ({
    screen: {
        height: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        backgroundColor: "#bac9fe",
    },
    baseCard: {
        width: "80%",
        padding: "20px 10px",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    cardTitle: {
        fontSize: 20,
        marginBottom: 20,
    },
    marginStyle: {
        marginBottom: 20,
    },
    loginButton: {
        width: "50%",
        height: 50,
        borderRadius: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6ed164",
    },
    switch: {
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
                <div className={classes.cardTitle}>LOGIN</div>
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
                    <div
                        className={classes.loginButton}
                        onClick={submitHandler}
                    >
                        Login
                    </div>
                )}

                <div
                    className={classes.switch}
                    onClick={() => {
                        props.history.push("/signup");
                    }}
                >
                    Switch to signup
                </div>
            </Card>
        </div>
    );
};

export default withStyles(styles)(LoginPage);
