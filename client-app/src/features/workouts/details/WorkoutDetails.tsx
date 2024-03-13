import react from 'react';
import { Workout } from '../../../app/models/workout';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import WorkoutImage from '../../../workoutImg.jpg';
import {  Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


interface Props {
	selectedWorkout: Workout;
	cancelSelectedWorkout: () => void;
}



export default function ActivityDetails({cancelSelectedWorkout,selectedWorkout}: Props) {
	return (
		<>
			{ selectedWorkout &&
			<Offcanvas show='true' onHide={cancelSelectedWorkout}>
				<Offcanvas.Header closeButton>
				<Offcanvas.Title>{selectedWorkout.title}</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body className='text-center'>
					<Card className='bg-success'>
						<Card.Img variant="top" src={WorkoutImage} />
						<Card.Title>{selectedWorkout.title}</Card.Title>
						<Card.Text>
							<h5>{selectedWorkout.description}</h5>
							<p>{selectedWorkout.category}</p>
							<h6>{selectedWorkout.date}</h6>
							<Container>
								<Row>
									<Col>
										<Button>Start</Button>
									</Col>
									<Col>
										<Button>Stop</Button>
									</Col>
								</Row>
							</Container>
						</Card.Text>
					</Card>
				</Offcanvas.Body>
			</Offcanvas>
			}
		</>
	)
}