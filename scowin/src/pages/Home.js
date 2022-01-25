import React, { Fragment } from 'react';
import './style.css';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { vaccineData } from '../data/vaccineData';
import { studentVaccineData } from '../data/studentVaccination';

export default function Home() {
  return (
    <Fragment>
      <div className="sec">
         <div> 
            <h3 className='home-head'> Overview </h3>
            <CardGroup>
               <Card>
                 <Card.Header>
                    <Card.Link href="/manageStudent">View Details</Card.Link> 
                 </Card.Header>
                  <hr />
                  <Card.Body>
                    <Card.Title>XXX</Card.Title>
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
                    <Card.Title>{studentVaccineData.length}</Card.Title>
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
                    <Card.Title>XX %</Card.Title>
                    <Card.Text>
                      PERCENTAGE OF STUDENTS VACCINATED
                    </Card.Text>
                  </Card.Body>
                </Card>
              </CardGroup>
        </div>
        <div>
          <h3 className='home-head'> Vaccination Drive</h3>
            <div className='data1'>
              
              {vaccineData.map((data, key) => {
                return (
                  <div key={key}>
                    {data.date +
                      " , " +
                      data.vaccineName +
                      " ," +
                      data.dosesAvailable +
                      ", " +
                      data.slots +
                      ","+
                      data.driveApproval +
                      ","+
                      data.driveStatus
                    }
                  </div>
                );
              })}
            </div>
        </div>
      </div>
    </Fragment>
  )
}
