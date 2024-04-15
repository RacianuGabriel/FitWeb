import { useField } from 'formik';
import React from 'react';

interface Props {
	placeholder: string;
	name: string;
	rows: number;
	label?: string;
}

export default function MyTextArea(props: Props) {
	const [field, meta] = useField(props.name);


	return (
		<div className="form-group mt-3">
			<label htmlFor={props.name}>{props.label}</label>
			<textarea 
				className="form-control"
				{...field}
				{...props}
			/>
			{meta.touched && meta.error ? (
				<div className="text-danger">{meta.error}</div>
			) : null}
		</div>
	)
}