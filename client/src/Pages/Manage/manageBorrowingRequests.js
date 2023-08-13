import '../../Style/Manage.css'
import BorrowingCard from '../../Components/borrowingCard.js';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const localStorage = require("../../helper/Local_storage")

const ManageBorrowingRequests =()=>{
  const auth = localStorage.getAuthUser()
  const [borrowingRequests,setBorrowingRequest]=useState({
    loading : true,
    results :[],
    err : null,
    relaod: 0
  })
  useEffect(()=>{
    setBorrowingRequest({...borrowingRequests, loading:true})
    axios.get("http://localhost:4000/admin_borrowing_request",{
      headers:{
        token :auth.token
      }
    })
    .then((res)=>{
      setBorrowingRequest({...borrowingRequests , results: res.data, loading:false})
    })
    .catch((err)=>{
      setBorrowingRequest({...borrowingRequests, loading:false, err :"somthing went wrong"})
    })
  },[borrowingRequests.relaod])

  const acceptRequest=(req_id,book_id)=>{
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: 'http://localhost:4000/admin_borrowing_request/accept',
      headers: { 
        'token': auth.token, 
        'Content-Type': 'application/json'
      },
      data : {
        "req_id":req_id,
        "book_id":book_id
      }
    };
    axios.request(config)
    .then((res) => {
      setBorrowingRequest({...borrowingRequests, loading:false, relaod: borrowingRequests.relaod +1})
    })
    .catch((err) => {});

  }
  const rejectRequest =(req_id)=>{
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: 'http://localhost:4000/admin_borrowing_request/reject',
      headers: { 
        'token': auth.token, 
        'Content-Type': 'application/json'
      },
      data : {
        "req_id":req_id
      }
    };
    
    axios.request(config)
    .then((res) => {
      setBorrowingRequest({...borrowingRequests, loading:false, relaod: borrowingRequests.relaod +1})
    })
    .catch((error) => {});
  }
  return (
    <>
    <div className="title d-flex justify-content-between">
    <h3 className="">Borrowing Requests</h3>
    </div>
    
    <div className='row manageRow'>
      {borrowingRequests.results.map((borrowingRequest)=>(
        <div className='col-3 manageCol' key={borrowingRequest.id}>
        <BorrowingCard
        id={borrowingRequest.id}
        user_id={borrowingRequest.user_id}
        book_id={borrowingRequest.book_id}
        user_name={borrowingRequest.user_name}
        book_name={borrowingRequest.book_name}
        acceptRequest={acceptRequest}
        rejectRequest={rejectRequest}/>
        </div>
      ))}
      
    </div>
    </>
      
  );
}

export default ManageBorrowingRequests;