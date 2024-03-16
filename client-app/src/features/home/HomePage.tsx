import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function HomePage() {
	return (
		<Container style={{marginTop: '7em'}}>
			<h1>Home page</h1>
			<h3>Go to <Link to='/workouts'>workouts</Link></h3>
		</Container>
	)
}