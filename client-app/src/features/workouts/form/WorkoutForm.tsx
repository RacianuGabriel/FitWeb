import React from "react";
import { Button, ButtonGroup, Container, Form } from "react-bootstrap";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer( function WorkoutForm() {
	const {workoutStore} = useStore();
	const {closeForm, selectedWorkout,submitting,updateWorkout,createWorkout} = workoutStore;



	const initialState = selectedWorkout ?? {
		id: '',
		title: '',
		description: '',
		category: '',
		date: ''
	}

	const [workoutForm, setWorkoutForm] = React.useState(initialState);

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		workoutForm.id ? updateWorkout(workoutForm) : createWorkout(workoutForm);
	}

	function inputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
		const {name, value} = event.target;
		setWorkoutForm({...workoutForm, [name]: value});
	}

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
					<Button onClick={closeForm} variant="danger" type="button" content="Cancel">Cancel</Button>
				</ButtonGroup>
			</Form>
		</Container>;
})