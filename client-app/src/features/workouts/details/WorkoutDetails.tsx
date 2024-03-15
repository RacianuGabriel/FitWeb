import React from 'react';
import { Workout } from '../../../app/models/workout';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import WorkoutImage from '../../../workoutImg.jpg';
import {  ButtonGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { WorkoutForm } from '../form/WorkoutForm';


interface Props {
	selectedWorkout: Workout | null;
	cancelSelectedWorkout: () => void;
	closeForm: () => void;
	openForm: (id?: string) => void;
	editMode: boolean;
	editOrCreateWorkout: (workout: Workout) => void;
	deleteWorkout: (id: string) => void;
}



export default function ActivityDetails({cancelSelectedWorkout,selectedWorkout,
	editMode,closeForm,openForm,editOrCreateWorkout,deleteWorkout}: Props) {
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
						<Card.Text>
							<h5>{selectedWorkout.description}</h5>
							<p>{selectedWorkout.category}</p>
							<h6>{selectedWorkout.date}</h6>
							<ButtonGroup className='w-100'>
								<Button variant='success' onClick={() => openForm(selectedWorkout.id)}>Edit</Button>
								<Button variant='danger' onClick={() => deleteWorkout(selectedWorkout.id)}>Delete</Button>
							</ButtonGroup>
						</Card.Text>
					</Card>
				}
				{editMode === true &&
				<WorkoutForm
					closeForm={closeForm}
					workout={selectedWorkout}
					editOrCreateWorkout={editOrCreateWorkout}
				/>
				}
			</Offcanvas.Body>
		</Offcanvas>
	)
}