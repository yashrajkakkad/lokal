import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import StoreHeader from "../components/StoreHeader";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@material-ui/core";

const tiers = [
  {
    name: "Public",
    description: "You can only watch others play games",
    level: 0,
  },
  {
    name: "Noob",
    description: "You will get access to play certain games",
    level: 1,
  },
  {
    name: "Amateur",
    description: "You will get access to play all the games",
    level: 2,
  },
  {
    name: "Pro",
    description: "You will get early access and limited edition swags",
    level: 3,
  },
];

const styles = (theme) => ({
  screen: {
    height: "100vh",
    width: "100%",
    overflow: "auto",
    // backgroundColor: "white",

    background: "white",
  },
  container: {
    width: "100%",
    padding: "0px 20px",
    boxSizing: "border-box",
  },
  dialogBox: {
    padding: 10,
    // justifyContent: "center",
    // display: "flex"
  },
  dialogText: {
    width: "calc(100% - 40px)",
    marginBottom: 20,
  },
  textContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  },
  tierTitle: {
    margin: 20,
    backgroundColor: "",
  },
});

const OwnerShop = (props) => {
  const { classes } = props;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [amount, setAmount] = useState("");

  const dialogHandler = () => {
    setDialogOpen(!dialogOpen);
  };

  return (
    <div className={classes.screen}>
      <StoreHeader>Demo Shop</StoreHeader>
      <div className={classes.container}>
        <div className={classes.buttonContainer}>
          <Button variant="contained" color="primary" onClick={dialogHandler}>
            Create Transaction
          </Button>
        </div>
      </div>
      <Dialog
        className={classes.dialogBox}
        onClose={dialogHandler}
        open={dialogOpen}
        fullWidth
      >
        <DialogTitle className={classes.dialogTitle}>
          Enter Transaction Details
        </DialogTitle>
        <div className={classes.textContainer}>
          <TextField
            className={classes.dialogText}
            variant="outlined"
            label="Customer Username"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <TextField
            className={classes.dialogText}
            variant="outlined"
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
        <DialogActions>
          <Button onClick={dialogHandler} color="primary">
            Cancel
          </Button>
          <Button onClick={dialogHandler} color="primary">
            Enter
          </Button>
        </DialogActions>
      </Dialog>
      <div className={classes.tierContainer}>
        <h2 className={classes.tierHeading}>List of Tiers</h2>
        {tiers.map((tier) => {
          return (
            <>
              <span className={classes.tierTitle}>
                Tier Level {tier.level}: {tier.name}{" "}
              </span>
              <br />
              {tier.description}
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default withStyles(styles)(OwnerShop);
