import React from 'react';
import "./App.css";
import MaterialTable from "material-table";

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
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
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

class Students extends React.Component {

  render() {

    // Material Table Columns
    const columns = [     
      { title: 'Id', field: 'id' },
      { title: 'Name', field: 'name' },
      { title: 'DOB', field: 'dob' },
      { title: 'Gender', field: 'gender' },
      { title: 'Grade', field: 'grade' },
      { title: 'Section', field: 'section' },
      { title: 'AAdhar', field: 'aadhar' },
    ]

    // Material Table Columns Rows
    const data = [
        {
            id: "142107",
            name: "Y Diyva",
            dob: "20-Jan-2009",
            gender: "Female",
            grade: "2",
            section: "A",
            aadhar: "123456789123"
          },
          {
              id: "142107",
              name: "Suman",
              dob: "20-Jan-2009",
              gender: "Female",
              grade: "2",
              section: "A",
              aadhar: "123456789123"
            },
            {
              id: "142107",
              name: "Eliza",
              dob: "20-Jan-2009",
              gender: "Female",
              grade: "2",
              section: "A",
              aadhar: "123456789123"
            },
            {
              id: "142107",
              name: "Anita",
              dob: "20-Jan-2009",
              gender: "Female",
              grade: "2",
              section: "A",
              aadhar: "123456789123"
            },
            {
              id: "142107",
              name: "Ratna",
              dob: "20-Jan-2010",
              gender: "Female",
              grade: "2",
              section: "A",
              aadhar: "123456789123"
            }
   ];
 


    return (
      <div className="App wrapper">
        <h2>Student Data</h2>

        <MaterialTable
          title="Static Data Example"
          icons={tableIcons}
          columns={columns}
          data={data}
          options={{
            exportButton: true,           
            filtering: true 
          }}
        
        />
        
      </div>
    );
  }
}

export default Students;
