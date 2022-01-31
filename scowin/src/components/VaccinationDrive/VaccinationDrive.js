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

  const { register, formState: { errors, isValid }, handleSubmit, reset, setValue } = useForm(
    { mode: "onChange" }
  );
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
      <div className='button-sec'>
        <Button className='vaccination-drive-button' onClick={showModal}>Add Vaccination Drive</Button>
      </div>
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
              <select className="vaccine-name" {...register("vaccineName", { required: "This is a required field." })}>
                <option value="Covaxin">Covaxin</option>
                <option value="Covisheild">Covisheild</option>
                <option value="Sputnik V">Sputnik V</option>
              </select>
            </div>
            {errors.vaccineName && <p className='m-0 mt-2 alert-danger'>{errors.vaccineName.message}</p>}
            <div className='form-input'>
              <label>Slots</label>
              <input className='slots'
                type="number"
                {...register("slots", {
                  required: "This is a required field.",
                  maxLength: {
                    value: 2,
                    message: "Maximum slots should be below 100"
                  }
                })}
              />
            </div>
            {errors.slots && <p className='m-0 mt-2 alert-danger'>{errors.slots.message}</p>}
            <div className='form-input'>
              <label>Vaccination Date</label>
              <input className='vaccine-date'
                type="date"
                {...register("vaccinationDate", { required: "This is a required field.", valueAsDate: true })}
              />
            </div>
            {errors.vaccinationDate && <p className='m-0 mt-2 alert-danger'>{errors.vaccinationDate.message}</p>}
            <div className='form-input'>
              <label>Doses Available</label>
              <input className='doses-available'
                type="number"
                {...register("dosesAvailable", {
                  required: "This is a required field.",
                  maxLength: {
                    value: 5,
                    message: "Maximum doses should be below 10000"
                  }
                })}
              />
            </div>
            {errors.dosesAvailable && <p className='m-0 mt-2 alert-danger'>{errors.dosesAvailable.message}</p>}
            <Button type='submit' className='submit-button' disabled={!isValid} >Submit</Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
};

VaccinationDrive.propTypes = {};

VaccinationDrive.defaultProps = {};

export default VaccinationDrive;
