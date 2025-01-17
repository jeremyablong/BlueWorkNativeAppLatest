const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {
		db.collection("registers", (err, collection) => {
			collection.findOne({
				email: req.body.email
			}).then((user) => {
				if (user) {
					if (user.email === req.body.email && 
						user.password === req.body.password) {
						console.log("User exists!");
						console.log(user)
						res.json({ message: "User exists!", data: user });
					} else {
						console.log("User does NOT exist.");
						res.json({ message: "User does NOT exist." });
					}
				} 
				res.json({ message: "User does NOT exist." });
			}).catch((err) => {
				console.log(err);
			}); 
		});
	});
});

module.exports = router;