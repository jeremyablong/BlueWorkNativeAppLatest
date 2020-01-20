const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
const config = require("config");
const mongo = require("mongodb");
const client = new StreamChat("qk4nn7rpcn75");


mongo.connect(config.get("mongoURI"),  { useNewUrlParser: true }, { useUnifiedTopology: true }, cors(), (err, db) => {
	router.post("/", async (req, res) => {
		await client.setUser({
		  id: "jon-snow",
		  name: "Jon Snow",
		  image: "https://bit.ly/2u9Vc0r",
		}, token); // token generated server side\

		return client;
	});
});

module.exports = router;