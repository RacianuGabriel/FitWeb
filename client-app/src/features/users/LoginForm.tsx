import { ErrorMessage, Form, Formik } from 'formik'
import React from 'react'
import MyTextInput from '../../app/common/form/MyTextInputs'
import { Button, Container } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'
import RegisterForm from './RegisterForm'

export default observer (function LoginForm() {
	const {userStore,modalStore} = useStore();
	return (
		<Container className="d-flex flex-column justify-content-center align-items-center" style={{height: '100vh'}}>
			<h1 className='text-center'>Log in to your account</h1>
			<Formik
				initialValues={{email:'', password:'', error: null}}
				onSubmit={(values, {setErrors}) => userStore.login(values)
				.catch(error => setErrors({error: 'Invalid email or password'}))}>
				{({values,handleSubmit, isSubmitting, errors}) => (
					<Form className='d-flex flex-column justify-content-center align-items-center' onSubmit={handleSubmit} autoComplete='off'>
						<MyTextInput name="email" placeholder="Enter Email" type="email"/>
						<MyTextInput name="password" placeholder="Enter Password"  type="password"/>
						<ErrorMessage name='error' render={() => 
							<div className="text-danger mt-3">{errors.error}</div>
						}/>
						<p className='text-primary mt-3'>Don't have an account? Register 
						<span
							style={{cursor: 'pointer', color: 'black', marginLeft: '3px'}}
							className="cursor-pointer"
							onClick={() => modalStore.openModal(<RegisterForm/>)}> here.</span>
						</p>
						<Button className='m-4' variant="success" type="submit">
							{isSubmitting ? (
								<>
									<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
									<span className="visually-hidden">Loading...</span>
								</>
							) : (
								'Submit'
							)}
						</Button>
					</Form>
				)}
			</Formik>
		</Container>
	)
})