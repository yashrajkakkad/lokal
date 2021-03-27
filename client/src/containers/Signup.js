import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, TextField, CircularProgress } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
    formControl: {
        width: "100%",
        marginBottom: 20,
    },
});

const SignupPage = (props) => {
    const { classes } = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = React.useState("");

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const usernameHandler = (event) => {
        setUsername(event.target.value);
    };

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    };

    const submitHandler = () => {
        setIsLoading(true);
        console.log(username, password, category);
        props.history.push("/selectShop");
    };

    return (
        <div className={classes.screen}>
            <Card className={classes.baseCard}>
                <div className={classes.cardTitle}>SIGN UP</div>
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

                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">
                        Category
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={category}
                        onChange={handleChange}
                        label="Age"
                    >
                        <MenuItem value="customer">Customer</MenuItem>
                        <MenuItem value="owner">Owner</MenuItem>
                    </Select>
                </FormControl>

                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <div
                        className={classes.loginButton}
                        onClick={submitHandler}
                    >
                        Signup
                    </div>
                )}

                <div
                    className={classes.switch}
                    onClick={() => {
                        props.history.push("/login");
                    }}
                >
                    Switch to login
                </div>
            </Card>
        </div>
    );
};

export default withStyles(styles)(SignupPage);
