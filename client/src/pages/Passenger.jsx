import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const api_base = 'http://127.0.0.1:3001';

function Passenger() {
    let {id} = useParams();
    let navigate = useNavigate();

    const [passengers, setPassengers] = useState([]);
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newNumber, setNewNumber] = useState("");
    
    const addPassenger = async () => {
      if(newFirstName !== "" && newLastName !== "" && newNumber !== "" && newEmail !== ""){
      const data = await fetch(api_base + "/passenger/new", {
          method: "POST",
          headers: {
              "Content-Type": "application/json" 
          },
          body: JSON.stringify({
                firstName: newFirstName,
                lastName: newLastName,
                number: newNumber,
                email: newEmail,
                idFlight: id
          })
      }).then(res => res.json());
  
      setPassengers([...passengers, data]);
      setNewFirstName("");
      setNewLastName("");
      setNewNumber("");
      setNewEmail("");
      updateFlight(id);
      navigate("/");
    }
  }

  const updateFlight = async id => {
    await fetch(api_base + '/flight/update/' + id, { method: "PUT" }).then(res => res.json());
}

    return (
    <div className='info'>
      <h2>Enter your personal data</h2>
      <form className='row g-3'>
          <div className='col-md-6'>
              <label for='firstName' className='form-label'>First Name</label>
              <input className='form-control' name='firstName' value={newFirstName} onChange={e => setNewFirstName(e.target.value)} required />
          </div>
          <div className='col-md-6'>
              <label for='lastName' className='form-label'>Last Name</label>
              <input className='form-control' name='lastName' value={newLastName} onChange={e => setNewLastName(e.target.value)} required />
          </div>
          <div className='col-md-8'>
              <label for='email' className='form-label'>Email</label>
              <input className='form-control' name='email' type='email' value={newEmail} onChange={e => setNewEmail(e.target.value)} required />
          </div>
          <div className='col-md-4'>
              <label for='number' className='form-label'>Number</label>
              <input className='form-control' name='number' type='text' placeholder='+375 29 123-45-67' value={newNumber} onChange={e => setNewNumber(e.target.value)} required />
          </div>
          <div className='col-md-12'>
            <div className='btn btn-sm btn-primary' onClick={addPassenger}>Order</div>
          </div>
      </form>
      </div>
    );
  }
  
  export default Passenger;