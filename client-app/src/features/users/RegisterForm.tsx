import { ErrorMessage, Form, Formik } from 'formik'
import React from 'react'
import MyTextInput from '../../app/common/form/MyTextInputs'
import { Button, Container } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'
import * as Yup from 'yup'
import ValidationErrors from '../errors/ValidationErrors'

export default observer (function RegisterForm() {
	const {userStore} = useStore();
	return (
		<Container className="d-flex flex-column justify-content-center align-items-center" style={{height: '100vh'}}>
			<h1 className='text-center'>Register a new account</h1>
			<Formik
				initialValues={{displayName: '', username: '', email:'', password:'', error: null}}
				onSubmit={(values, {setErrors}) => userStore.register(values)
				.catch(error => setErrors({error}))}
				validationSchema={Yup.object({
					displayName: Yup.string().required('Display Name is required'),
					username: Yup.string().required('Username is required'),
					email: Yup.string().required('Email is required').email('Invalid email'),
					password: Yup.string().required('Password is required')
				})}
				>
				{({values,handleSubmit, isSubmitting, errors, isValid, dirty}) => (
					<Form className='d-flex flex-column justify-content-center align-items-center error' onSubmit={handleSubmit} autoComplete='off'>
						<MyTextInput name="displayName" placeholder="Enter Display Name"/>
						<MyTextInput name="username" placeholder="Enter Username"/>
						<MyTextInput name="email" placeholder="Enter Email"/>
						<MyTextInput name="password" placeholder="Enter Password"  type="password"/>
						<ErrorMessage name='error' render={() => 
							<ValidationErrors errors={errors.error}/>
						}/>
						<Button 
							className='m-4' 
							variant="success" 
							type="submit"
							disabled={!isValid || !dirty || isSubmitting}
						>
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