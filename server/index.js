const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/usersdb", { 
	useUnifiedTopology: true,
	useNewUrlParser: true
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

const Flight = require('./models/Flight');

app.get('/flights', async (req, res) => {
	const flights = await Flight.find();
	res.json(flights);
});

app.post('/flight/new', (req, res) => {
	const flight = new Flight({
		to: req.body.to,
		from: req.body.from,
		date: req.body.date,
		toTime: req.body.toTime,
		fromTime: req.body.fromTime,
		price: req.body.price,
		seats: req.body.seats
	})

	flight.save();

	res.json(flight);
});

app.delete('/flight/delete/:id', async (req, res) => {
	const result = await Flight.findByIdAndDelete(req.params.id);

	res.json({result});
});

app.put('/flight/update/:id', async (req, res) => {
    const id = req.params.id; 
	let doc = await Flight.findOne({_id: id});
    let newSeats = doc.seats;
	newSeats--;
     
    const result = await Flight.findOneAndUpdate({_id: id}, {seats: newSeats}, {new: true});
	res.json({result});
});

const Passenger = require('./models/Passenger');

app.get('/passenger/:id', async (req, res) => {
	const passenger = await Passenger.find({idFlight: req.params.id});

	res.json(passenger);
});

app.post('/passenger/new', (req, res) => {
	const passenger = new Passenger({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		number: req.body.number,
		email: req.body.email,
		idFlight: req.body.idFlight
	})

	passenger.save();

	res.json(passenger);
});

app.listen(3001);