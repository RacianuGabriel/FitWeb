import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import WorkoutImage from '../../../workoutImg.jpg';
import Button from 'react-bootstrap/Button';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Link } from 'react-router-dom';

export default observer(function ActivityDetails() {
	const {workoutStore} = useStore();
	const {selectedWorkout,submitting,
		deleteWorkout,loadWorkout,loadingInitial} = workoutStore;

	const {id} =useParams<{id: string}>();

	useEffect(() => {
		if (id) loadWorkout(id);
	}, [id, loadWorkout]);

	if (loadingInitial || !selectedWorkout) return <LoadingComponent content="Loading ..."/>;

	return (
		<Card>
			<Card.Img variant="top" src={WorkoutImage} />
			<Card.Title>{selectedWorkout.title}</Card.Title>
			<Card.Body>
				<h5>{selectedWorkout.description}</h5>
				<p>{selectedWorkout.category}</p>
				<h6>{selectedWorkout.date}</h6>
				<Link to={`/manage/${selectedWorkout.id}`}>
					<Button variant='success' >Edit</Button>
				</Link>
				<Link to="/workouts">
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
				</Link>
			</Card.Body>
		</Card>
	)
}
)