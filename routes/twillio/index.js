const mongoose = require("express");
const express = require("express");
const router = express.Router();
const mongo = require("mongodb");
const config = require("config");
const cors = require("cors"); 
const Nexmo = require('nexmo');
const rn = require('random-number');
const phone = require('phone');

const nexmo = new Nexmo({
  apiKey: 'ad56c78d',
  apiSecret: '42s4VqpO5abAcKYG',
});

var options = {
  min:  -1000
, max:  1000
, integer: true
}


router.post("/", (req, res) => {
	// console.log("This is the req.body :", req.body);

	let randomNumber = rn(options);

	// console.log("randomNumber", randomNumber);

	const from = Number("+12014293158");
	const to = phone("+1" + req.body.phoneNumber)[0]; 
	const text = `Hi, This is Blue Work! We need to verify your account. Please enter the following number when prompted...${randomNumber}`;

	// console.log("to", to);

	nexmo.message.sendSms(from, to, text, (err, responseData) => {
	    if (err) {
	        console.log(err);
	    } else {
	        if(responseData.messages[0]['status'] === "0") {
	            console.log("Message sent successfully.");
	            res.send({ message: "Text message as been sent!", code: randomNumber })
	        } else {
	            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
	        }
	    }
	})
});

module.exports = router;