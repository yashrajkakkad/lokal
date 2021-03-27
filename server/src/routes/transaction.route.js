const express = require("express");
const TransactionModel = require("../models/transaction.model");
const UserTierModel = require("../models/userTier.model");
const ModelLog = require("../models/log");

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

router.post("/add/transaction", async (req, res) => {
  const transaction = new ModelTransaction(req.body);
  const userTier = await UserTierModel.findOne({storeId : req.body.storeId, userId : req.body.userId});
  
  try {
    await transaction.save();
    userTier["totalAmount"] += transaction["amount"];
    await userTier.save();
    // const totalAmount = await TotalAmountModel.findOneAndUpdate({storeId: req.body.storeId, userId: req.body.userId}, );

    // const logAdd = new ModelLog({
    //   type: "Create",
    //   time: new Date(),
    //   itemid: transaction._id,
    //   itemtitle: transaction.title,
    // });

    // await logAdd.save();

    res.status(200).send();
  } catch (e) {
    res.status(500).send();
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
