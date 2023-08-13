import React,{ useState, useEffect  } from "react"
import BorrowedBookCard from "../Components/borrowedBookCard"
import "../Style/Home.css"
import axios from "axios"
import { useParams } from "react-router-dom"

const localStorage = require("../helper/Local_storage")

const BorrowedBooks=()=>{
  const {id}=useParams()
  const auth= localStorage.getAuthUser()
  const [borrowedBooks,setBorrowedBooks]=useState({
    loading: true,
    results:[],
    err :null
  })
  useEffect(()=>{
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:4000/borrowing_request/'+ id,
      headers: { 
        'token': auth.token, 
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }; 
    axios.request(config)
    .then((res) => {
      setBorrowedBooks({...borrowedBooks, results:res.data, loading:false})
    })
    .catch((err) => {
      console.log(err);
    });
  },[])

  return(
    <>
    <div className="title d-flex justify-content-between">
    <h3 className="">My Books</h3>
    </div>
    <div className="row myBooksHomeList">
      {borrowedBooks.results.map((borrowedBook)=>(
        <div className="col-3 book" key={borrowedBook.id}>
        <BorrowedBookCard
        id={borrowedBook.id}
        name={borrowedBook.name}
        author_name={borrowedBook.author_name}
        isbn={borrowedBook.isbn}
        rack_number={borrowedBook.rack_number}
        image={borrowedBook.image_url}/>
        </div>
      ))}
    </div>
    </>
  )
}

export default BorrowedBooks;