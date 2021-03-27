import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import StoreHeader from "../components/StoreHeader";
import {
  Card,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
} from "@material-ui/core";

import logo from "../assets/userLogo.jpg";
import UserHeader from "../components/UserHeader";

// make an API call to /api/user/me
const user = {
  credit: 10,
  username: "credit1",
  email: "credit@gmail.com",
  type: "member",
  firstName: "Aman",
  lastName: "Dave",
  phoneNumber: 9825030355,
};

// make an API call to /api/transactions/
const transactions = [
  { amount: 1000, date: "13/03/2021" },
  { amount: 1000, date: "13/03/2021" },
  { amount: 1000, date: "13/03/2021" },
];

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  menuItem: {
    boxShadow: "0 8px 6px -6px black",
    margin: 5,
    padding: 0,
  },
  transactions: {
    marginTop: 15,
  },
  screen: {
    height: "100vh",
    width: "100%",
    overflow: "auto",
    backgroundColor: "#bac9fe",
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
  fieldKey: {
    marginTop: 15,
  },
  fieldValue: {
    padding: 5,
    backgroundColor: "#4a83fe",
    boxShadow: "0 8px 6px -6px black",
    border: "1px solid black",
  },
});

const UserProfile = (props) => {
  const { classes } = props;

  return (
    <div className={classes.screen}>
      <div className={classes.logoContainer}>
        <img src={logo} alt="logo" className={classes.logo} />
        {/* <div className={classes.userName}>John Doe</div> */}
      </div>
      <UserHeader>
        {user.firstName} {user.lastName}
      </UserHeader>
      <div className={classes.container}>
        {Object.entries(user).map(([key, value]) => {
          return (
            <>
              <div className={classes.fieldKey}>Your {key}:</div>
              <div className={classes.fieldValue}>{value}</div>
            </>
          );
        })}

        <div className={classes.transactions}>
          Your recent transactions:
          <br />
          <FormControl className={classes.formControl}>
            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              {transactions.map((transaction) => {
                return (
                  <MenuItem className={classes.menuItem} value={10}>
                    {transaction.amount} on date {transaction.date}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(UserProfile);
