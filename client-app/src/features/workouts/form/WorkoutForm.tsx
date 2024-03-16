import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Container, Form } from "react-bootstrap";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {v4 as uuid} from 'uuid';
import { useNavigate } from "react-router-dom";

export default observer( function WorkoutForm() {
	const {workoutStore} = useStore();
	const { loadWorkout,submitting,updateWorkout,
		createWorkout,loadingInitial} = workoutStore;
	const navigate = useNavigate();

	const {id} = useParams<{id: string}>();

	const [workoutForm, setWorkoutForm] =useState({
		id: '',
		title: '',
		description: '',
		category: '',
		date: ''
	});
	
	useEffect(() => {
		if (id) {
			loadWorkout(id).then(workout => setWorkoutForm(workout!));
		}
	},[id,loadWorkout])

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		if(workoutForm.id.length === 0){
			let newWorkout = {
				...workoutForm,
				id: uuid()
			};
			createWorkout(newWorkout).then(() => navigate(`/workouts/${newWorkout.id}`));
		} else {
			updateWorkout(workoutForm).then(() => navigate(`/workouts/${workoutForm.id}`));
		}
		 
	}

	function inputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
		const {name, value} = event.target;
		setWorkoutForm({...workoutForm, [name]: value});
	}

	if (loadingInitial) return <LoadingComponent content="Loading ..."/>;

  	return <Container fluid className="my-5 p-3 border bg-primary text-white rounded">
			<Form onSubmit={(event) => handleSubmit(event)} autoComplete="off">
				<Form.Group>
					<Form.Label>Title</Form.Label>
					<Form.Control 	type="text" 
									placeholder="Enter title"
									value={workoutForm.title}
									name='title' 
									onChange={inputChange}/>
				</Form.Group>
				<Form.Group className="mt-3">
					<Form.Label>Description</Form.Label>
					<Form.Control 	as="textarea"
									rows={3} 
									placeholder="Enter description"
									value={workoutForm.description}
									name='description' 
									onChange={inputChange} />
				</Form.Group>
				<Form.Group className="mt-3">
					<Form.Label>Category</Form.Label>
					<Form.Control 	as="select"
									value={workoutForm.category}
									name='category' 
									onChange={inputChange}>
						<option>Yoga</option>
						<option>Cardio</option>
						<option>Strength</option>
						<option>Stretching</option>
					</Form.Control>
				</Form.Group>
				<Form.Group className="mt-3">
					<Form.Label>Date</Form.Label>
					<Form.Control type="date" 
								  placeholder="Enter date"
								  value={workoutForm.date}
								  name='date' 
								  onChange={inputChange} />
				</Form.Group>
				<ButtonGroup className="w-100 mt-4">
					<Button variant="success" type="submit">
					{submitting ? (
						<>
						<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
						<span className="visually-hidden">Loading...</span>
						</>
					) : (
						'Submit'
					)}
					</Button>
					<Link to='/workouts'>
						<Button  variant="danger" type="button" content="Cancel">Cancel</Button>
					</Link>
				</ButtonGroup>
			</Form>
		</Container>;
})