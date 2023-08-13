import React, { useEffect, useState } from "react"
import Alert from "react-bootstrap/Alert";
import "../Style/BookInfo.css"
import BorrowButton from "../Components/borrowButton"
import { useParams } from "react-router-dom";
import axios from "axios"

const localStorage =require("../helper/Local_storage")

const BookInfo=()=>{
  const {id} =useParams()
  const auth = localStorage.getAuthUser()
  const [book,setBook]=useState({
      loading: true,
      result:null,
      err:null,
      fail:null,
      success : null
  })
  useEffect(()=>{
    setBook({...book, loading: true, err:null})
    axios.get("http://localhost:4000/books/"+id)
    .then((res)=>{
        console.log(res);
        setBook({...book, result:res.data , loading:false, err:null})
    })
    .catch((err)=>{
        setBook({...book, loading:false,})
    })
  },[])

  const borrowBook =(id)=>{
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:4000/borrowing_request',
      headers: { 
        'token': auth.token, 
        'Content-Type': 'application/json'
      },
      data : {
        "user_id": auth.id,
        "book_id": id
      }
    };
    
    axios.request(config)
    .then((res) => {
      setBook({...book , success : "The borrowing request was sent successfully", fail:null})
    })
    .catch((err) => {
      setBook({...book, fail : "Borrowing request already exist" , success :null})
    });

  }
  return(
    <div className="row bookInfoContainer">
      <div className="col-2"></div>
      {book.loading === false && book.err==null &&(
        <>
        <div className="col-3">
            <img className="pic" src={book.result.image_url} alt=""/>
        </div>
        <div className="col-4">
            <h1 className="bookInfoTitle">{book.result.name}</h1>
            <p className="discription">by {book.result.author_name}</p>
            <p className="discription">Rack Number : {book.result.rack_number}</p>
            <p className="discription">ISBN : {book.result.isbn}</p>
            <div className="borrowingDiv">
            {book.fail&& (
              <Alert className="borrowingAlert" key={'danger'} variant={'danger'}>
              {book.fail}
              </Alert>
            )}
            {book.success&&(
              <Alert className="borrowingAlert" key={'success'} variant={'success'}>
              {book.success}
              </Alert>
            )}
            <div className="borrowButton" key={id}>
              {auth && auth.role_id===2 && (
                <BorrowButton
                book_id ={id}
                borrowBook={borrowBook}
                />
              )}
            </div>
            </div>
        </div>
        </>
      )}
    </div>
  )
}

export default BookInfo;