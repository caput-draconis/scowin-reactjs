import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { IconContext } from 'react-icons';
import logo_image from '../images/scowin_logo_2.png';
import Nav from 'react-bootstrap/Nav'

function Navbar() {

  return (
    <>
      <div className='d-flex flex-direction-row bg-light justify-content-between align-items-center'>
        <img src={logo_image} alt='logo_image' className='logo-image'></img>
        <Nav className="justify-content-end" activeKey="/home">
          <Nav.Item>
            <Nav.Link as={Link} to="/"><span><AiIcons.AiFillHome /> Home  </span></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/manageStudent"><span> <FaIcons.FaUserFriends /> Manage Student Details </span></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/vaccination"><span><FaIcons.FaUserMd /> Update Vaccination status </span></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/generateReport"><span><FaIcons.FaWpforms /> Generate Vaccination Reports </span></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/vaccinationDrive">
              <span><FaIcons.FaSyringe /> Manage Vaccination drive </span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="disabled" disabled>
              <span><FiIcons.FiLogOut /> Logout </span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </>
  );
}

export default Navbar;
