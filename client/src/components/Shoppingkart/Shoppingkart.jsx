import {React, useState } from 'react';
import {Link} from 'react-router-dom';
import './Shoppingkart.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';



export default function Shoppingkart(){
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);


 return(

<div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
Gracias por su compra.
	 </Offcanvas.Body>
      </Offcanvas>
	 <h1>content</h1>


</div>


 );
};

