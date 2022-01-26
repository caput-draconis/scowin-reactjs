import React from 'react';
import PropTypes from 'prop-types';
import './GenerateReports.css';
import { studentVaccinationHeaders, studentVaccineData } from '../../data/studentVaccination'; 
import Table from '../table';

const GenerateReports = () => (
  <div className="GenerateReports">
    Generate Vaccination Component
    <Table columns={studentVaccinationHeaders} rows={studentVaccineData} header="Student Vaccination Information" />
  </div>
);

GenerateReports.propTypes = {};

GenerateReports.defaultProps = {};

export default GenerateReports;
