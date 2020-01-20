const mongoose = require("express");
const express = require("express");
const router = express.Router();
const mongo = require("mongodb");
const config = require("config");
const cors = require("cors"); 
const SignupUser = require("../../models/register/newUser.js");
const saltRounds = 10;


mongo.connect(config.get("mongoURI"), { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.get("/", (req, res) => {
		if (err) {
			console.log(`This is the error : ${err}`);
		}
		console.log(req.body);
		db.collection("registers", (err, collection) => {
			collection.find({  }).toArray(function(err, result) {
			    if (err) {
			    	throw err;
			    }
			    console.log(result);
			    res.send(result);
		    });
		});
			
      });
});
// (
//   {"wantList.province.name": "Ha Noi"}, 
//   {"wantList": {"$elemMatch": {"province.name": "Ha Noi"}}}
// )
module.exports = router;