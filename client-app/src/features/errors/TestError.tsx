import React, { useState } from 'react';
import {Button, ButtonGroup} from "react-bootstrap";
import axios from 'axios';
import ValidationErrors from './ValidationErrors';

export default function TestErrors() {
    const baseUrl = process.env.REACT_APP_API_URL;
    const [errors, setErrors] = useState(null);


    function handleNotFound() {
        axios.get(baseUrl + 'buggy/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + 'buggy/bad-request').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get(baseUrl + 'buggy/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorised() {
        axios.get(baseUrl + 'buggy/unauthorised').catch(err => console.log(err.response));
    }

    function handleBadGuid() {
        axios.get(baseUrl + 'workouts/notaguid').catch(err => console.log(err.response));
    }

    function handleValidationError() {
        axios.post(baseUrl + 'workouts', {}).catch(err => {setErrors(err)});
    }

    return (
        <>
            <h1 >Test Error component</h1>
            <div>
                <ButtonGroup>
                    <Button onClick={handleNotFound}>Not Found</Button>
                    <Button onClick={handleBadRequest} >Bad Request</Button>
                    <Button onClick={handleValidationError}>Validation Error</Button>
                    <Button onClick={handleServerError}>Server Error</Button>
                    <Button onClick={handleUnauthorised} >Unauthorised</Button>
                    <Button onClick={handleBadGuid} >Bad Guid</Button>
                </ButtonGroup>
                {errors &&
                <ValidationErrors errors={errors} />
                }
            </div>
        </>
    )
}
