import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import VaccinationDrive from './components/VaccinationDrive/VaccinationDrive';
import Vaccine from './pages/vaccination';

function App() {
  return (
    <div className="App">
      <Router>
          <Navbar />
          <div className='container mt-5'>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/vaccination' element={<Vaccine />} />
            <Route path='/vaccinationDrive' element={<VaccinationDrive />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
export default App;