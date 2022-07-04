import Search from './pages/Search';
import Passenger from './pages/Passenger';
import AddFlight from './pages/AddFlight';
import Info from './pages/Info';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/search' element={<Search />} />
      <Route path='/passenger/:id' element={<Passenger />} />
      <Route path='/info/:id' element={<Info />} />
      <Route path='/add' element={<AddFlight />} />
      <Route path='*' element={<Search />} />
    </Routes>
  );
}

export default App;