import React,{ useState, useEffect, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from "react-bootstrap/Alert";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import '../../Style/Manage.css'

const localStorage =require("../../helper/Local_storage")

function UpdateBook (props){
  const auth = localStorage.getAuthUser()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [book ,setBook]=useState({
    imge_url: null,
    name: "",
    author_name :"",
    isbn :"",
    catigory_id:"",
    rack_number :"",
    err: null,
    loading: false,
    success : null
  })

  const image =useRef(null);

  useEffect(()=>{
    axios.get("http://localhost:4000/books/"+ props.id)
    .then((res)=>{
      setBook({
        ...book,
        name: res.data.name,
        author_name :res.data.author_name,
        isbn :res.data.isbn,
        catigory_id: res.data.catigory_id,
        rack_number : res.data.rack_number,
        image_url :res.data.image_url
      })
    })
    .catch((err)=>{
      setBook({
        ...book,
        loading:false,
        success:null,
        err: "something went worng!"
      })
    })
  },[])

  const UpdateBook=()=>{
    setBook({...book, loading: true})
    
    const formData = new FormData();
    formData.append("name", book.name)
    formData.append("author_name", book.author_name)
    formData.append("isbn", book.isbn)
    formData.append("catigory_id", book.catigory_id)
    formData.append("rack_number", book.rack_number)
    if (image.current.files && image.current.files[0]) {
      formData.append("image_url", image.current.files[0]);
    }

    axios.put("http://localhost:4000/books/"+ props.id ,formData,{
      headers :{
        token: auth.token,
        "Content-Type":"multipart/form-data"
      }
    })
    .then((res) => {
      setBook({    
      name: "",
      author_name :"",
      isbn :"",
      catigory_id:"",
      rack_number :"",
      err: null,
      loading: false,
      success : "book updated successfully !"
      })
      image.current.files =null;
    })
    .catch((error)=>{
      setBook({    
        ...book,
        loading: false,
        success : null,
        err : "something went wrong !"
        })
    })
  }

  return (
    <>
    <Button className='actionButton updateButton' variant="light" onClick={handleShow}>
    Update
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton >
      <Modal.Title style={{color:'#524439'}}>Update Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
            type="name"
            placeholder="Book Title"
            value={book.name} 
          onChange={(e)=>setBook({...book, name:e.target.value})}
        />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
            type="name"
            placeholder="Book Author"
            value={book.author_name} 
            onChange={(e)=>setBook({...book, author_name:e.target.value})}
        />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
            type="name"
            placeholder="Category"
            value={book.catigory_id} 
            onChange={(e)=>setBook({...book, catigory_id:e.target.value})}
        />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
            type="name"
            placeholder="ISBN"
            value={book.isbn} 
            onChange={(e)=>setBook({...book, isbn:e.target.value})}
        />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
            type="name"
            placeholder="Rack Number"
            value={book.rack_number} 
            onChange={(e)=>setBook({...book, rack_number:e.target.value})}
        />
        </Form.Group>
        <Form.Group className="mb-3">
        <input type="file" className="form-control"  ref={image}/>
        </Form.Group>
        {book.err &&(
        <Alert variant="info">{book.err}</Alert>
        )}

        {book.success &&(
          <Alert variant="success">{book.success}</Alert>
        )}
      </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button 
      className='button' 
      variant="light" 
      onClick={UpdateBook}>
      Update
      </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default UpdateBook;