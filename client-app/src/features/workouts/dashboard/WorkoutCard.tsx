import Card from 'react-bootstrap/Card';
import WorkoutImage from '../../../workoutImg.jpg';
import { Workout } from '../../../app/models/workout';


interface Props{
	workout: Workout;
	selectWorkout: (id: string) => void;
}

export default function WorkoutCard({workout, selectWorkout}: Props){
	return (
		<Card style={{margin: '20px 10px'}} onClick={() => selectWorkout(workout.id)}>
			<Card.Img variant="top" src={WorkoutImage}/>
			<Card.ImgOverlay className="d-flex align-items-end">
				<Card.Title className='text-white' >{workout.title}</Card.Title>
			</Card.ImgOverlay>
		</Card>
	)
}