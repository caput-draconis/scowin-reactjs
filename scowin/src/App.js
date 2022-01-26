import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import VaccinationDrive from './components/VaccinationDrive/VaccinationDrive';
import Vaccine from './pages/vaccination';
import Managestud from './pages/manageStudent';
import GenerateReport from './components/generateReport';

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
            <Route path='/manageStudent' exact element={<Managestud />} />
            <Route path='/generateReport' exact element={<GenerateReport />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
export default App;