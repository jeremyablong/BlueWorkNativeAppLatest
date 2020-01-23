const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {

		const { channelURL, email } = req.body;

		console.log("This is the req.body for channelURL: ", req.body);

		let collection = db.collection("registers");

		collection.findOneAndUpdate({ email }, {$push:{ channels: { 
			channelURL
	    }}}, (err, doc) => {
		    if (err) {
		        console.log("Something wrong when updating data!");
		    }
		    if (doc) {
				res.send({ message: "User content UPDATED.", data: doc });
		    }
		});
      });
});

module.exports = router;