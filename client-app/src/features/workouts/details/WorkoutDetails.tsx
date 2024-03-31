import React, { useEffect, useState} from 'react';
import WorkoutImage from '../../../workout.webp';
import Button from 'react-bootstrap/Button';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { ButtonGroup, Container} from 'react-bootstrap';
import RoundList from './RoundList';
import WorkoutComments from './comments/WorkoutComments';

export default observer(function ActivityDetails() {
	const {workoutStore} = useStore();
	const {selectedWorkout,loadWorkout,loadingInitial} = workoutStore;

	const {id} =useParams<{id: string}>();

	const [selectComments, setSelectComments] = useState(false);

	useEffect(() => {
		if (id) loadWorkout(id);
	}, [id, loadWorkout]);

	if (loadingInitial || !selectedWorkout) return <LoadingComponent content="Loading ..."/>;

	return (
		<div className='relative'>
			<Container fluid 
					   style={{
						height:'400px',
						backgroundImage: `url(${WorkoutImage})`,
						}}
					   className='image-background d-flex align-items-end justify-content-evenly'>
				<Container className='text-white relative image-content'>
					<p>{selectedWorkout.date}</p>
					<h4 className="text-white">{selectedWorkout.title}</h4>
					<p>Likes  Comments</p>
					<ButtonGroup className="d-flex justify-content-evenly">
					<Button 
						className={`btn btn-link text-white btn-sm flex-grow-1 `}
						onClick={() => setSelectComments(false)}
					>
						Workout
					</Button>
					<Button 
						className={`btn btn-link text-white btn-sm flex-grow-1 `}
						onClick={() => setSelectComments(true)}
					>
						Comments
					</Button>
					</ButtonGroup>
				</Container>
			</Container>
			<Container fluid className='Jumbotron relative bg-light pb-5'>
				{selectComments ? (
					<WorkoutComments/>
				) : (
					<>
						<RoundList/>
						<RoundList/>
						<RoundList/>
					</>
				)}
			</Container>
		</div>
	)
}
)