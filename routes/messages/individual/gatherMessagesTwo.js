const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {
		const { uuid } = req.body;
		let collection = db.collection("registers");
		collection.find({ email: { $regex: req.body.email } }).toArray((err, result) => {
			if (err) {
				console.log(err);
			}
			console.log(result)
			res.send(result);
			// console.log("This is the resulttttt :", result)
			// result.map((item) => {
			// 	// console.log(item)
			// 	item.businessDetails.forEach((itemTwo) => {
			// 		if (itemTwo.category === req.body.search) {
			// 			console.log(itemTwo);
			// 			// res.send(itemTwo);

			// 		}
			// 	});
			// });

		});     
	});
});

module.exports = router;