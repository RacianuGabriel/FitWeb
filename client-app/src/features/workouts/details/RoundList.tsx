import React from 'react';
import { ListGroup } from 'react-bootstrap';
import WorkoutImage from '../../../workout.webp';


export default function RoundList() {
	return (
		<ListGroup className='mt-5 p-0 mx-auto image-content shadow-lg '>
			<ListGroup.Item><h1>Round 1 - Repeat 3 times</h1></ListGroup.Item>
			<ListGroup.Item>
			<div className='d-flex align-items-center'>
				<img src={WorkoutImage} className='exercise-thumbnail' alt='Not loaded'></img>
				<div className=''>
					<h5>Exercise 1</h5>
					<p>10 reps</p>
				</div>
			</div>
			</ListGroup.Item>
			<ListGroup.Item>
			<div className='d-flex align-items-center'>
				<img src={WorkoutImage} className='exercise-thumbnail' alt='Not loaded'></img>
				<div className=''>
					<h5>Exercise 2</h5>
					<p>55 reps</p>
				</div>
			</div>
			</ListGroup.Item>
			<ListGroup.Item>
			<div className='d-flex align-items-center'>
				<img src={WorkoutImage} className='exercise-thumbnail' alt='Not loaded'></img>
				<div className=''>
					<h5>Exercise 3</h5>
					<p>10 reps</p>
				</div>
			</div>
			</ListGroup.Item>
			<ListGroup.Item>
			<div className='d-flex align-items-center'>
				<img src={WorkoutImage} className='exercise-thumbnail' alt='Not loaded'></img>
				<div className=''>
					<h5>Exercise 4</h5>
					<p>30 sec</p>
				</div>
			</div>
			</ListGroup.Item>
		</ListGroup>
	)
}