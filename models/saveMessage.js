const mongoose = require("mongoose");
const express = require("express");

const MessageSchema = new mongoose.Schema({
	email: {
		type: String
	},
	message: {
		type: String
	},
	uuid: {
		type: String
	},
	timestamp: {
		type: String
	},
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	self: {
		type: String
	}
});

module.exports = Msg = mongoose.model("responses", MessageSchema);