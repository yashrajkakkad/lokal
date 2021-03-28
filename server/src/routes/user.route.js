const express = require("express");
const UserModel = require("../models/user.model");
const UserTierModel = require("../models/userTier.model");
const StoreModel = require("../models/store.model");
const TransactionModel = require("../models/transaction.model");
const TierModel = require("../models/tier.model");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/createUser", async (req, res) => {
  const user = new UserModel(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findByCredentials(
      req.body.username,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "email",
    "address1",
    "address2",
    "age",
    "password",
  ];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid updates" });
  }

  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send();
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/all", async (req, res) => {
  try {
    const users = await UserModel.find({});
    return res.send(users);
  } catch(e) {
    console.log('Problem che bhai');
    res.status(500).send();
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);
    console.log(user);
    return res.send(user);
  } catch(e) {
    console.log('Problem che bhai');
    res.status(500).send();
  }
});


router.get("/tier/:userId/:storeId", async (req, res) => {
  try {

    const userTier = await UserTierModel.findOne({'storeId' : req.params.storeId, 'userId' : req.params.userId});
    console.log(userTier);
    const level = userTier["level"];
    const store = await StoreModel.findById(req.params.storeId);
    console.log(store);
    const tiers = store["tiers"];
    const curTier = await TierModel.findById(tiers[level]._id);
    let nextTier;

    try{
      nextTier = await TierModel.findById(tiers[level+1]._id);
    } catch(e) {
      nextTier = null;
    }

    let percentage = (userTier["totalAmount"] - curTier["minValue"]) / (curTier["maxValue"] - curTier["minValue"]) * 100;
    if(percentage > 100)
    {
      percentage = 100;
    }
    // console.log(curTier['totalAmount'];)
    console.log(curTier["minValue"]);
    console.log(curTier["maxValue"]);
    console.log(userTier["totalAmount"]);
    console.log(percentage);
    const transactions = await TransactionModel.find({'storeId' : req.params.storeId, 'userId' : req.params.userId}).sort({ createdAt: 'desc'}).exec();;

    const result = {
      percentage : percentage,
      curTier : curTier,
      nextTier : nextTier,
      transactions: transactions,
    };
    return res.send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

module.exports = router;
