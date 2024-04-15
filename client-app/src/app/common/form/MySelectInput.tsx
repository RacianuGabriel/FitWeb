import { useField } from 'formik';
import React from 'react';

interface Props {
	placeholder: string;
	name: string;
	options: any;
	label?: string;
}

export default function MySelectInput(props: Props) {
	const [field, meta, helpers] = useField(props.name);


	return (
		<div className="form-group mt-3">
			<label htmlFor={props.name}>{props.label}</label>
			<select 
				className="form-control"
				{...field}
				{...props}
				onChange={(e) => helpers.setValue(e.target.value)}
			>
				<option value="">Select a category</option>
				{props.options.map((option: any) => (
					<option key={option.value} value={option.value}>
						{option.key}
					</option>
				))}
			</select>
			{meta.touched && meta.error ? (
				<div className="text-danger">{meta.error}</div>
			) : null}
		</div>
	)
}