import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import icon2 from '../../icon2.svg';
import Button  from 'react-bootstrap/Button';
import WorkoutDetails from '../../features/workouts/details/WorkoutDetails';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

export default observer (function Navmenu() {
    const {workoutStore} = useStore();


	return (
    <>
      <Navbar expand="md" className='bg-primary' data-bs-theme="dark" style={{padding: 10}}>
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
              <Nav className="ms-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link onClick={() => workoutStore.openForm()}>Create Workout</Nav.Link>
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