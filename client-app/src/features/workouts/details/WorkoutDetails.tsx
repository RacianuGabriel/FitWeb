import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import WorkoutImage from '../../../workoutImg.jpg';
import {  ButtonGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import WorkoutForm from '../form/WorkoutForm';

export default observer(function ActivityDetails() {
	const {workoutStore} = useStore();
	const {selectedWorkout, editMode, closeForm, 
		openForm, cancelSelectedWorkout, submitting, deleteWorkout} = workoutStore;


	return (
		<Offcanvas show='true' onHide={() => {
			cancelSelectedWorkout();
			closeForm();
			}}>
			<Offcanvas.Header closeButton>
			<Offcanvas.Title>Sidebar</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body className='text-center'>
				{selectedWorkout && !editMode &&
					<Card className="bg-primary text-white">
						<Card.Img variant="top" src={WorkoutImage} />
						<Card.Title>{selectedWorkout.title}</Card.Title>
						<Card.Body>
							<h5>{selectedWorkout.description}</h5>
							<p>{selectedWorkout.category}</p>
							<h6>{selectedWorkout.date}</h6>
							<ButtonGroup className='w-100'>
								<Button variant='success' onClick={() => openForm(selectedWorkout.id)}>Edit</Button>
								<Button variant='danger' onClick={() => deleteWorkout(selectedWorkout.id)}>
								{submitting ? (
									<>
									<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
									<span className="visually-hidden">Loading...</span>
									</>
								) : (
									'Delete'
								)}
								</Button>
							</ButtonGroup>
						</Card.Body>
					</Card>
				}
				{editMode === true &&
				<WorkoutForm/>
				}
			</Offcanvas.Body>
		</Offcanvas>
	)
}
)