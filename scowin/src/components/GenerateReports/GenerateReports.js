import React from 'react';
import { studentVaccinationHeaders, studentVaccineData } from '../../data/studentVaccination'; 
import Table from '../../common/components/table/table';

const GenerateReports = () => (
  <div>
    Generate Vaccination Component
    <Table columns={studentVaccinationHeaders} rows={studentVaccineData} header="Student Vaccination Information" />
  </div>
);

GenerateReports.propTypes = {};

GenerateReports.defaultProps = {};

export default GenerateReports;
