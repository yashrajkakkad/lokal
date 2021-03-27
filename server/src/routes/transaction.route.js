const express = require("express");
const { updateTier } = require("../controllers/user.controller");
const TransactionModel = require("../models/transaction.model");
const UserTierModel = require("../models/userTier.model");
const UserModel = require("../models/user.model");
// const ModelLog = require("../models/log");

const router = express.Router();

router.get("/allTransactions", async (req, res) => {
  try {
    const transactions = await TransactionModel.find({});
    res.send(transactions);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/transaction/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const transaction = await TransactionModel.findById(id);
    if (!transaction) {
      return res.status(404).send();
    }
    res.send(transaction);
  } catch (e) {
    res.status(500).send();
  }
});

router.put("/update/transaction", async (req, res) => {
  const updates = Object.keys(req.body);

  try {
    const transaction = await TransactionModel.findById(req.body.id);
    if (!transaction) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      transaction[update] = req.body[update];
    });
    await transaction.save();

    // const logUpdate = new ModelLog({
    //   type: "Update",
    //   time: new Date(),
    //   itemid: req.body._id,
    //   itemtitle: req.body.title,
    // });

    // await logUpdate.save();

    res.send();
  } catch (e) {
    res.status(500).end();
  }
});

router.post("/create", async (req, res) => {
  // 1. check the type of the transaction
  // 2. if credit, fetch userDoc from userId
  //  2.1 if credit is more then amount to be paid, deduct from credit
  // 3. complete the transaction

  try {
    const { type, amount } = req.body;
    const transaction = new TransactionModel(req.body);

    switch (type) {
      case "credit": {
        const user = await UserModel.findById(req.body.userId);
        const { credit } = user;
        if (credit > amount) {
          user.credit = user.credit - amount;
          await user.save();
        } else {
          res.status(401).send({
            error:
              "User does not have enough credit to compelete the transaction",
          });
        }
      }
      case "cash":
      case "card": {
        await transaction.save();

        await updateTier(transaction);
        res.status(200).send();
        break;
      }
      default: {
        res.status(400).send({
          error: "Please select a valid transaction type",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.delete("/delete/transaction", async (req, res) => {
  const id = req.body.id;
  try {
    const transaction = await TransactionModel.findByIdAndDelete(id);
    if (!transaction) {
      return res.status(404).send();
    }

    // const logDelete = new ModelLog({
    //   type: "Delete",
    //   time: new Date(),
    //   itemid: id,
    // });

    // await logDelete.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
