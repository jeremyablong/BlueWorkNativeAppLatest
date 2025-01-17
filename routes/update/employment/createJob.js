const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {
		const { companyName, position, howLong, howManyYears, description } = req.body;
			console.log("This is the req.body: ", req.body);
			let collection = db.collection("registers");
			collection.findOneAndUpdate({ email: req.body.email }, {$push:{ jobHistory: {
				companyName, 
				position, 
				howLong, 
				howManyYears, 
				description
			} }}, (err, doc) => {
			    if (err) {
			        console.log("Something wrong when updating data!");
			    }
			    if (doc) {
			    	console.log(doc)
					res.send({ data: doc });
			    }
			});
      });
});

module.exports = router;