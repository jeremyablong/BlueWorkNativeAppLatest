const mongoose = require("express");
const express = require("express");
const router = express.Router();
const mongo = require("mongodb");
const config = require("config");
const cors = require("cors"); 
const SignupUser = require("../../models/register/newUser.js");
const saltRounds = 10;


mongo.connect(config.get("mongoURI"), { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", (req, res) => {
		if (err) {
			console.log(`This is the error : ${err}`);
		}
		console.log(`This is the req.body : ${req.body}`);
		const { firstName, lastName, email, password, userId, accountType } = req.body;
		const newUser = new SignupUser({
			firstName,
			lastName,
			email: email.toLowerCase(),
			password,
			accountType,
			userId
		});

		newUser.save((err, data) => {
			if (err) {
				console.log("This is the error when saving user :", err);
			} else {
				console.log("This is the correct saved data :", data);
			}
		})	
      });
});

module.exports = router;