const mongoose = require("mongoose");
const express = require("express");

const SignupSchema = new mongoose.Schema({
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String
	},
	accountType: {
		type: String
	},
	userId: {
		type: String
	}
	// state: {
	// 	type: String
	// },
	// addressZip: {
	// 	type: Number
	// },
	// addressCity: {
	// 	type: String
	// },
	// addressStreet: {
	// 	type: String
	// },
	// country: {
	// 	type: String
	// },
	// checkbox: {
	// 	type: Boolean
	// },
	// phoneNumber: {
	// 	type: Number
	// }
});

module.exports = Signup = mongoose.model("register", SignupSchema);