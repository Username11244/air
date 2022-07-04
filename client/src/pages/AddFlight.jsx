import { useEffect, useState } from 'react';
const api_base = 'http://127.0.0.1:3001';

function InfoPage() {
    const [flights, setFlights] = useState([]);
    const [newTo, setNewTo] = useState("");
    const [newFrom, setNewFrom] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newToTime, setNewToTime] = useState("");
    const [newFromTime, setNewFromTime] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newSeats, setNewSeats] = useState("");
  
    useEffect(() => {
      GetFlights();
    }, []);
  
    const GetFlights = () => {
      fetch(api_base + '/flights')
        .then(res => res.json())
        .then(data => setFlights(data))
        .catch((err) => console.error("Error: ", err));
    }
  
    const addFlight = async () => {
          const data = await fetch(api_base + "/flight/new", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json" 
              },
              body: JSON.stringify({
                    to: newTo,
                    from: newFrom,
                    date: newDate,
                    toTime: newToTime,
                    fromTime: newFromTime,
                    price: newPrice,
                    seats: newSeats
              })
          }).then(res => res.json());
  
          setFlights([...flights, data]);
          setNewTo("");
          setNewFrom("");
          setNewDate("");
          setNewToTime("");
          setNewFromTime("");
          setNewPrice("");
          setNewSeats("");
      }

      const deleteFlight = async id => {
		const data = await fetch(api_base + '/flight/delete/' + id, { method: "DELETE" }).then(res => res.json());

		setFlights(flights => flights.filter(flight => flight._id !== data.result._id));
	}
  
    return (
      <div className="App">
        <div class="wraper">
          <h2>Flights</h2>
          <form name="userForm">
              <div class="form-group">
                  <label for="from">From:</label>
                  <input class="form-control" name="from" value={newFrom} onChange={e => setNewFrom(e.target.value)} required />
              </div>
              <div class="form-group">
                  <label for="to">To:</label>
                  <input class="form-control" name="to" value={newTo} onChange={e => setNewTo(e.target.value)} required />
              </div>
              <div class="form-group">
                  <label for="date">Date:</label>
                  <input class="form-control" name="date" type="date" value={newDate} onChange={e => setNewDate(e.target.value)} required />
              </div>
              <div class="form-group">
                  <label for="to">FromTime:</label>
                  <input class="form-control" name="fromTime" value={newFromTime} type="time" onChange={e => setNewFromTime(e.target.value)} required />
              </div>
              <div class="form-group">
                  <label for="to">ToTime:</label>
                  <input class="form-control" name="toTime" value={newToTime} type="time" onChange={e => setNewToTime(e.target.value)} required />
              </div>
              <div class="form-group">
                  <label for="to">Price:</label>
                  <input class="form-control" name="price" value={newPrice}  type="number" onChange={e => setNewPrice(e.target.value)} required />
              </div>
              <div class="form-group">
                  <label for="to">Seats:</label>
                  <input class="form-control" name="seats" value={newSeats}  type="number" onChange={e => setNewSeats(e.target.value)} required />
              </div>
              <div class="panel-body">
                  <button type="submit" class="btn btn-sm btn-primary" onClick={addFlight}>Add</button>
              </div>
          </form>
      </div>
      <table class="table table-condensed table-striped table-bordered">
          <thead><tr><th>To</th><th>From</th><th>Date</th><th>fromTime</th><th>toTime</th><th>Price</th><th>Seats</th><th></th></tr>
            {flights.map(flight => (
              <tr><th>{flight.to}</th><th>{flight.from}</th><th>{flight.date}</th><th>{flight.fromTime}</th><th>{flight.toTime}</th><th>{flight.price}</th><th>{flight.seats}</th><th><button onClick={() => deleteFlight(flight._id)}>Delete</button></th></tr>
            ))}
          </thead>
          <tbody>
          </tbody>
      </table>
      </div>
    );
  }
  
  export default InfoPage;