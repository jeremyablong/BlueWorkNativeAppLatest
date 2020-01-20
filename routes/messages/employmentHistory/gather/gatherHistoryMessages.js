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
			}, { "jobHistory": true }).toArray((err, result) => {
				console.log("This is the job history result :", result);
				res.send(result);
			});
		});    
	});
});

module.exports = router;