import React, { Fragment } from 'react';
import './style.css';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

export default function Home() {
  return (
    <Fragment>
      <div className="sec">
        <div> 
            <h3 className='home-head'> Overview </h3>
            <CardGroup>
               <Card>
                 <Card.Header>
                    <Card.Link href="#">View Details</Card.Link> 
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
                    <Card.Link href="#">View Details</Card.Link> 
                  </Card.Header>
                  <hr />
                  <Card.Body>
                    <Card.Title>XXX</Card.Title>
                    <Card.Text>
                        STUDENTS VACCINATED
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                <Card.Header>
                    <Card.Link href="#">View Details</Card.Link> 
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
      </div>
    </Fragment>
  )
}
