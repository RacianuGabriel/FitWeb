import React, { useEffect, useState} from 'react';
import WorkoutImage from '../../../workout.webp';
import Button from 'react-bootstrap/Button';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { ButtonGroup, Container} from 'react-bootstrap';
import RoundList from './RoundList';
import WorkoutComments from './comments/WorkoutComments';
import { format } from 'date-fns';
import LikesList from './LikesList';
import { FaTrash, FaEdit, FaHeart } from 'react-icons/fa';

export default observer(function ActivityDetails() {
	const {workoutStore} = useStore();
	const {selectedWorkout,loadWorkout,loadingInitial} = workoutStore;
	const {userStore: {user}} = useStore();
	const {modalStore} = useStore();
	const navigate = useNavigate();

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
					<p>{format(selectedWorkout.date!,'dd MMM yyyy h:mm aa')}</p>
					<p>Training by <Link to={`/profile/${selectedWorkout.hostUsername}`} className='text-white text-decoration-none'>{selectedWorkout.hostUsername}</Link></p>
					<h4 className="text-white">{selectedWorkout.title}</h4>
					<div className="d-flex justify-content-between">
						<span 
							style={{cursor: 'pointer'}}
							className="text-white text-decoration-none cursor-pointer"
							onClick={() => modalStore.openModal(<LikesList attendees={selectedWorkout.attendees!}/>)}>
								Likes {workoutStore.attendeesNumber!}
						</span>
						<div>
							{(
								selectedWorkout.isHost || user?.role==="Admin" )&&
							<>
								<Button 
									onClick={() => {
										workoutStore.deleteWorkout(selectedWorkout.id);
										navigate('/workouts');
									}} 
									variant="outline-danger"
									size='sm'
									className="me-2 rounded-pill">
									<FaTrash />
								</Button>
								<Link to={`/manage/${selectedWorkout.id}`}  className="btn btn-sm btn-outline-success me-2 rounded-pill">
									<FaEdit />
								</Link>
							</>
							}
							{
								selectedWorkout.isGoing ?
								<Button 
									variant="danger" 
									size="sm" 
									className="me-2 rounded-pill"
									onClick={workoutStore.updateAttendence}>
									<FaHeart />
								</Button> : <Button 
									variant="outline-primary" 
									size="sm" 
									className="me-2 rounded-pill"
									onClick={workoutStore.updateAttendence}>
									<FaHeart />
								</Button>
							}
						</div>
					</div>
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