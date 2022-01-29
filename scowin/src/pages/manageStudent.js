import React, { Fragment } from 'react';
import { useState } from 'react';
import './style.css';
import MaterialTable from "@material-table/core";
import { studentData, columnStudents } from '../data/studentData';
import Button from 'react-bootstrap/Button'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import {ExcelRenderer} from 'react-excel-renderer';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

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


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

function ManageStudent () {
  
  const [name, setName] = useState('');
  const [bgroup, setBgroup] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [grade, setGrade] = useState('');
  const [section, setSection] = useState('');
  const [ID, setID] = useState('');
  const [EC, setEC] = useState('');

  const [modalIsOpen,setModalIsOpen] = useState(false);
  const [detailsOpen, setdetailsOpen] = useState(false);

  const showModal = () => { setModalIsOpen(true);};
  const closeModal = () => {setModalIsOpen(false);};
  const showDetails = () => {setdetailsOpen(true);}
  const closeDetails = () => {setdetailsOpen(false);}

  const navigate = useNavigate();

  const submitDetails = () => {
    console.log('submitted successfully')
    navigate("/manageStudent");
  }

  const handleName = event => {setName(event.target.value)}
  const handlebgroup = event => {setBgroup(event.target.value)}
  const handleAadhar = event => {setAadhar(event.target.value)}
  const handleDob = event => {setDob(event.target.value)}
  const handleGender = event => {setGender(event.target.value)}
  const handleGrade = event => {setGrade(event.target.value)}
  const handleSection = event => {setSection(event.target.value)}
  const handleID = event => {setID(event.target.value)}
  const handleEC = event => {setEC(event.target.value)}

  const downloadTemplate = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = 'bulkUpload'
    const csvData = [ {Id:'', Name:'', Dob:'', Gender:'', Blood_Group:'', Grade:'', Section:'', AAdhar:'',Existing_Comorbidities:''} ]
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
    closeModal();
  }
  const fileReader = (event) => {
    let fileObj = event.target.files[0];
    ExcelRenderer(fileObj, (err,resp) => {
      if(err){
        console.log(err)
      }
      else{
        console.log("R",resp)
        closeModal();
        var rows = resp.rows['length']
        var header = resp.rows[0]
        for(var j=1;j<rows;j++){
          var s1 = resp.rows[j]
          var obj={}
          for(var i=0;i<header.length;i++){
            obj[header[i]]=s1[i];
          }
          console.log("JSON",obj)  
        }
      }
    });
  }
  return (
    <Fragment>
      <div>
        <div className='button-section'>
          <Button className='vaccination-drive-button' onClick={showModal}>Upload Students</Button>
          <Button className='vaccination-drive-button' onClick={showDetails}>Add New Student</Button>
        </div>
        <Modal
        open={modalIsOpen}
        onClose={closeModal}
      >
        <Box sx={style}>
          <div className='popup-section'>
            <h5 className='popup-header'>Upload Students Details</h5>
          </div>
          <div className='upload-students-content'>
            <p>Upload Student details Excel by filling all details in the below template</p>
            <input type="file" onChange={fileReader} className='upload-file' />
            <p className='download-template' onClick={downloadTemplate}>Download Template</p>
          </div>
        </Box>
      </Modal>
      <Modal
        open={detailsOpen}
        onClose={closeDetails}
      >
        <Box sx={style}>
          <div className='popup-section'>
            <h5 className='popup-header'>Add Student Details</h5>
          </div>
          <form onSubmit={submitDetails}>
            <input className="form-input" type="number" placeholder="Student ID" value={ID} onChange={handleID} />
            <input className="form-input" type="text" placeholder="Full Name" value={name} onChange={handleName} />
            <div className='form-select-section'>
              <label>Date of Birth</label>
              <input className="form-input" id="dob" type="date" placeholder="Date of Birth" value={dob} onChange={handleDob} />
            </div>
            <div onChange={handleGender} value={gender} className='gender-class'>
              <label>Gender</label>
              <input type="radio" value="Male" className="gender" /> Male
              <input type="radio" value="Female" className="gender" /> Female
              <input type="radio" value="Other" className="gender" /> Other
            </div>
            <input className="form-input" type="text" placeholder="Blood Group" value={bgroup} onChange={handlebgroup} />
            <div className='form-select-section'>
              <label> Grade </label>
              <select className="form-select" id="grade" onChange={handleGrade} value={grade}> 
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="2">3</option>
                <option value="2">4</option>
                <option value="2">5</option>
                <option value="2">6</option>
                <option value="2">7</option>
                <option value="2">8</option>
                <option value="2">9</option>
                <option value="2">10</option>
              </select>
            </div>
            <div className='form-select-section'>
              <label>Section</label>
              <select className="form-select" onChange={handleSection} value={section}> 
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
            <input className="form-input" type="number" placeholder="Aadhar Card Number" value={aadhar} onChange={handleAadhar} />
            <TextField id="outlined-multiline-static" label="Existing Comoribidities" multiline rows={4}  value={EC} onChange={handleEC}  />
            <Button type='submit' className='submit-button'>Submit</Button>
          </form>
        </Box>
      </Modal>
        <MaterialTable title="Student Details" icons={tableIcons} columns={columnStudents} data={studentData} />
      </div>
    </Fragment>
  )
}
export default ManageStudent;