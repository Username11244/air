const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PassengerSchema = Schema({
	firstName: String,
    lastName: String,
    number: String,
    email: String,
    idFlight: String
});

const Passenger = mongoose.model("Passenger", PassengerSchema);

module.exports = Passenger;