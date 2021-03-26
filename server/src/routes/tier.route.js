const express = require("express");
const TierModel = require("../models/tier.model");
const ModelLog = require("../models/log");

const router = express.Router();

router.get("/allTiers", async (req, res) => {
  try {
    const tiers = await TierModel.find({});
    res.send(tiers);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/tier/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const tier = await TierModel.findById(id);
    if (!tier) {
      return res.status(404).send();
    }
    res.send(tier);
  } catch (e) {
    res.status(500).send();
  }
});

router.put("/update/tier", async (req, res) => {
  const updates = Object.keys(req.body);

  try {
    const tier = await TierModel.findById(req.body.id);
    if (!tier) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      tier[update] = req.body[update];
    });
    await tier.save();

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

router.post("/add/item", async (req, res) => {
  const tier = new ModelTier(req.body);
  try {
    await tier.save();

    // const logAdd = new ModelLog({
    //   type: "Create",
    //   time: new Date(),
    //   itemid: tier._id,
    //   itemtitle: tier.title,
    // });

    // await logAdd.save();

    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/delete/tier", async (req, res) => {
  const id = req.body.id;
  try {
    const tier = await TierModel.findByIdAndDelete(id);
    if (!tier) {
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
