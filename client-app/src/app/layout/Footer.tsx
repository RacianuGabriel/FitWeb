import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaGithub, FaEnvelope, FaHome, FaPhone, FaPrint } from 'react-icons/fa';
import { Link } from 'react-router-dom';


export default function Footer() {
	return (
		
<footer data-bs-theme="dark" className="text-center text-lg-start bg-body-tertiary text-muted">
  <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
    <div className="me-5 d-none d-lg-block">
      <span>Get connected with us on social networks:</span>
    </div>
    <div>
      <Link className="me-4 text-reset" to="/">
        <FaFacebookF />
      </Link>
      <Link className="me-4 text-reset" to="/">
        <FaTwitter />
      </Link>
      <Link className="me-4 text-reset" to="/">
        <FaGoogle />
      </Link>
      <Link className="me-4 text-reset" to="/">
        <FaInstagram />
      </Link>
      <Link className="me-4 text-reset" to="/">
        <FaLinkedinIn />
      </Link>
      <Link className="me-4 text-reset" to="/">
        <FaGithub />
      </Link>
    </div>
  </section>
  <section className="">
    <Container className="text-center text-md-start mt-5">
      <Row className="mt-3">
        <Col md={3} lg={4} xl={3} className="mx-auto mb-4">
          <h6 className="text-white mb-4">
            FitWeb
          </h6>
          <p>
          Explore our diverse range of services and products. 
          Committed to delivering excellence and value, we strive to improve your experience.
          </p>
        </Col>
        <Col md={5} lg={4} xl={4} className="mx-auto mb-4">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.729963233502!2d26.08382851175372!3d44.41818667095553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff0b54881f97%3A0xae84d2f47f65a3a7!2sAcademia%20Tehnic%C4%83%20Militar%C4%83%20Ferdinand%20I!5e0!3m2!1sro!2sro!4v1714330704247!5m2!1sro!2sro" 
          style={{border: '0'}} 
          allowFullScreen 
          className='w-100 h-100'
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        </Col>
        <Col md={4} lg={3} xl={3} className="mx-auto mb-md-0 mb-4">
          <h6 className="text-white mb-4">Contact</h6>
          <p><FaHome className="me-3" /> New York, NY 10012, US</p>
          <p>
            <FaEnvelope className="me-3" />
            info@example.com
          </p>
          <p><FaPhone className="me-3" /> + 01 234 567 88</p>
          <p><FaPrint className="me-3" /> + 01 234 567 89</p>
        </Col>
      </Row>
    </Container>
  </section>
</footer>
	)
}