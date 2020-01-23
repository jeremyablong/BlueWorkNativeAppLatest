const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoDB = require("./config/db.js");
const cors = require("cors");
const path = require("path");
const uuidv1 = require('uuid/v1');
const config = require("config");
const serverless = require('serverless-http');


mongoDB();


app.use(bodyParser.urlencoded({ 
	extended: false
}));
app.use(bodyParser.json());

app.set("uuid-data", uuidv1());


app.use("/register", require("./routes/register/index.js"));
app.use("/login", require("./routes/register/login/index.js"));
app.use("/profile/gather", require("./routes/gatherUserInfo/gatherDataAboutMe.js"));
app.use("/profile/account/update", require("./routes/update/updateProfile.js"));
app.use("/update/password", require("./routes/update/updatePassword.js"));
app.use("/employment/add", require("./routes/update/employment/createJob.js"));
app.use("/employment/gather/history", require("./routes/update/employment/getHistory.js"));
app.use("/stripe/signup", require("./routes/stripe/index.js"));
app.use("/stripe/signup/business", require("./routes/stripe/stripeEditData.js"));
app.use("/jobs/home", require("./routes/jobs/get-jobs/index.js"));
app.use("/sendgrid/send", require("./routes/sendgrid/index.js"));
app.use("/getUserInfo", require("./routes/sendgrid/gatherUserData/index.js"));
app.use("/gather/jobs/map", require("./routes/jobs/get-jobs/getJobsForMap.js"));
app.use("/gather/jobs/map/zipCode", require("./routes/jobs/get-jobs/getZipJobsForMap.js"));
app.use("/map/findAll", require("./routes/maps/findAllJobs/findAll.js"));
app.use("/send/initial/message", require("./routes/messages/sendInitial/index.js"));
app.use("/get/all/messages", require("./routes/messages/home/index.js"));
app.use("/individual/message", require("./routes/messages/individual/index.js"));
app.use("/individual/message/reply", require("./routes/messages/individual/sendMessage.js"));
app.use("/gather/message/thread", require("./routes/messages/gatherMessagesIndividual.js"));
app.use("/post/messages/responses", require("./routes/messages/responses/index.js"));
app.use("/send/backlash/message", require("./routes/messages/sendInitial/sendToLoggedUser.js"));
app.use("/gather/uuid/receiving", require("./routes/messages/individual/sendMessageRecieve.js"));
app.use("/gather/convo/false", require("./routes/getConvo.js"));
app.use("/gather/jobHistory/messages", require("./routes/messages/employmentHistory/gather/gatherHistoryMessages.js"));
app.use("/gather/jobHistory/jobHistory", require("./routes/messages/employmentHistory/getJobHistory.js"));
app.use("/paypal/makePayment", require("./routes/paypal/createPayment.js"));
app.use("/twillio", require("./routes/twillio/index.js"));
app.use("/register/channelURL", require("./routes/sendbird/registerGroupChat.js"));
app.use("/gather/channels", require("./routes/sendbird/gatherMatchingChannels.js"));
// app.use("/initialize/stream/user", require("./routes/getStream/index.js"));

// app.get("/home", (req, res) => {
//   res.json({ message: "hello" })
// })

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});


// if (process.env.NODE_ENV === "production") {
// 	// Express will serve up production files
// 	app.use(express.static("client/build"));
// 	// serve up index.html file if it doenst recognize the route
// 	app.get('*', cors(), function(_, res) {
// 	  res.sendFile(__dirname, './client/build/index.html'), function(err) {
// 	    if (err) {
// 	      res.status(500).send(err)
// 	    }
// 	  } 
// 	})
// 	app.get('/*', cors(), function(_, res) {
// 	  res.sendFile(path.join(__dirname, './client/build/index.html'), function(err) {
// 	    if (err) {
// 	      res.status(500).send(err)
// 	    }
// 	  })
// 	})
// }; 

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  const { address, port } = server.address();
	console.log(`Server listening on address: ${address}:${port}!`);
});


// module.exports = serverless(app);