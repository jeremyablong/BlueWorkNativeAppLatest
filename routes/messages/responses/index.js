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
		// { "$push": { "messages.$.response": doc } } 

	    collection.find({ uuid }, (err, item) => {
	            if (err) {
	            	console.log("There was an error")
	            	console.log(err);
	            };
	            res.send(item);
	            console.log("THIS IS MY ITEM IM LOOKING FOR :", item);
	         
	        }
	    );
	});
});

module.exports = router;

// "messages.$.responses"