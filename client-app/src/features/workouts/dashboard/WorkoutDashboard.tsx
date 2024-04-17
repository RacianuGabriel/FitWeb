
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/container';
import WorkoutCard from './WorkoutCard';
import WorkoutJumbotron from './WorkoutJumbotron';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useEffect } from 'react';

export default observer(function WorkoutDashboard() {
	
	
	const {workoutStore} = useStore();
	const {workoutsByDate, workoutsByDifficulty, groupedWorkouts, loadWorkouts,loadingInitial} = workoutStore;
	
	useEffect(() => {
		loadWorkouts();
	}, [loadWorkouts]);


	if (loadingInitial) return <LoadingComponent content='Loading workouts...'/>
	
	return (
		<>
			<WorkoutJumbotron/>
			{
				groupedWorkouts.map(([difficulty, workouts]) => (
					<Container key={difficulty} className='p-5 container-lg-custom'>
						<h2 className='text-center'>{difficulty}</h2>
						<Row>
							{
								workouts.map(workout => (
									<Col key={workout.id} md={4} sm={6} xs={12} >
										<WorkoutCard workout={workout}/>
									</Col>
								))
							} 
						</Row>
					</Container>
				))
			}
		</>
  );
})