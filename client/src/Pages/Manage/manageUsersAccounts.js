import React from 'react';
import '../../Style/Manage.css'
import AccountCard from '../../Components/accountCard.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

const localStorage = require("../../helper/Local_storage")

const ManageUsersAccounts =()=>{
    const auth = localStorage.getAuthUser();
    const [accounts,setAccounts]=useState({
      loading :true,
      results:[],
      err: null,
      reload : 0 
    })
    useEffect(()=>{
      setAccounts({...accounts, loading:true, err:null})
      axios.get("http://localhost:4000/users_accounts",{
        headers : {
          token : auth.token,
        }
      })
      .then((res)=>{
        setAccounts({...accounts, results:res.data, loading:false, err:null})
        console.log(res);
      })
      .catch((err)=>{
        setAccounts({...accounts, loading:false, err:"somthing went wrong !!!"})
      })
    },[accounts.reload])

    const approveAccount=(id)=>{
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:4000/users_accounts',
      headers: { 
        'token': auth.token, 
        'Content-Type': 'application/json'
      },
      data : {
        "user_id" : id
      }
    };
    axios.request(config)
    .then((res) => {
      setAccounts({...accounts, reload: accounts.reload +1})
    })
    .catch((err) => {});
    }

    const deleteAccount =(id)=>{
      axios.delete("http://localhost:4000/users_accounts/" + id, {
        headers:{
          token : auth.token
        }
      })
      .then((res)=>{
        setAccounts({...accounts, reload: accounts.reload +1})
      })
      .catch((err)=>{})
    }
    return (
        <>
        <div className="title d-flex justify-content-between">
        <h3 className="">Users Accounts</h3>
        </div>

          <div className='row manageRow'>
          {accounts.results.map((account)=>(
            <div className='col-3 manageCol' key={account.id}>
            <AccountCard
            id ={account.id}
            name={account.name}
            email={account.email}
            phone={account.phone}
            approveAccount={approveAccount}
            deleteAccount={deleteAccount}
            />
          </div>
          ))}
        </div>
        </>
      );
}

export default ManageUsersAccounts;