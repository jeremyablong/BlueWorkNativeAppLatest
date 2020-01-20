const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");


router.post("/", (req, res) => {
	console.log("This is sendgrid's req.body :", req.body)
	const { firstName, lastName, email, addressCity, addressState, addressZipCode, gender, age, hobbies, occupation } = req.body;


		// using Twilio SendGrid's v3 Node.js Library
		// https://github.com/sendgrid/sendgrid-nodejs
	const sgMail = require('@sendgrid/mail');
	sgMail.setApiKey(config.get("sendgrid"));

		if (req.body.jobHistory) {
			let jobData = req.body.jobHistory.map((item) => {
				return `
					<ul>
						<li>Company Name: ${item.companyName}</li>
						<li>How many years at this position: ${item.howManyYears}</li>
						<li>What year did this worker leave this job? ${item.howLong}</li>
						<li>Description of job duties: ${item.description}</li>
					</ul>
				`
			});
			const msg = {
			  to: req.body.email,
			  from: 'BlueWork@bluework.com',
			  subject: "I'm responding to your job that was posted on the BlueWork app",
			  text: 'We have a worker for you!',
			  html: `<h1 class="text-center">Welcome, ${firstName} ${lastName} wants to work for you!</h1><ul>
				<li>Address City: ${addressCity}</li>
				<li>Address State: ${addressState}</li>
				<li>Address Zip Code: ${addressZipCode}</li>
				<li>Gender: ${gender}</li>
				<li>Age: ${age}</li>
				<li>Hobbies: ${hobbies}</li>
				<li>Occupation: ${occupation}</li>
				<h1 class="text-center">Job History</h1>
				<p>Thanks for choosing BlueWork!</p>
				${jobData}
			  </ul>`
			  
			};

			sgMail.send(msg);
		} else {
			const msg = {
			  to: req.body.email,
			  from: 'BlueWork@bluework.com',
			  subject: "I'm responding to your job that was posted on the BlueWork app",
			  text: 'We have a worker for you!',
			  html: `<h1 class="text-center">Welcome, ${firstName} ${lastName} wants to work for you!</h1><ul>
				<li>Address City: ${addressCity}</li>
				<li>Address State: ${addressState}</li>
				<li>Address Zip Code: ${addressZipCode}</li>
				<li>Gender: ${gender}</li>
				<li>Age: ${age}</li>
				<li>Hobbies: ${hobbies}</li>
				<li>Occupation: ${occupation}</li>
				<h1 class="text-center">Job History</h1>
				<p>Thanks for choosing BlueWork!</p>
				
			  </ul>`
			  
			};
			sgMail.send(msg);
		}
		// 
		
	// const msg = {
	//   to: req.body.email,
	//   from: 'BlueWork@bluework.com',
	//   subject: "I'm responding to your job that was posted on the BlueWork app",
	//   text: 'We have a worker for you!',
	//   html: `<h1 class="text-center">Welcome, ${firstName} ${lastName} wants to work for you!</h1><ul>
	// 	<li>Address City: ${addressCity}</li>
	// 	<li>Address State: ${addressState}</li>
	// 	<li>Address Zip Code: ${addressZipCode}</li>
	// 	<li>Gender: ${gender}</li>
	// 	<li>Age: ${age}</li>
	// 	<li>Hobbies: ${hobbies}</li>
	// 	<li>Occupation: ${occupation}</li>
	// 	<h1 class="text-center">Job History</h1>
	// 	<p>Thanks for choosing BlueWork!</p>
	//   </ul>`
	  
	// };
});

module.exports = router;











//