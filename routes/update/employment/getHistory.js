const mongoose = require("express");
const express = require("express");
const router = express.Router();
const mongo = require("mongodb");
const config = require("config");
const cors = require("cors"); 
const saltRounds = 10;



mongo.connect(config.get("mongoURI"), { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {
		if (err) {
			console.log(`This is the error : ${err}`);
		}
		db.collection("registers", (err, collection) => {
			collection.find({
				email: req.body.email
			}).toArray((err, result) => {
			    if (err) {
			    	throw err;
			    }
			    console.log("This is the result of the API call :", result);
			    res.send(result);
		    });
		});
			
      });
});

module.exports = router;