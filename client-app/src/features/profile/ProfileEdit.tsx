import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInputs";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import { Button, Spinner } from "react-bootstrap";
import { useState } from "react";

interface Props {
	setActiveTab: (activeTab: string) => void;
}

export default observer(function ProfileEdit({setActiveTab}:Props){
    const { profileStore: { profile, updateProfile } } = useStore();
    return (
        <Formik
            initialValues={{
                displayName: profile?.displayName, 
                bio: profile?.bio || ''
            }}
            onSubmit={values => {
                updateProfile(values).then(() => {
                    setActiveTab('Liked')
                })
            }}
            validationSchema={Yup.object({
                displayName: Yup.string().required()
            })} >
            {({ isSubmitting, isValid, dirty }) => (
                <Form className='ui form'>
                    <MyTextInput
                        placeholder='Display Name'
                        name='displayName' 
                    />
                    <MyTextArea rows={3} placeholder='Add your bio' name='bio' />
                    <Button variant="success" type="submit" disabled={isSubmitting || !isValid || !dirty}>
					{isSubmitting ? (
						<>
						<Spinner animation="border" role="status" size="sm">
							<span className="visually-hidden">Loading...</span>
						</Spinner>
						Updating profile...
						</>
					) : (
						'Update profile'
					)}
					</Button>
                </Form>
            )} 
        </Formik>
    )
})