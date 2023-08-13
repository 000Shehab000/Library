import '../../Style/Manage.css'
import '../../Style/Home.css'
import ManageBookCard from '../../Components/manageBookCard'
import Button from 'react-bootstrap/Button';
import Alert from "react-bootstrap/Alert";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

const localStorage = require("../../helper/Local_storage")

const ManageBooks =()=>{
    const [lisTOfbooks,setListOfBooks]=useState({
      loading:true,
      results:[],
      err:null,
      reload : 0
    })
    const auth = localStorage.getAuthUser();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [book,setBook] =useState({
        name: "",
        author_name :"",
        isbn :"",
        catigory_id:"",
        rack_number :"",
        err: [],
        loading: false,
        success : null
    })
    const image = useRef(null)

    useEffect(()=>{
      setListOfBooks({...lisTOfbooks,loading:true})
      axios.get("http://localhost:4000/books")
      .then((res)=>{
        setListOfBooks({...lisTOfbooks, loading:false, results:res.data, err:null})
      })
      .catch((err)=>{
        setListOfBooks({...lisTOfbooks, loading:false, err:"something went wrong !!!"})
      })
    },[lisTOfbooks.reload])

    const createBook =(e)=>{
      e.preventDefault();
      setBook({...book,loading:true })
      const formData = new FormData();
      formData.append("name", book.name)
      formData.append("author_name", book.author_name)
      formData.append("isbn", book.isbn)
      formData.append("catigory_id", book.catigory_id)
      formData.append("rack_number", book.rack_number)
      if (image.current.files && image.current.files[0]) {
      formData.append("image_url", image.current.files[0]);
      }
      axios.post("http://localhost:4000/books", formData,{
          headers :{
            token:auth.token,
            "Content-Type":"multipart/form-data"
          }
      })
      .then((res)=>{
          setBook({
          name: "",
          author_name :"",
          isbn :"",
          catigory_id:"",
          rack_number :"",
          err: [],
          loading: false,
          })
          image.current.files =null;
          setListOfBooks({...lisTOfbooks, reload:lisTOfbooks.reload + 1})
      })
      .catch((err)=>{
        setBook({    
        ...book,
        loading: false,
        err : err.response.data.errors,
        })
      })
    }
    const deleteBook =(id)=>{
      axios.delete("http://localhost:4000/books/"+ id,{
        headers:{
          token : auth.token,
        }
      })
      .then((res)=>{
        setListOfBooks({...lisTOfbooks, reload : lisTOfbooks.reload +1})
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    return (
        <>
        <div className="title d-flex justify-content-between">
        <h3 className="">Books</h3>

        <Button className='button' variant="light" onClick={handleShow}>
        Add New Book +
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton >
            <Modal.Title style={{color:'#524439'}}>Add New Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                    type="name"
                    placeholder="Book Title"
                    autoFocus
                    value={book.name}
                    onChange={(e)=>setBook({...book, name: e.target.value})}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                    type="name"
                    placeholder="Book Author"
                    value={book.author_name}
                    onChange={(e)=>setBook({...book, author_name: e.target.value})}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                    type="name"
                    placeholder="Category"
                    value={book.catigory_id}
                    onChange={(e)=>setBook({...book, catigory_id: e.target.value})}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                    type="name"
                    placeholder="ISBN"
                    value={book.isbn}
                    onChange={(e)=>setBook({...book, isbn: e.target.value})}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                    type="name"
                    placeholder="Rack Number"
                    value={book.rack_number}
                    onChange={(e)=>setBook({...book, rack_number: e.target.value})}
                />
                </Form.Group>
                <Form.Group className="mb-3">
                <input type="file" className="form-control " ref={image}/>
                </Form.Group>

                {book.err.map((errors)=>(
                <Alert key={'danger'} variant={'danger'}>
                {errors.msg}
                </Alert>
                ))}
                
                <Button 
                className='button' 
                variant="light" 
                onClick={createBook}>
                    Add
                </Button>
            </Form>
            </Modal.Body>
        </Modal>

        </div>
        
        <div className="row myBooksHomeList">
        {lisTOfbooks.results.map((book)=>(
          <div className="col-3 book" key={book.id}>
          <ManageBookCard
            Title={book.name} 
            Author={book.author_name} 
            RackNumber={book.rack_number}
            image= {book.image_url}
            ISBN={book.isbn}
            id={book.id}
            deleteBook ={deleteBook}
          />
          </div>
        ))}
            
        </div>
        </>
      );
}

export default ManageBooks;