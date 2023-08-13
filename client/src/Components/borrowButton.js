import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import '../Style/BookInfo.css'
function BorrowButton(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className='borrowButton btn' variant="light" onClick={handleShow}>
        Borrow
      </Button>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title style={{color:'#524439'}}>Borrowing Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to send a borrowing Request?
        </Modal.Body>
        <Modal.Footer>
            <Button 
            className='sendButton btn btn-light' 
            variant="light" 
            onClick={()=>{props.borrowBook(props.book_id);handleClose();}}>
              Send
            </Button>
            <Button 
            className='cancelButton btn btn-light' 
            variant="light" 
            onClick={handleClose}>
              Cancel
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BorrowButton;