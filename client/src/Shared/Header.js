import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../Style/Header.css'
const localStorage = require("../helper/Local_storage")

const Header =()=> {
    const auth = localStorage.getAuthUser();
    const navigate = useNavigate()
    const signOut =()=>{
        if(auth.role_id===1){
            navigate("/login")
        }else{
            navigate("/")
        }
        localStorage.removeAuthUser()
    }
    return(
        <>
        <Navbar className='Navbar' bg="" variant="">
            <Container className='headerContainer'>
                <h2 className='NavbarLogo navbar-brand'>Library</h2>
                <Nav className="me-auto">
                    <Link className='NavbarText nav-link' to={"/"}>Home</Link>
                    {auth && auth.role_id===2 && (
                    <Link className='NavbarText nav-link' to={"/borrowedBooks/"+auth.id}>My Books</Link>
                    )}
                    {auth && auth.role_id ===1 &&(
                        <NavDropdown className='NavbarText' title="Manage" id="basic-nav-dropdown">
                        <Link className='manageRoutesText nav-link' to={"/manageBooks"}>Books</Link>
                        <Link className='nav-link' to={"/manageBorrowingRequests"}>Borrowing Requests</Link>
                        <Link className='nav-link' to={"/manageUsersAccounts"}>Users Accounts</Link>
                        {/* <NavDropdown.Item href={"/manageBooks"}>Books</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Borrowing Requests</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Users Accounts</NavDropdown.Item> */}
                    </NavDropdown>
                    ) }
                    
                </Nav>

                <Form className="d-flex searchBar">
                <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                />
                <Button className='NavbarText'variant="light">Search</Button>
                </Form>

                <Nav className="ms-auto">
                    {!auth&&(
                    <Link className='NavbarText nav-link' to={"/login"}>Sign in</Link>
                    )}
                    {auth &&(
                    <Nav.Link className='NavbarText nav-link' onClick={signOut} >Sign Out</Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
        </>
    )
};

export default Header ;