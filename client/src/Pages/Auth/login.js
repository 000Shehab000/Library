import React, { useState } from "react"
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import '../../Style/Auth.css'
import axios from "axios";

const localStorage= require("../../helper/Local_storage")

const Login=()=> {
    const navigate =useNavigate();
    const [login,setLogin]=useState({
        email: "",
        password: "",
        loading: false,
        err : []
    })
    
    const loginFunction=(e)=>{
        e.preventDefault(); // prevent refreshing the page
        setLogin({...login, loading:true})
        axios.post("http://localhost:4000/auth/login",{
            email: login.email,
            password: login.password
        })
        .then((res)=>{
            setLogin({...login, loading:false})
            localStorage.setAuthUser(res.data)
            const auth = localStorage.getAuthUser()
            if(auth.role_id===1){
                navigate("/manageBooks")
            }else{
                navigate("/");
            }
        })
        .catch((err)=>{
            setLogin({...login, loading:false, err: err.response.data.errors})
        })
    }
    return (
        <div className="login-container">
            <h2 className="loginText">Sign in to your account.</h2>
            <p className="loginText">Doesn't have account yet?
            <Link className="signUpButton"to={"/signUp"}>Sign up</Link></p>

            <Form onSubmit={loginFunction}>
            {login.err.map((errors)=>(
                <Alert key={'danger'} variant={'danger'}>
                {errors.msg}
                </Alert>
            ))}
            <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
            >
                <Form.Control 
                className="loginText" 
                type="email" 
                placeholder="name@example.com" 
                required
                value={login.email} 
                onChange={(e)=>setLogin({...login, email:e.target.value})} />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control 
                type="password" 
                placeholder="Password"
                required
                value={login.password} 
                onChange={(e)=>setLogin({...login, password:e.target.value})} />
            </FloatingLabel>

            <Button 
            className="loginButton" 
            variant="light" 
            type="submit" 
            disabled={login.loading === true}>
                Sign In 
            </Button>

            <Link className="forgotPassword"to={"#forgot your password"}>Forgot your password?</Link>
            </Form>
        </div>
    );
}

export default Login;