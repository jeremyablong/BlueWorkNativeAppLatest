const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {

		const { uuid, email } = req.body;

		let collection = db.collection("registers");

		collection.find({ email: email }, { "messages": true }).toArray((err, result) => {
			if (err) {
				console.log(err);
			}
			console.log(result)
			res.send(result);
		});     
	});
});

module.exports = router;