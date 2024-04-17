import { Form, Formik } from 'formik'
import React from 'react'
import MyTextInput from '../../app/common/form/MyTextInputs'
import { Button, Container, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import icon2 from '../../icon2.svg';

export default function LoginForm() {
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
					initialValues={{email:'', password:''}}
					onSubmit={values => console.log(values)}>
					{({values, handleChange, handleBlur, handleSubmit}) => (
						<Form className='d-flex flex-column justify-content-center align-items-center' onSubmit={handleSubmit} autoComplete='off'>
							<MyTextInput name="email" placeholder="Enter Email"  />
							<MyTextInput name="password" placeholder="Enter Password"  type="password"/>
							<Button className='m-4' variant="success" type="submit">
										Submit
							</Button>
						</Form>
					)}
				</Formik>
			</Container>
		</>
	)
}