import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { vaccineHeaders } from '../../data/vaccineData';
import Table from '../common/table/table';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './Home.css'
import * as studentVaccinationMetadataService from '../../services/student-vaccination-metadata';
import { useState, useEffect } from 'react';


export default function Home() {
  const COLORS = ['#0088FE', '#00C49F'];

  // Tooltip data to show on hover of pie chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
          <label>{`${payload[0].name} : ${payload[0].value}`}</label>
        </div>
      );
    }

    return null;
  };

  const [studentsVaccinationMetadata, setStudentsVaccinationMetadata] = useState([]);


  useEffect(() => {
    studentVaccinationMetadataService.getStudentsVaccinationMetadata().then(
      res => setStudentsVaccinationMetadata(res)
    )
  }, []);

  const pieData = [
    {
      "name": "Students Vaccinated",
      "value": studentsVaccinationMetadata.vaccinatedStudentCount
    },
    {
      "name": "Students Registered",
      "value": studentsVaccinationMetadata.registeredStudentCount
    }
  ];

  return (
    <Fragment>
      <div>
        <div>
          <h3 className='home-header'> Overview </h3>
          <CardGroup>
            <Card>
              <Card.Header>
                <Card.Link href="/manageStudent">View Details</Card.Link>
              </Card.Header>
              <hr />
              <Card.Body>
                <Card.Title>{studentsVaccinationMetadata.registeredStudentCount}</Card.Title>
                <Card.Text>
                  STUDENTS REGISTERED
                </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <Card.Link href="/generateReport">View Details</Card.Link>
              </Card.Header>
              <hr />
              <Card.Body>
                <Card.Title>{studentsVaccinationMetadata.vaccinatedStudentCount}</Card.Title>
                <Card.Text>
                  STUDENTS VACCINATED
                </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <Card.Link href="/vaccination">View Details</Card.Link>
              </Card.Header>
              <hr />
              <Card.Body>
                <Card.Title>{((studentsVaccinationMetadata.vaccinatedStudentCount / studentsVaccinationMetadata.registeredStudentCount) * 100).toFixed(2)} %</Card.Title>
                <Card.Text>
                  PERCENTAGE OF STUDENTS VACCINATED
                </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <Card.Link href="/vaccination">View Details</Card.Link>
              </Card.Header>
              <hr />
              <Card.Body>
                <PieChart width={1000} height={150}>
                  <Pie data={pieData} color="#000000" dataKey="value" nameKey="name" cx="10%" cy="50%" outerRadius={50} fill="#8884d8" >
                    {
                      pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </Card.Body>
            </Card>
          </CardGroup>
        </div>
        <div className='vaccine-table'>
          {studentsVaccinationMetadata.upcomingVaccinationDrive?.length === 0 ? <p className='home-header'>No Upcoming Drives</p> :
            // Table to show upcoming vaccination drive
            <Table columns={vaccineHeaders} rows={studentsVaccinationMetadata.upcomingVaccinationDrive} header="Upcoming Vaccination Drive" isEdit={false} />
          }
        </div>
      </div>
    </Fragment>
  )
}
