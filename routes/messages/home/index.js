const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {
		let collection = db.collection("registers");
		db.collection("registers", (err, collection) => {
			collection.find({
				email: req.body.email
			}, { "messages": true }, { "messages.initialMessage": true }).toArray((err, result) => {
				console.log(result);
				res.send(result)
			});
		});    
		// collection.find({ email: req.body.email }, { $regex: req.body.search }).toArray((err, result) => {
		// 	if (err) {
		// 		console.log(err);
		// 	}
		// 	console.log(result);
		// 	res.send(result);
		// 	// console.log("This is the resulttttt :", result)
		// 	// result.map((item) => {
		// 	// 	// console.log(item)
		// 	// 	item.businessDetails.forEach((itemTwo) => {
		// 	// 		if (itemTwo.category === req.body.search) {
		// 	// 			console.log(itemTwo);
		// 	// 			// res.send(itemTwo);

		// 	// 		}
		// 	// 	});
		// 	// });

		// });
	});
});

module.exports = router;