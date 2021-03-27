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
    backgroundImage: "linear-gradient(to right, #434343 0%, black 100%)",
    borderRadius: 5,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    boxShadow: "0 8px 6px -6px black",
    color: "white",
    marginTop: 20,
  },
  button: {
    color: "white",
  },
  tierContainer: {
    padding: 20,
  },
  tierTitle: {
    marginTop: 15,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    color: "white",
    background:
      "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898",
    backgroundBlendMode: "multiply,multiply",
    // margin: 20,
    padding: 5,
    // minWidth: "100%",
  },
  tierDescription: {
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
          <Button className={classes.button} onClick={dialogHandler}>
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
              <div className={classes.tierTitle}>
                Tier Level {tier.level}: {tier.name}{" "}
              </div>
              <div className={classes.tierDescription}>{tier.description}</div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default withStyles(styles)(OwnerShop);
