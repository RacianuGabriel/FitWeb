import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import icon2 from '../../icon2.svg';
import Button  from 'react-bootstrap/Button';
import WorkoutDetails from '../../features/workouts/details/WorkoutDetails';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

export default observer (function Navmenu() {
    const {workoutStore} = useStore();


	return (
    <>
      <Navbar expand="md" 
              className='bg-primary' 
              data-bs-theme="dark" 
              style={{padding: 10}}
              fixed='top'
              >
          <Container>
            <Navbar.Brand as={NavLink} to="/">
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
              <Nav className="ms-auto">
                <Nav.Link as={NavLink} to="/workouts">Home</Nav.Link>
                <Nav.Link as={NavLink} to="/createWorkout">Create Workout</Nav.Link>
                <Button variant="info">Log in</Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {
          workoutStore.editMode && 
          <WorkoutDetails/>}
      </>
	)
})