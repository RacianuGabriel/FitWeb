import { useField } from 'formik';
import React from 'react';
import DatePicker,{ReactDatePickerProps} from 'react-datepicker';



export default function MyDateInput(props: Partial<ReactDatePickerProps>) {
	const [field, meta,helpers] = useField(props.name!);


	return (
		<div className="form-group mt-3">
			<label htmlFor={props.name}>Date</label>
			<DatePicker 
				className="form-control"
				{...field}
				{...props}
				selected={(field.value && new Date(field.value)) || null}
				onChange={value => helpers.setValue(value)}
			/>
			{meta.touched && meta.error ? (
				<div className="text-danger">{meta.error}</div>
			) : null}
		</div>
	)
}