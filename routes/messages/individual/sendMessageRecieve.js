const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const uuidv1 = require('uuid/v1');
const moment = require('moment');

mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {

		let gatherPassedDownData = req.app.get("uuid-data");

		console.log("gatherPassedDownData :", gatherPassedDownData);

			console.log("This is the req.body of sendMessageRecieve.js: ", req.body);

			const { message, timestamp, firstName, lastName, uuid, email, self } = req.body;

			let collection = db.collection("registers");
			collection.findOneAndUpdate({ email: req.body.email }, {$push:{ messages: { 
				uuid,
				message,
				timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
				firstName,
				lastName,
				email,
				initialMessage: false,
				relatedTo: uuid,
				self: req.body.email
		    }}}, (err, doc) => {
			    if (err) {
			        console.log("Something wrong when updating data!");
			    }
			    if (doc) {
					res.send({ message: "Updated Document - sendInitital/index.js", data: doc });
			    }
			});
			// collection.updateOne({ "messages.uuid" : uuid, "messages.responses": { "$exists": true } }, { "$push": { "messages.$.responses": { 
			// 	uuid,
			// 	message,
			// 	timestamp,
			// 	firstName,
			// 	lastName,
			// 	email
			//  }}}), ((err, result) => {
		 //    	if (err) {
		 //    		console.log("This is sendMessageRecieved Error msg :", err)
		 //    	}
		 //    	console.log("This is the result from sendMessageRecieved.js :", result);
		 //    	res.send({ message: "Updated Document - sendInitital/index.js", data: result });
		 //    });		
      });
});

module.exports = router;