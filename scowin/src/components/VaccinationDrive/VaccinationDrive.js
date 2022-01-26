import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import './VaccinationDrive.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#0e101c',
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
  const { register, handleSubmit, errors, reset } = useForm()
  const onSubmit = data => {
    console.log('data: ', data);
    reset();
    closeModal();
  };

  return (
    <div className="d-flex">
      <Button className='vaccination-drive-button' onClick={showModal}>Add Vaccination Drive</Button> 

      <Modal
        open={modalIsOpen}
        onClose={closeModal}
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Vaccine Name</label>
            <select name="vaccineName" {...register("vaccineName", { required: true })}>
              <option value="covaxine">Covaxine</option>
              <option value="covishield">Covishield</option>
            </select>
            <label>Slots</label>
            <input
              type="number"
              {...register("noOfSlots", {
                required: true,
                maxLength: 3
              })}
            />
            <label>Vaccination Date</label>
            <input
              type="date"
              {...register("vaccinationDate", { required: true })}
            />
            <label>Doses Available</label>
            <input
              type="number"
              {...register("dosesAvailable", {
                required: true,
                maxLength: 5
              })}
            />
            <label>Description</label>
            <input
              type="textarea"
              {...register("description", {
                required: false
              })}
            />
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

            <input type="submit" />
          </form>
        </Box>
      </Modal>
    </div>
  )
};

VaccinationDrive.propTypes = {};

VaccinationDrive.defaultProps = {};

export default VaccinationDrive;
