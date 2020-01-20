const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.put("/", (req, res) => {
		const { addressCity, addressState, addressZipCode, addressStreet, age, gender, occupation, hobbies } = req.body;
			console.log("This is the req.body: ", req.body);
			let collection = db.collection("registers");
			collection.findOneAndUpdate({ email: req.body.email }, {$set:{ password: req.body.password }}, (err, doc) => {
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