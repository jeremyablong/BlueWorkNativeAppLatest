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

			console.log("This is the req.body: ", req.body);

			const { message, timestamp, firstName, uuid, lastName, self, email, jobHistory, category, hourly, workerCount, description, phoneNumber, streetAddress, city, zipCode } = req.body;

			let collection = db.collection("registers");
						
			collection.findOneAndUpdate({ email: req.body.self }, {$push:{ messages: { 
				uuid,
				message,
				timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
				firstName,
				lastName,
				email,
				initialMessage: true,
				self: req.body.self,
				jobHistory,
				category, 
				hourly,
				workerCount,
				description,
				phoneNumber,
				streetAddress,
				city,
				zipCode
		    }}}, (err, doc) => {
			    if (err) {
			        console.log("Something wrong when updating data!");
			    }
			    if (doc) {
					res.send({ message: "Updated Document - sendInitital/index.js", data: doc });
			    }
			});
      });
});

module.exports = router;