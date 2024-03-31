
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
	const {workoutsByDate, loadWorkouts,workoutRegistry,loadingInitial} = workoutStore;
	
	useEffect(() => {
		if(workoutRegistry.size < 2)loadWorkouts();
	}, [workoutRegistry.size, loadWorkouts]);


	if (loadingInitial) return <LoadingComponent content='Loading workouts...'/>
	
	return (
		<>
			<WorkoutJumbotron/>
			<Container className='p-5 container-lg-custom'>
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
			</Container>
			<Container fluid className='p-5 container-lg-custom'>
				<h2 className='text-center'>Intermediar</h2>
				<Row>
					{
						workoutsByDate.map(workout => (
							<Col key={workout.id} md={4} sm={6} xs={12} >
								<WorkoutCard workout={workout}/>
							</Col>
						))
					} 
				</Row>
			</Container>
			<Container className=' p-5 container-lg-custom' >
				<h2 className='text-center'>Advanced</h2>
				<Row>
					{
						workoutsByDate.map(workout => (
							<Col key={workout.id} md={4} sm={6} xs={12} >
								<WorkoutCard workout={workout}/>
							</Col>
						))
					} 
				</Row>
			</Container>
		</>
  );
})