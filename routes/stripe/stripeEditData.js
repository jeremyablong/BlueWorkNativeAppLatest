const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {
		const { businessName, category, hourly, workerCount, jobDescription, email, phoneNumber, city, zipCode, streetAddress } = req.body;
			console.log("This is the req.body: ", req.body);
			let collection = db.collection("registers");
			collection.findOneAndUpdate({ email: req.body.email }, {$push:{ businessDetails: { 
				businessName: businessName.toLowerCase(), 
				category: category.toLowerCase(), 
				hourly, 
				email,
				phoneNumber,
				workerCount,
				jobDescription: jobDescription.toLowerCase(),
				city,
				zipCode,
				streetAddress
		    }}}, (err, doc) => {
			    if (err) {
			        console.log("Something wrong when updating data!");
			    }
			    if (doc) {
					res.send({ message: "User Found", data: doc });
			    }
			});
      });
});

module.exports = router;