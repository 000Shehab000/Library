import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import '../Style/Footer.css'

const Footer=()=> {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <div className='footer'>
      <section className='d-flex justify-content-center  p-2 border-bottom'>
        <div className='me-5 d-none d-lg-block footerText'>
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <a href="https://www.facebook.com" target="">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="">
          <FaTwitter />
          </a>
          <a href="https://www.instagram.com" target="">
          <FaInstagram />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5 footerText'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4' >
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Library
              </h6>
              <p>
                Here you can borrow books
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <Link to={"/"} className='text-reset'>
                  Books
                </Link>
              </p>
            </MDBCol>
            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                Sensi@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4 footerText' style={{ backgroundColor: 'rgba(0, 0, 0, 0.10)' }}>
        © 2023 Copyright: 
        <a className='text-reset fw-bold' href='www.google.com'>
          Sensi.com
        </a>
      </div>

      </div>
      
    </MDBFooter>
  );
}
export default Footer ;