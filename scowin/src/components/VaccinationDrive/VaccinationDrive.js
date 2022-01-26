import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import './VaccinationDrive.css'
import Table from '../table';
import { vaccineData, vaccineHeaders } from '../../data/vaccineData';

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

function VaccinationDrive() {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const showModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const { register, handleSubmit, errors, reset, setValue } = useForm()
  const onSubmit = data => {
    console.log('data: ', data);
    reset();
    closeModal();
  };

  const editClicked = (editRowData) => {
    console.log(editRowData);
    vaccineHeaders.forEach((header) => {
      setValue(header.field, editRowData[header.field]);
    });
    showModal();
  };

  return (
    <div className="d-flex flex-column">
      <Button className='vaccination-drive-button' onClick={showModal}>Add Vaccination Drive</Button>
      <Table columns={vaccineHeaders} rows={vaccineData} header="Vaccination Drive" isEdit={true} parentCallback={editClicked} />
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
      >
        <Box sx={style}>
        <h5 className='header'>Add Student Details</h5>
          <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column'>
            <div>
              <label>Vaccine Name</label>
              <select name="vaccineName" {...register("vaccineName", { required: true })}>
                <option value="Covaxin">Covaxin</option>
                <option value="Covisheild">Covisheild</option>
                <option value="Sputnik V">Sputnik V</option>
              </select>
            </div>
            <div>
              <label>Slots</label>
              <input
                type="number"
                {...register("slots", {
                  required: true,
                  maxLength: 3
                })}
              />
            </div>
            <div>
              <label>Vaccination Date</label>
              <input
                type="date"
                {...register("vaccinationDate", { required: true, valueAsDate: true })}
              />
            </div>
            <div>
              <label>Doses Available</label>
              <input
                type="number"
                {...register("dosesAvailable", {
                  required: true,
                  maxLength: 5
                })}
              />
            </div>
            {/* <label>Are you a developer?</label>
      <input
        type="radio"
        value="Yes"
        {...register("developer", { required: true })}
      />
      <input
        type="radio"
        value="No"
        {...register("developer", { required: true })}
      /> */}

            <input type="submit" className='mt-4'/>
          </form>
        </Box>
      </Modal>
    </div>
  )
};

VaccinationDrive.propTypes = {};

VaccinationDrive.defaultProps = {};

export default VaccinationDrive;
