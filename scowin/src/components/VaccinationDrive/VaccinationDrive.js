import React from 'react';
import PropTypes from 'prop-types';
import './VaccinationDrive.less';
import Button from 'react-bootstrap/Button'

const VaccinationDrive = () => (
  <div className="d-flex">
    <Button type="submit" className='vaccination-drive-button'>Add Vaccination Drive</Button>
  </div>
);

VaccinationDrive.propTypes = {};

VaccinationDrive.defaultProps = {};

export default VaccinationDrive;
