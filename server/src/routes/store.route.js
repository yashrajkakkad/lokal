const express = require("express");
const StoreModel = require("../models/store.model");
const TierModel = require("../models/tier.model");
const UserTierModel = require("../models/userTier.model");
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

router.post("/join", async (req, res) => {
  try {
    const userTier = new UserTierModel(req.body);
    await userTier.save();

    // const logAdd = new ModelLog({
    //   type: "Create",
    //   time: new Date(),
    //   itemid: tier._id,
    //   itemtitle: tier.title,
    // });

    // await logAdd.save();

    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
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
    let tiers = [
      {
        name: "Public",
        description: `You get public access to the ${req.body.name} store`,
        level: 0,
        minValue: 0,
        maxValue: 0,
      },
    ];
    console.log(" -- intial tier --");
    console.log(tiers);
    // tiers.push();
    req.body.storeTiers.map((storeTier) => {
      tiers.push(storeTier);
    });
    console.log(" -- intial but updated tier --");
    console.log(tiers);
    const storeTiers = await createTiers(tiers);
    console.log(" -- created tiers --");
    console.log(storeTiers);

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
