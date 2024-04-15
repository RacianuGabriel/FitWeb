import React from 'react'

interface Props {
	errors: string[];
}

export default function ValidationErrors({errors}: Props) {
	return (
		<div>
			<ul>
				{errors.map((err, i) => (
					<li key={i}>{err}</li>
				))}
			</ul>
		</div>
	)
}