import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import './VaccinationDrive.css'
import Table from '../../common/components/table/table';
import { vaccineHeaders } from '../../data/vaccineData';
import * as vaccinationDriveService from '../../services/vaccination-drive-service'
import { v4 as uuid } from 'uuid';

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
  const [isEditFlow, setEditFlow] = useState(false);
  const [vaccinationDriveData, setVaccinationDriveData] = useState([]);
  const showModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setEditFlow(false);
    setModalIsOpen(false);
    reset();
  };

  const { register, formState: { errors, isValid }, handleSubmit, reset, setValue } = useForm(
    { mode: "onChange" }
  );
  const onSubmit = data => {
    data = {
      ...data,
      vaccinationDate: new Date(data?.vaccinationDate).toLocaleString().split(',')[0],
      driveApproval: 'Not Approved',
      driveStatus: 'Upcoming'
    };
    console.log(data);
    if (!isEditFlow) {
      data = {
        ...data,
        id: uuid()
      };
      vaccinationDriveService.addVaccinationDrive(data).then(
        _ => {
          reset();
          closeModal();
          vaccinationDriveService.getVaccinationDriveDetails().then(
            res => setVaccinationDriveData(res)
          )
        }
      );
    } else {
      data = {
        ...data,
        id: data.id
      };
      vaccinationDriveService.editVaccinationDrive(data).then(
        _ => {
          reset();
          closeModal();
          vaccinationDriveService.getVaccinationDriveDetails().then(
            res => setVaccinationDriveData(res)
          )
        }
      );
    }

  };

  const editClicked = (editRowData) => {
    console.log(editRowData);
    vaccineHeaders.forEach((header) => {
      setValue(header.field, editRowData[header.field]);
    });
    setValue("id", editRowData['id']);
    setEditFlow(true);
    showModal();
  };

  useEffect(() => {
    vaccinationDriveService.getVaccinationDriveDetails().then(
      res => setVaccinationDriveData(res)
    )
  }, []);


  return (
    <div className="d-flex flex-column">
      <div className='button-sec'>
        <Button className='vaccination-drive-button' onClick={showModal}>Add Vaccination Drive</Button>
      </div>
      <Table columns={vaccineHeaders} rows={vaccinationDriveData} header="Vaccination Drive" isEdit={true} parentCallback={editClicked} />
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
              <select className="vaccine-name" {...register("vaccineName", { required: "This is a required field" })}>
                <option value="Covaxin">Covaxin</option>
                <option value="Covisheild">Covisheild</option>
                <option value="Sputnik V">Sputnik V</option>
              </select>
            </div>
            {errors.vaccineName && <p className='alert-error'>{errors.vaccineName.message}</p>}
            <div className='form-input'>
              <label>Slots</label>
              <input className='slots'
                type="number"
                {...register("slots", {
                  required: "This is a required field",
                  maxLength: {
                    value: 2,
                    message: "Maximum slots should be below 100"
                  }
                })}
              />
            </div>
            {errors.slots && <p className='alert-error'>{errors.slots.message}</p>}
            <div className='form-input'>
              <label>Vaccination Date</label>
              <input className='vaccine-date'
                type="date"
                {...register("vaccinationDate", { required: "This is a required field", valueAsDate: true })}
              />
            </div>
            {errors.vaccinationDate && <p className='alert-error'>{errors.vaccinationDate.message}</p>}
            <div className='form-input'>
              <label>Doses Available</label>
              <input className='doses-available'
                type="number"
                {...register("dosesAvailable", {
                  required: "This is a required field",
                  maxLength: {
                    value: 5,
                    message: "Maximum doses should be below 10000"
                  }
                })}
              />
            </div>
            {errors.dosesAvailable && <p className='alert-error'>{errors.dosesAvailable.message}</p>}
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
