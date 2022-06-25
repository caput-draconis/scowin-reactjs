import React from 'react';
import { studentVaccinationHeaders } from '../../data/studentVaccination'; 
import Table from '../common/table/table';
import * as studentVaccinationDetailsService from '../../services/student-vaccination-report';
import { useState, useEffect } from 'react';

function StudentVaccinationDetails() {

const [studentVaccinationData, setStudentsVaccinationDetailsData] = useState([]);

useEffect(() => {
  studentVaccinationDetailsService.getStudentsVaccinationDetails().then(
    res => {
      let vaccinationData = setStudentsVaccinationDetailsData(res);
      return vaccinationData;
    }
  )
}, []);

return (
  <div>
    <Table columns={studentVaccinationHeaders} rows={studentVaccinationData} header="Student Vaccination Information" />
  </div>
);
}

export default StudentVaccinationDetails;
