import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
      <Carousel>
        <Carousel.Item style={{ height: '100vh' }}>
          <div
            className='image-background d-flex align-items-center justify-content-center'
			      style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/fitness1.jpg'})` }}
          ></div>
          <Carousel.Caption>
			<h3 className='text-white'>Welcome to Our Fitness Site</h3>
			<p>Start your journey towards a healthier, more active lifestyle.</p>
			<Link to="/" type="button" className="btn btn-primary">
				Go to Home
			</Link>
          </Carousel.Caption>
        </Carousel.Item>
		<Carousel.Item style={{ height: '100vh' }}>
          <div
            className='image-background d-flex align-items-center justify-content-center'
			      style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/fitness2.jpg'})` }}
          ></div>
          <Carousel.Caption>
		  	<h3 className='text-white'>Personalized Workouts</h3>
			<p>Find workout plans tailored to your fitness level and goals.</p>
			<Link to="/" type="button" className="btn btn-primary">
				Go to Home
			</Link>
          </Carousel.Caption>
        </Carousel.Item>
		<Carousel.Item style={{ height: '100vh' }}>
          <div
            className='image-background d-flex align-items-center justify-content-center'
			      style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/fitness3.jpg'})` }}
          ></div>
          <Carousel.Caption>
		  	<h3 className='text-white'>Nutrition Guidance</h3>
			<p>Get expert advice on diet and nutrition to complement your workouts.</p>
			<Link to="/" type="button" className="btn btn-primary">
				Go to Home
			</Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
  );
};

export default AboutUs;