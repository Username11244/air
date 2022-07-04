import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const api_base = 'http://127.0.0.1:3001';

function Order(props) {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    GetFlights();
  }, []);

  const GetFlights = () => {
    fetch(api_base + '/flights')
      .then(res => res.json())
      .then(data => setFlights(data))
      .catch((err) => console.error("Error: ", err));
  }

  return (
      <div className='flights'>
      <h2>Flights</h2>
        {flights.map((flight) => {
          if(flight.from == props.from && flight.to == props.to && flight.date == props.date){
          return (
            <div className='flight'>
              <div className='l-side'>
                <div className='price'>{flight.price} $</div>
                { flight.seats ? <Link to={`/passenger/${flight._id}`} ><div className='btn btn-sm btn-primary'>Order</div></Link> : '' }
              </div>
              <div className='r-side'>
                <div className='l-info'>
                  <div className='from-time'>{flight.fromTime}</div>
                  <div className='from'>{flight.from}</div>
                </div>
                <div className='r-info'>
                  <div className='to-time'>{flight.toTime}</div>
                  <div className='to'>{flight.to}</div>
                </div>
                <div className='seats'>Count Seats: {flight.seats}</div>
                <Link className='link' to={`/info/${flight._id}`}>Flight Info</Link>
              </div>
            </div>
          );
        }
        })}
      </div>
  );
}

export default Order;