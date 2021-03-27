const express = require("express");
const StoreModel = require("../models/store.model");
const TierModel = require("../models/tier.model");
// const ModelLog = require("../models/log");

const router = express.Router();

router.get("/allStores", async (req, res) => {
  try {
    const stores = await StoreModel.find({});
    res.send(stores);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/store/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const store = await StoreModel.findById(id);
    if (!store) {
      return res.status(404).send();
    }
    res.send(store);
  } catch (e) {
    res.status(500).send();
  }
});

router.put("/update/store", async (req, res) => {
  const updates = Object.keys(req.body);

  try {
    const store = await StoreModel.findById(req.body.id);
    if (!store) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      store[update] = req.body[update];
    });
    await store.save();

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

async function createTiers(tiers) {
  const promises = tiers.map(async (tier) => {
    const newTier = new TierModel(tier);
    await newTier.save();

    return newTier;
  });
  return Promise.all(promises);
}

router.post("/create", async (req, res) => {
  try {
    const tiers = req.body.storeTiers;
    const storeTiers = await createTiers(tiers);

    const store = new StoreModel({ tiers: storeTiers, ...req.body });

    const newStore = await store.save();

    // const logAdd = new ModelLog({
    //   type: "Create",
    //   time: new Date(),
    //   itemid: store._id,
    //   itemtitle: store.title,
    // });

    // await logAdd.save();

    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.delete("/delete/store", async (req, res) => {
  const id = req.body.id;
  try {
    const store = await StoreModel.findByIdAndDelete(id);
    if (!store) {
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
