import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import icon2 from './icon2.svg';

function App() {
  const [workouts, setWorkouts] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/workouts')
      .then(response => {
        console.log(response);
        setWorkouts(response.data);
      }); 
  }, [])

  return (
    <div>
      <Navbar expand="lg" className='bg-primary' data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={icon2}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="FitWeb"
            />
            FitWeb
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ListGroup>
          {workouts.map(workout => (
              <ListGroup.Item key={workout.id}>
                {workout.title}
              </ListGroup.Item>
              ))} 
      </ListGroup>
    </div>
  );
}

export default App;
