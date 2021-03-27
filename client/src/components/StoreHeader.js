import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  screen: {
    minHeight: 100,
    width: "100%",
    // backgroundColor: "#FF8552",
    background: "linear-gradient(90deg,#29323c,#485563)",
    // padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    color: "white",
    // margin: 5,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    boxShadow: "10px 10px 5px grey",
  },
});

const StoreHeader = (props) => {
  const { classes } = props;

  return (
    <>
      <div className={classes.screen}>
        {props.children}
        <br />
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className={classes.wave}
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="00%"
              style={{
                stopColor: "#29323c",
                stopOpacity: "1",
              }}
            />
            <stop
              offset="100%"
              style={{
                stopColor: "#485563",
                stopOpacity: "1",
              }}
            />
          </linearGradient>
        </defs>
        <path
          fill="url(#grad1)"
          fill-opacity="1"
          d="M0,192L48,202.7C96,213,192,235,288,245.3C384,256,480,256,576,234.7C672,213,768,171,864,144C960,117,1056,107,1152,101.3C1248,96,1344,96,1392,96L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
    </>
  );
};

export default withStyles(styles)(StoreHeader);
