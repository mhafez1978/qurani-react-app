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
          <Offcanvas.Title>قرآني / Quraani</Offcanvas.Title>
          <center>
            <small>Listen &amp; Pounder...</small>
          </center>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="offCanvas_menu">
            <li>
              This application was build by
              <br />
              Mohamed Hafez of Lowell Massachussetts.
              <hr />
            </li>
            <li>
              Contact: <br />
              admin@movewebdesign.com
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Menu;
