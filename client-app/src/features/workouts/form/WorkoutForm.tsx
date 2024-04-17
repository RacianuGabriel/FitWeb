import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {v4 as uuid} from 'uuid';
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInputs";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import { difficultyOptions } from "../../../app/common/options/difficultyOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Workout } from "../../../app/models/workout";

export default observer( function WorkoutForm() {
	const {workoutStore} = useStore();
	const { loadWorkout,updateWorkout,
		createWorkout,loadingInitial} = workoutStore;
	const navigate = useNavigate();

	const {id} = useParams<{id: string}>();

	const [workout, setWorkout] =useState({
		id: '',
		title: '',
		description: '',
		category: '',
		date: new Date(),
		difficulty: ''
	});

	const validationSchema = Yup.object({
		title: Yup.string().required('Title is required'),
		description: Yup.string().required('Description is required'),
		category: Yup.string().required('Category is required'),
		date: Yup.string().required('Date is required'),
		difficulty: Yup.string().required('Difficulty is required')
	});
	
	useEffect(() => {
		if (id) {
			loadWorkout(id).then(workout => setWorkout(workout!));
		}
	},[id,loadWorkout])

	function handleFormSubmit(workout: Workout) {
		if(workout.id.length === 0){
			let newWorkout = {
				...workout,
				id: uuid()
			};
			console.log(newWorkout);
			createWorkout(newWorkout).then((response) => {
				if(!response)
					navigate(`/workouts/${newWorkout.id}`)
			});
		} else {
			updateWorkout(workout).then((response) => {
				if(!response)
					navigate(`/workouts/${workout.id}`)
			});
		}
		 
	}

	if (loadingInitial) return <LoadingComponent content="Loading ..."/>;

  	return <Container className="my-5 p-3 border bg-primary text-white rounded">
			<Formik
			 validationSchema={validationSchema}
			 enableReinitialize 
			 initialValues={workout} 
			 onSubmit={values => handleFormSubmit(values)}>
				{({handleSubmit, isSubmitting, isValid,dirty}) => (
					<Form autoComplete="off" onSubmit={handleSubmit}>
						<MyTextInput name="title" placeholder="Enter title" label="Title" />
						<MyTextArea rows={5} name="description" placeholder="Enter description" label="Description" />
						<MySelectInput name="category" placeholder="Enter category" label="Category" options={categoryOptions} />
						<MySelectInput name="difficulty" placeholder="Enter difficulty" label="Difficulty" options={difficultyOptions} />
						<MyDateInput 
							name="date" 
							placeholderText="Enter date" 
							showTimeSelect 
							timeCaption='time'
							dateFormat='MMMM d, yyyy h:mm aa'/>
						<ButtonGroup className="w-100 mt-4">
							<Button variant="success" type="submit" disabled={isSubmitting || !dirty || !isValid}>
								{isSubmitting ? (
									<>
										<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
										<span className="visually-hidden">Loading...</span>
									</>
								) : (
									'Submit'
								)}
							</Button>
							<Link to='/workouts' className="btn btn-danger">Cancel</Link>
						</ButtonGroup>
				  </Form>)}
			</Formik>
			
		</Container>;
})