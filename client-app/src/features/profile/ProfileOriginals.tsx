import React from 'react';
import { Workout } from '../../app/models/workout';
import WorkoutCard from '../workouts/dashboard/WorkoutCard';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';

interface Props {
	workouts: Workout[];
}

export default function ProfileOriginals({workouts}: Props) {
	return (
		<div className="photos">
			{
				workouts.map(workout => (
					<WorkoutCard workout={workout}/>
				))
			}
			<Card style={{margin: '20px 10px'}} as={Link} to={`/createWorkout`}>
				<Card.Img variant="top" src='/assets/workoutImg.jpg'/>
				<Card.ImgOverlay className="d-flex align-items-center justify-content-center">
					<FaPlusCircle size={64}/>
				</Card.ImgOverlay>
			</Card>
		</div>
	)
}