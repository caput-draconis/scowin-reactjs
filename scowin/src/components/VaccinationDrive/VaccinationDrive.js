import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './VaccinationDrive.less';
import Button from 'react-bootstrap/Button'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

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

function VaccinationDrive () {
  
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const [vaccinationDriveFormValue,setVaccinationDriveDetails] = useState();
  const showModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
//   const handleSubmit = (evt) => {
//     evt.preventDefault();
//     alert(`Submitting Name ${name}`)
// }

  return(
  <div className="d-flex">
    <Button className='vaccination-drive-button' onClick={showModal}>Add Vaccination Drive</Button>
    <Modal
        open={modalIsOpen}
        onClose={closeModal}
      >
        <Box sx={style}>
        {/* <form onSubmit={handleSubmit}>
      <label>
        Frirst Name:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form> */}
    Popup content
        </Box>
      </Modal>
  </div>
  )
};

VaccinationDrive.propTypes = {};

VaccinationDrive.defaultProps = {};

export default VaccinationDrive;
