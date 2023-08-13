// import { useRef, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Alert from "react-bootstrap/Alert";
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import '../../Style/Manage.css'
// import axios from 'axios';

// const localStorage = require("../../helper/Local_storage")

// function AddBook (){
//     const auth = localStorage.getAuthUser();
//     const [show, setShow] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
//     const [book,setBook] =useState({
//         name: "",
//         author_name :"",
//         isbn :"",
//         catigory_id:"",
//         rack_number :"",
//         err: [],
//         loading: false,
//         success : null
//     })

//     const image = useRef(null)
//     const createBook =(e)=>{
//         e.preventDefault();
//         setBook({...book,loading:true })
//         const formData = new FormData();
//         formData.append("name", book.name)
//         formData.append("author_name", book.author_name)
//         formData.append("isbn", book.isbn)
//         formData.append("catigory_id", book.catigory_id)
//         formData.append("rack_number", book.rack_number)
//         if (image.current.files && image.current.files[0]) {
//         formData.append("image_url", image.current.files[0]);
//         }
//         axios.post("http://localhost:4000/books", formData,{
//             headers :{
//               token:auth.token,
//               "Content-Type":"multipart/form-data"
//             }
//         })
//         .then((res)=>{
//             setBook({
//             name: "",
//             author_name :"",
//             isbn :"",
//             catigory_id:"",
//             rack_number :"",
//             err: [],
//             loading: false,
//             })
//             image.current.files =null;
//         })
//         .catch((err)=>{
//           setBook({    
//           ...book,
//           loading: false,
//           err : err.response.data.errors,
//           })
//         })
//     }

//     return (
//         <>
//         <Button className='button' variant="light" onClick={handleShow}>
//         Add New Book +
//         </Button>

//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton >
//             <Modal.Title style={{color:'#524439'}}>Add New Book</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//             <Form>
//                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                 <Form.Control
//                     type="name"
//                     placeholder="Book Title"
//                     autoFocus
//                     value={book.name}
//                     onChange={(e)=>setBook({...book, name: e.target.value})}
//                 />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                 <Form.Control
//                     type="name"
//                     placeholder="Book Author"
//                     value={book.author_name}
//                     onChange={(e)=>setBook({...book, author_name: e.target.value})}
//                 />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                 <Form.Control
//                     type="name"
//                     placeholder="Category"
//                     value={book.catigory_id}
//                     onChange={(e)=>setBook({...book, catigory_id: e.target.value})}
//                 />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                 <Form.Control
//                     type="name"
//                     placeholder="ISBN"
//                     value={book.isbn}
//                     onChange={(e)=>setBook({...book, isbn: e.target.value})}
//                 />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                 <Form.Control
//                     type="name"
//                     placeholder="Rack Number"
//                     value={book.rack_number}
//                     onChange={(e)=>setBook({...book, rack_number: e.target.value})}
//                 />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                 <input type="file" className="form-control " ref={image}/>
//                 </Form.Group>

//                 {book.err.map((errors)=>(
//                 <Alert key={'danger'} variant={'danger'}>
//                 {errors.msg}
//                 </Alert>
//                 ))}
                
//                 <Button 
//                 className='button' 
//                 variant="light" 
//                 onClick={createBook}>
//                     Add
//                 </Button>
//             </Form>
//             </Modal.Body>
//         </Modal>
//         </>
//     );
// }
// export default AddBook;