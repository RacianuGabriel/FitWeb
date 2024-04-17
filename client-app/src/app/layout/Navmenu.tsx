import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import icon2 from '../../icon2.svg';
import Button  from 'react-bootstrap/Button';
import WorkoutDetails from '../../features/workouts/details/WorkoutDetails';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { FaCaretDown } from 'react-icons/fa';

export default observer (function Navmenu() {
  const {workoutStore} = useStore();
  const {userStore: {user, logout, isLoggedIn}} = useStore();

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
                <Nav.Link as={NavLink} to="/errors">Errors</Nav.Link>
                { isLoggedIn ? (
                  <>
                    
                    <Dropdown>
                      <Dropdown.Toggle 
                        variant="outline-info"
                        size="sm">
                          <Image 
                            src={user?.image || '/assets/user.png'} 
                            roundedCircle width='25' height='25'
                            style={{margin: '0 10px 0 0'}} />
                          {user?.username}
                        </Dropdown.Toggle>

                      <Dropdown.Menu>
                          <Dropdown.Item as={Link} to={`/profile/${user?.username}`}>Profile</Dropdown.Item>
                          <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                ) : (
                  <Link to="/login" className='btn btn-info'>Log in</Link>
                )
                }
                
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