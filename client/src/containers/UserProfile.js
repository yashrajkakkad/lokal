import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";

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
  name: {
    textAlign: "center",
  },
});

const UserProfile = (props) => {
  const { classes } = props;

  return (
    <div className={classes.screen}>
      <UserHeader>
        <div className={classes.logoContainer}>
          <img src={logo} alt="logo" className={classes.logo} />
          {/* <div className={classes.userName}>John Doe</div> */}
        </div>
      </UserHeader>

      <h2 className={classes.name}>
        {" "}
        {user.firstName} {user.lastName}{" "}
      </h2>
      <div className={classes.container}>
        {Object.entries(user).map(([key, value]) => {
          return (
            <>
              <div className={classes.fieldKey}>Your {key}:</div>
              <div className={classes.fieldValue}>{value}</div>
            </>
          );
        })}
        <div>
          <div className={classes.fieldKey}>Your recent transactions:</div>

          <div style={{ width: "98%" }} className={classes.fieldValue}>
            {transactions.map((transaction) => {
              return (
                <div>
                  {transaction.amount} on date {transaction.date}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(UserProfile);
