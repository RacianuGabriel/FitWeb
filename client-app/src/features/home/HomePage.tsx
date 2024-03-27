import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function HomePage() {
	return (
		<div className='image-background d-flex align-items-center justify-content-center '>
			<Container className="image-content text-center text-white">
				<h6 className="text-white">
					<Link to='/' className="text-white text-decoration-none">Sign up</Link>
					 - 
					<Link to='/' className="text-white text-decoration-none">Log in</Link>
				</h6>
				<h1 className="text-white">Welcome to FitWeb</h1>
				<p>Your journey to fitness begins here. Sign up, log in, and unlock a world of premium workout plans tailored to your goals.</p>
				<Link to='/workouts' 
					  className="btn btn-primary"
					  style={{margin: '0.5rem 1rem'}}>Start Training</Link>
				<Link to='/' className="btn btn-secondary">Learn More</Link>
			</Container>
		</div>
	)
}