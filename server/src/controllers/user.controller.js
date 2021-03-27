 const StoreModel = require("../models/store.model");
const UserTierModel = require("../models/userTier.model");

function updateTier(transaction) {
    const store = await StoreModel.find(transaction['storeId']);
    const tiers = store['tiers'];
    // const user = await UserModel.find(transaction['userId']);
    const userTier = await UserTierModel.findOne({'storeId' : transaction['storeId'], 'userId' : transaction['userId']});
    const currentTier = await TierModel.find(userTier['tier']);

    userTier['totalAmount'] += transaction['amount'];    

    if(userTier['totalAmount'] > currentTier['maxValue']) {
        // Upgrade tier
        try{
            const nextTierId = tiers.findOne({'level' : currentTier.level+1 });
        }
        catch(e){
            // No tier above this exists. Do nothing
        }
    }

    await userTier.save();
}