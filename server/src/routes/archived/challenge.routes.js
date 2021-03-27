// const express = require("express");
// const formidable = require("formidable");
// const ModelChallenge = require("../models/challenge.model");
// const ModelUserChallenge = require("../models/userChallenge.model");
// const ModelUser = require("../models/user.model");
// const ModelMedia = require("../models/media.model");

// const router = express.Router();

// router.post("/createChallenge", async (req, res) => {
//     req.body.createdBy = req.userId;
//     const challenge = new ModelChallenge(req.body);
//     try {
//         await challenge.save();
//         // TODO: log challenge here

//         // creates new challenge for itself
//         const selfChallenge = new ModelUserChallenge({
//             challengeId: challenge._id,
//             memberId: req.userId,
//         });
//         await selfChallenge.save();

//         // next lines are trial for media storage
//         // const form = formidable();
//         // form.parse(req, (err, fields, files) => {
//         //     if (err) {
//         //         next(err);
//         //         return;
//         //     }
//         //     console.log(files);
//         //     res.json({ fields, files });
//         // });
//         // const media = new ModelMedia({
//         //     challengeId: challenge._id,
//         //     userId: req.userId,
//         // });
//         // await media.save();

//         // creates new challenges for each of its members
//         const members = req.body.members;
//         for (var i = 0; i < members.length; i++) {
//             const id = members[i];
//             try {
//                 const user = await ModelUser.find({ username: id });
//                 if (user === null || user === undefined || user.length === 0) {
//                     throw new Error("No member with username: " + id);
//                 }
//                 const _memberId = user[0]._id;
//                 const userChallenge = new ModelUserChallenge({
//                     challengeId: challenge._id,
//                     memberId: _memberId,
//                 });
//                 await userChallenge.save();
//             } catch (e) {
//                 console.log(e);
//                 throw new Error("No member with username: " + id);
//             }
//         }
//         res.status(200).send("Succesfully Created a new Challenge! Enjoy!");
//     } catch (e) {
//         console.log(e);
//         res.status(500).send();
//     }
// });

// router.get("/getAllChallengesForUser", async (req, res) => {
//     try {
//         const userChallenges = await ModelUserChallenge.find({
//             memberId: req.userId,
//         });
//         res.status(200).send(userChallenges);
//     } catch (e) {
//         console.log(e);
//         res.status(500).send();
//     }
// });

// router.put("/completeMyChallenge", async (req, res) => {
//     try {
//         const userChallenge = await ModelUserChallenge.findOne({
//             memberId: req.userId,
//             challengeId: req.body.challengeId,
//         });
//         userChallenge.completed = true;
//         await userChallenge.save();
//         res.status(200).send("Succesfully Completed the Challenge! Hooray!");
//     } catch (e) {
//         console.log(e);
//         res.status(500).send();
//     }
// });

// router.put("/updateDetailsOfChallenge", async (req, res) => {
//     const updates = Object.keys(req.body);
//     try {
//         const userChallenge = await ModelChallenge.findOne({
//             createdBy: req.userId,
//             _id: req.body.challengeId,
//         });
//         if (!userChallenge) {
//             return res.status(404).send("No such User Challenge Exists!");
//         }
//         updates.forEach((update) => {
//             userChallenge[update] = req.body[update];
//         });
//         console.log(userChallenge);
//         await userChallenge.save();
//         res.status(200).send("Updated Challenge Details! Enjoy!");
//     } catch (e) {
//         console.log(e);
//         res.status(500).send();
//     }
// });

// module.exports = router;
