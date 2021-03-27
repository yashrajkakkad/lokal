const StoreModel = require("../models/store.model");
const UserTierModel = require("../models/userTier.model");
const TierModel = require("../models/tier.model");

exports.updateTier = async function (transaction) {
  const currentStore = await StoreModel.findById(transaction["storeId"]);
  console.log(" -- current store --");
  console.log(currentStore);
  const tiers = currentStore["tiers"];

  const userTier = await UserTierModel.findOne({
    storeId: transaction["storeId"],
    userId: transaction["userId"],
  });
  console.log(" -- userTier --");
  console.log(userTier);

  const currentUserTier = tiers.find((tier) => tier.level === userTier.level);

  console.log(" --- current user tier id ----");
  console.log(currentUserTier);

  const currentTier = await TierModel.findById(currentUserTier._id);

  userTier["totalAmount"] += transaction["amount"];

  if (userTier["totalAmount"] > currentTier["maxValue"]) {
    // Upgrade tier
    try {
      newTierId = tiers[currentTier.level + 1].id;

      userTier.level = userTier.level + 1;
    } catch (e) {
      console.log(" OP: already at max level");
      // No tier above this exists. Do nothing
    }
  }

  await userTier.save();
};
