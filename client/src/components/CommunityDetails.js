import { withStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

const styles = (theme) => ({
  container: {
    width: "100%",
    // padding: "0px 20px",
    boxSizing: "border-box",
  },
  title: {
    width: "100%",
    marginTop: 15,
    padding: 5,
    borderRadius: 5,
    color: "white",
    background:
      "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898",
    backgroundBlendMode: "multiply,multiply",
  },
  info: {
    width: "100%",
    padding: 5,
    marginTop: 15,
    backgroundColor: "#DCD9D4",
    backgroundImage:
      "linear-gradient(to bottom, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%), radial-gradient(at 50% 0%, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.50) 50%)",
    backgroundBlendMode: "soft-light,screen",
    boxShadow: "0 8px 6px -6px black",
    borderRadius: 5,
    // borderBottomLeftRadius: 5,
  },
  date: {
    textAlign: "right",
    fontSize: 10,
  },
});

const CommunityDetails = (props) => {
  const { classes } = props;

  const [posts, setPosts] = useState([]);

  const path = window.location.pathname.split("/");
  const storeId = path[path.length - 1];

  useEffect(() => {
    const url = `${config.basrUrl}api/post/posts/${storeId}`;
    function getPosts() {
      axios.get(url).then((res) => {
        console.log(res.data);
        setPosts(res.data);
      });
    }
    getPosts();
  }, [setPosts]);

  return (
    <div className={classes.container}>
      <div className={classes.title}>Posts</div>
      {posts.map((post) => {
        return (
          <div className={classes.info}>
            <div className={classes.content}>{post.content}</div>
            <div className={classes.date}>{post.createdAt}</div>
          </div>
        );
      })}
    </div>
  );
};

export default withStyles(styles)(CommunityDetails);
