import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { GiHamburgerMenu } from 'react-icons/gi';
const Menu = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <span className="navLink" onClick={handleShow}>
        <GiHamburgerMenu />
      </span>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Quraani</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className='offCanvas_menu'>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Menu;
