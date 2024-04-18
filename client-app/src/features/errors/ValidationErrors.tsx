import React from 'react'

interface Props {
	errors: any;
}

export default function ValidationErrors({errors}: Props) {
	return (
		<div>
			<ul>
				{errors.map((err: any, i: any) => (
					<li key={i} className="text-danger">{err}</li>
				))}
			</ul>
		</div>
	)
}