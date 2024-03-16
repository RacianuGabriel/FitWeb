import Card from 'react-bootstrap/Card';
import WorkoutImage from '../../../workoutImg.jpg';
import { Workout } from '../../../app/models/workout';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';


interface Props{
	workout: Workout;
}

export default observer( function WorkoutCard({workout}: Props){
	const {workoutStore} = useStore();
	return (
		<Card style={{margin: '20px 10px'}} onClick={() => workoutStore.selectWorkout(workout.id)}>
			<Card.Img variant="top" src={WorkoutImage}/>
			<Card.ImgOverlay className="d-flex align-items-end">
				<Card.Title className='text-white' >{workout.title}</Card.Title>
			</Card.ImgOverlay>
		</Card>
	)
})