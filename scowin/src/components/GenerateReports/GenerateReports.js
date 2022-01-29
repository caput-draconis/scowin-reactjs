import React from 'react';
import './GenerateReports.css';
import { studentVaccinationHeaders, studentVaccineData } from '../../data/studentVaccination'; 
import Table from '../../common/components/table/table';

const GenerateReports = () => (
  <div className="GenerateReports">
    Generate Vaccination Component
    <Table columns={studentVaccinationHeaders} rows={studentVaccineData} header="Student Vaccination Information" />
  </div>
);

GenerateReports.propTypes = {};

GenerateReports.defaultProps = {};

export default GenerateReports;
