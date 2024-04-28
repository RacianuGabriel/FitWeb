import React from 'react';
import { Workout } from '../../app/models/workout';
import WorkoutCard from '../workouts/dashboard/WorkoutCard';

interface Props {
	workouts: Workout[];
}

export default function ProfileLiked({workouts}: Props) {
	return (
		<div className="photos">
			{
				workouts.map(workout => (
					<WorkoutCard workout={workout}/>
				))
			}
		</div>
	)
}