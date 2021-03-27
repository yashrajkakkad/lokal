const express = require("express");
const StoreModel = require("../models/store.model");
const PostModel = require("../models/post.model");
const router = express.Router();

// Get post by store id
router.get("/posts/:storeId", async (req, res) => {
  try {
    const storeId = req.params.storeId;
    console.log(storeId);
    const posts = await PostModel.find({ storeId: storeId }).exec();
    console.log(posts);
    res.status(200).send();
    // const store = await StoreModel.findById(req.params.storeId);
    // const postIds = store["postIds"];
    // Find all by Ids
    // const posts = await PostModel.findAllByIds
  } catch (e) {
    console.log("Takleef");
    res.status(500).send();
  }
});

// Create a post
router.post("/create", async (req, res) => {
  try {
    // const storeId = req.body.storeId;
    console.log(req.body);
    const Post = new PostModel(req.body);
    console.log("New post created");
    await Post.save();
    // const Store = StoreModel.findById(storeId);
    // // Will id be here?
    // Store["posts"].push({'postId' : Post._id});
    // await Store.save();
    res.status(201).send();
    // // Store["posts"]
  } catch (e) {
    console.log("Takleef");
    console.log(e);
    res.status(500).send();
  }
});

module.exports = router;
