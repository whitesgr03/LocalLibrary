require("dotenv").config();
const log = require("debug")("localLibrary:mongoose");
const mongoose = require("mongoose");

try {
	log("Start connecting");
	mongoose.connect(process.env.MONGODB_URI);
	log("Connecting successfully");
} catch (err) {
	log("Should be connected?");
	console.error(err);
}

module.exports = mongoose;
