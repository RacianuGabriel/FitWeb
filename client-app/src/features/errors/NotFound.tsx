import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NotFound(){
	return (
		<Container 
            className="jumbotron large-container"
            style={{marginTop: '90px'}}>
            <Row className="justify-content-md-center text-center">
                <Col md="auto">
                    <h1>Oops - we've looked everywhere and could not find this.</h1>
                </Col>
            </Row>
            <Row className="justify-content-md-center text-center">
                <Col md="auto">
                    <Link className="btn btn-primary" to="/workouts">Return to first page</Link>
                </Col>
            </Row>
        </Container>
	);
}