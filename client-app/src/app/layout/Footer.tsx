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
            Company name
          </h6>
          <p>
            Here you can use rows and columns to organize your footer content. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit.
          </p>
        </Col>
        <Col md={2} lg={2} xl={2} className="mx-auto mb-4">
          <h6 className="text-white mb-4">
            Products
          </h6>
          <p>
            <Link to="/angular" className="text-reset">Angular</Link>
          </p>
          <p>
            <Link to="/react" className="text-reset">React</Link>
          </p>
          <p>
            <Link to="/vue" className="text-reset">Vue</Link>
          </p>
          <p>
            <Link to="/laravel" className="text-reset">Laravel</Link>
          </p>
        </Col>
        <Col md={3} lg={2} xl={2} className="mx-auto mb-4">
          <h6 className="text-white mb-4">
            Useful links
          </h6>
          <p>
            <Link to="/pricing" className="text-reset">Pricing</Link>
          </p>
          <p>
            <Link to="/settings" className="text-reset">Settings</Link>
          </p>
          <p>
            <Link to="/orders" className="text-reset">Orders</Link>
          </p>
          <p>
            <Link to="/help" className="text-reset">Help</Link>
          </p>
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
  <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
    © 2021 Copyright:
    <Link className="text-reset" to="https://mdbootstrap.com/">MDBootstrap.com</Link>
  </div>
</footer>
	)
}