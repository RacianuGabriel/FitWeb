import { ErrorMessage, Form, Formik } from 'formik'
import React from 'react'
import MyTextInput from '../../app/common/form/MyTextInputs'
import { Button, Container, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import icon2 from '../../icon2.svg';
import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'
import { error } from 'console'

export default observer (function LoginForm() {
	const {userStore} = useStore();
	return (
		<>
			<Navbar expand="md" 
              className='bg-primary' 
              data-bs-theme="dark" 
              style={{padding: 10}}
              >
				<Navbar.Brand as={NavLink} to="/" className="mx-auto">
				<img
					src={icon2}
					width="30"
					height="30"
					className="d-inline-block align-top"
					alt="FitWeb"
				/>
            </Navbar.Brand>
			</Navbar>
			<Container className="d-flex flex-column justify-content-center align-items-center" style={{height: '100vh'}}>
				<h1>Log in to your account</h1>
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
		</>
	)
})