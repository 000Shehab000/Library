import React, { useState } from "react"
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import '../../Style/Auth.css'
import axios from "axios";

const localStorage= require("../../helper/Local_storage")

const SignUp=()=>{
    const navigate = useNavigate()
    const [signUp,setSignUp]=useState({
        email:"",
        password: "",
        name: "",
        phone: "",
        loading: false,
        err :[]
    })
    const signUpFunction=(e)=>{
        e.preventDefault();
        setSignUp({...signUp, loading:true })
        axios.post("http://localhost:4000/auth/signUp",{
            name: signUp.name,
            password: signUp.password,
            email: signUp.email,
            phone: signUp.phone
        })
        .then((res)=>{
            setSignUp({...signUp, loading:false, err: []})
            localStorage.setAuthUser(res.data)
            navigate("/")
        })
        .catch((err)=>{
            setSignUp({...signUp, loading: false, err: err.response.data.errors})
        })
    }

    return (
        <div className="login-container">
            <h2 className="loginText">Create your account.</h2>
            <Form onSubmit={signUpFunction}>
            {signUp.err.map((errors)=>(
                <Alert key={'danger'} variant={'danger'}>
                {errors.msg}
                </Alert>
            ))}
            <FloatingLabel
            controlId="floatingInput"
            label="Full Name"
            className="mb-3"
            >
                <Form.Control 
                type="name" 
                placeholder="Full Name" 
                value={signUp.name}
                onChange={(e)=>setSignUp({...signUp, name:e.target.value})}/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Phone Number">
                <Form.Control 
                type="Phone Number" 
                placeholder="Phone Number"
                value={signUp.phone}
                onChange={(e)=>setSignUp({...signUp, phone:e.target.value})} />
            </FloatingLabel>
            <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
            >
                <Form.Control 
                className="loginText" 
                type="email" 
                placeholder="name@example.com" 
                value={signUp.email}
                onChange={(e)=>setSignUp({...signUp, email:e.target.value})}/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control 
                type="password" 
                placeholder="Password" 
                value={signUp.password}
                onChange={(e)=>setSignUp({...signUp, password:e.target.value})}/>
            </FloatingLabel>
            <Button className="loginButton" variant="light" type="submit">
                Sign Up 
            </Button>
            </Form>
            
        </div>
      );
}

export default SignUp