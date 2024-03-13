
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/container';
import { Workout } from '../../../app/models/workout';
import WorkoutCard from './WorkoutCard';
import WorkoutJumbotron from './WorkoutJumbotron';
import WorkoutDetails from '../details/WorkoutDetails';

interface Props {
	workouts: Workout[];
	selectWorkout: (id: string) => void;
	selectedWorkout: Workout | null;
	cancelSelectWorkout: () => void;
}

export default function WorkoutDashboard({workouts,selectWorkout,
	selectedWorkout,cancelSelectWorkout}: Props) {
	  return (
		<>
			<WorkoutJumbotron/>
			<Container className='container-lg-custom'>
				<h2 className='text-center'>Beginner</h2>
				<Row>
					{
						workouts.map(workout => (
							<Col key={workout.id} md={4} sm={6} xs={12} >
								<WorkoutCard workout={workout} selectWorkout={selectWorkout}/>
							</Col>
						))
					} 
				</Row>
				{selectedWorkout &&
				<WorkoutDetails selectedWorkout={selectedWorkout} cancelSelectedWorkout={cancelSelectWorkout}/>}
			</Container>
		</>
  );
}