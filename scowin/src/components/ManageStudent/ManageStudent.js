import React, { Fragment } from 'react';
import { useState } from 'react';
import './manageStudent.css';
import MaterialTable from "@material-table/core";
import { studentData, columnStudents } from '../../data/studentData';
import Button from 'react-bootstrap/Button'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ExcelRenderer } from 'react-excel-renderer';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { useForm } from "react-hook-form";

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

function ManageStudent() {

  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm(
    { mode: "onChange" }
  );

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailsOpen, setdetailsOpen] = useState(false);

  const showModal = () => { setModalIsOpen(true); };
  const closeModal = () => { setModalIsOpen(false); };
  const showDetails = () => { setdetailsOpen(true); }
  const closeDetails = () => { setdetailsOpen(false); }

  const submitDetails = (data) => {
    console.log('data: ', data);
    reset();
    closeDetails();
  };

  const downloadTemplate = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = 'bulkUpload'
    const csvData = [{ Id: '', Name: '', Dob: '', Gender: '', Blood_Group: '', Grade: '', Section: '', AAdhar: '', Existing_Comorbidities: '' }]
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    closeModal();
  };

  const fileReader = (event) => {
    let fileObj = event.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err)
      }
      else {
        console.log("R", resp)
        closeModal();
        var rows = resp.rows['length']
        var header = resp.rows[0]
        for (var j = 1; j < rows; j++) {
          var s1 = resp.rows[j]
          var obj = {}
          for (var i = 0; i < header.length; i++) {
            obj[header[i]] = s1[i];
          }
          console.log("JSON", obj)
        }
      }
    });
  };

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
            <form onSubmit={handleSubmit(submitDetails)}>
              <input className="form-input" type="number" placeholder="Student ID" {...register("studentID", {
                required: "This is a required field.", maxLength: {
                  value: 4,
                  message: "Maximum value is 4, ex. 8877"
                }
              })} />
              {errors.studentID && <p className='m-0 mt-2 alert-danger'>{errors.studentID.message}</p>}
              <input className="form-input" type="text" placeholder="Full Name" {...register("name", {
                required: "This is a required field.", pattern: {
                  value: /^[a-zA-Z\\s]*$/,
                  message: "Value doesn't match the correct validation"
                }
              })} />
              {errors.name && <p className='m-0 mt-2 alert-danger'>{errors.name.message}</p>}
              <div className='form-select-section'>
                <label>Date of Birth</label>
                <input className="form-input" id="dob" type="date" placeholder="Date of Birth" {...register("dob", { required: "This is a required field.", valueAsDate: true })} />
                {errors.dob && <p className='m-0 mt-2 alert-danger'>{errors.dob.message}</p>}
              </div>
              <div {...register("gender", { required: "This is a required field." })} className='gender-class'>
                <label>Gender</label>
                <input type="radio" value="Male" className="gender" /> Male
                <input type="radio" value="Female" className="gender" /> Female
                <input type="radio" value="Other" className="gender" /> Other
                {errors.gender && <p className='m-0 mt-2 alert-danger'>{errors.gender.message}</p>}
              </div>
              <input className="form-input" type="text" placeholder="Blood Group" {...register("bgGroup", {
                required: "This is a required field.", pattern: {
                  value: /^(A|B|AB|O)[+-]$/,
                  message: "Value doesn't match the correct validation, eg. A+, B+, AB+"
                }
              })} />
              {errors.bgGroup && <p className='m-0 mt-2 alert-danger'>{errors.bgGroup.message}</p>}
              <div className='form-select-section'>
                <label> Grade </label>
                <select className="form-select" id="grade" {...register("grade", { required: "This is a required field." })}>
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
                {errors.grade && <p className='m-0 mt-2 alert-danger'>{errors.grade.message}</p>}
              </div>
              <div className='form-select-section'>
                <label>Section</label>
                <select className="form-select" {...register("section", { required: "This is a required field." })}>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
                {errors.section && <p className='m-0 mt-2 alert-danger'>{errors.section.message}</p>}
              </div>
              <input className="form-input" type="number" placeholder="Aadhar Card Number" {...register("aadhar", { required: "This is a required field.", pattern: { value: /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/, message: "Value doesn't match the required patter." } })} />
              {errors.aadhar && <p className='m-0 mt-2 alert-danger'>{errors.aadhar.message}</p>}
              <TextField id="outlined-multiline-static" label="Existing Comoribidities" multiline rows={4}  {...register("EC", { required: "This is a required field." })} />
              <Button type='submit' className='submit-button' disabled={!isValid} >Submit</Button>
            </form>
          </Box>
        </Modal>
        <MaterialTable title="Student Details" icons={tableIcons} columns={columnStudents} data={studentData} />
      </div>
    </Fragment>
  )
}
export default ManageStudent;
