
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/container';
import WorkoutCard from './WorkoutCard';
import WorkoutJumbotron from './WorkoutJumbotron';
import WorkoutDetails from '../details/WorkoutDetails';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function WorkoutDashboard() {
	const {workoutStore} = useStore();
	const {workoutsByDate, selectedWorkout} = workoutStore;


	  return (
		<>
			<WorkoutJumbotron/>
			<Container className='container-lg-custom'>
				<h2 className='text-center'>Beginner</h2>
				<Row>
					{
						workoutsByDate.map(workout => (
							<Col key={workout.id} md={4} sm={6} xs={12} >
								<WorkoutCard workout={workout}/>
							</Col>
						))
					} 
				</Row>
				{selectedWorkout &&
				<WorkoutDetails/>}
			</Container>
		</>
  );
})