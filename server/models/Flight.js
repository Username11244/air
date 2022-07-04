const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FlightSchema = Schema({
	to: String,
	from: String,
	date: String,
    toTime: String,
    fromTime: String,
    price: Number,
    seats: Number
});

const Flight = mongoose.model("Flight", FlightSchema);

module.exports = Flight;