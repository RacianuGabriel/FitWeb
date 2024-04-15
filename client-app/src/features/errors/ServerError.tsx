import React from 'react'
import { useStore } from '../../app/stores/store';
import { Container } from 'react-bootstrap';

export default function ServerError(){
	const {commonStore} = useStore();

	return (
		<Container className='py-5'>
			<h1>Server Error</h1>
			<h2>{commonStore.error?.message}</h2>
			{commonStore.error?.details && 
				<div>
					<h2>Stack Trace</h2>
					<pre>{commonStore.error.details}</pre>
				</div>
			} 
		</Container>
	)
}