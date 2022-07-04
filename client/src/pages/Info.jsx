import { useState } from 'react';
import { useParams } from 'react-router-dom';
const api_base = 'http://127.0.0.1:3001';

function InfoPage() {
    const [passengers, setPassengers] = useState([]);
    let {id} = useParams();

    const GetPassengers = id => {
      fetch(api_base + '/passenger/' + id, { method: "GET" })
        .then(res => res.json())
        .then(data => setPassengers(data))
        .catch((err) => console.error("Error: ", err));
    }
  
    GetPassengers(id);

    return (
      <div className="info">
          <h2>Flight Info</h2>
      <table className="table table-condensed table-striped table-bordered">
          <thead><tr><th>First Name</th><th>Last Name</th><th>Email</th><th>Number</th></tr>
            {passengers.map(passenger => (
              <tr><th>{passenger.firstName}</th><th>{passenger.lastName}</th><th>{passenger.email}</th><th>{passenger.number}</th></tr>
            ))}
          </thead>
          <tbody>
          </tbody>
      </table>
      </div>
    );
  }
  
  export default InfoPage;