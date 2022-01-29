import React, { Fragment } from 'react';
import '../../common/Styles/style.css';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { vaccineData, vaccineHeaders } from '../../data/vaccineData';
import { studentVaccineData } from '../../data/studentVaccination';
import { studentData } from '../../data/studentData';
import MaterialTable from "@material-table/core";

// Import Material Icons
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

export default function Home() {
  
  const percent = ((studentVaccineData.length/studentData.length)*100).toFixed(2);
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
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
                    <Card.Title>{studentData.length}</Card.Title>
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
                    <Card.Title>{percent} %</Card.Title>
                    <Card.Text>
                      PERCENTAGE OF STUDENTS VACCINATED
                    </Card.Text>
                  </Card.Body>
                </Card>
              </CardGroup>
        </div>
        <div className='vaccine-table'>
          {vaccineData.length===0 ? <p className='home-header'>No Upcoming Drives</p> :<MaterialTable title="Vaccination Drive" icons={tableIcons} columns={vaccineHeaders} data={ vaccineData } />}
        </div>
      </div>
    </Fragment>
  )
}
