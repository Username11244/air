import React, { useState, useEffect } from 'react';
import Order from './Order';

function Search() {
  const [Active, setActive] = useState(false);

  const [newTo, setNewTo] = useState("");
  const [newFrom, setNewFrom] = useState("");
  const [newDate, setNewDate] = useState("");

  return (
    <div className='app'>
      <div className='seach'>
        <h2>Search Airlanes</h2>
        <form className='form'>
            <div className='form-group'>
                <label for="from">From:</label>
                <input className='form-input' name="from" value={newFrom} onChange={e => setNewFrom(e.target.value)} required />
            </div>
            <div className='form-group'>
                <label for="to">To:</label>
                <input className='form-input' name="to" value={newTo} onChange={e => setNewTo(e.target.value)} required />
            </div>
            <div className='form-group'>
                <label for="date">Date:</label>
                <input className='form-input' name="date" type="date" value={newDate} onChange={e => setNewDate(e.target.value)} required />
            </div>
            <div className="panel-body">
              <div className='btn btn-warning' onClick={() => setActive(true)}>Search</div>
            </div>
        </form>
      </div>
    {Active ? (
      <Order to={newTo} from={newFrom} date={newDate} />
    ) : ''}
    </div>
  );
}

export default Search;