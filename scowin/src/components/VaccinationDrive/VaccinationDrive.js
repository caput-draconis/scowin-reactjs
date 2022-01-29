import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import './VaccinationDrive.css'
import Table from '../../common/components/table/table';
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
        <div className='popup-section'>
          <h5 className='popup-header'>Add Vaccination Drive Details</h5>
        </div>
          <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column'>
            <div className='form-input'>
              <label>Vaccine Name</label>
              <select className="vaccine-name" {...register("vaccineName", { required: true })}>
                <option value="Covaxin">Covaxin</option>
                <option value="Covisheild">Covisheild</option>
                <option value="Sputnik V">Sputnik V</option>
              </select>
            </div>
            <div className='form-input'>
              <label>Slots</label>
              <input className='slots'
                type="number"
                {...register("slots", {
                  required: true,
                  maxLength: 3
                })}
              />
            </div>
            <div className='form-input'>
              <label>Vaccination Date</label>
              <input className='vaccine-date'
                type="date"
                {...register("vaccinationDate", { required: true, valueAsDate: true })}
              />
            </div>
            <div className='form-input'>
              <label>Doses Available</label>
              <input  className='doses-available'
                type="number"
                {...register("dosesAvailable", {
                  required: true,
                  maxLength: 5
                })}
              />
            </div>
          <Button type='submit' className='submit-button'>Submit</Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
};

VaccinationDrive.propTypes = {};

VaccinationDrive.defaultProps = {};

export default VaccinationDrive;
