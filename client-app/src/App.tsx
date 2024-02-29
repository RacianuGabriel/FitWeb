import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const [workouts, setWorkouts] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/workouts')
      .then(response => {
        console.log(response);
        setWorkouts(response.data);
      }); 
  }, [])

  return (
    <div>
      <Container>
          {workouts.map(workout => (
              <Row key={workout.id}>
                <Col>
                  {workout.title}
                </Col>
              </Row>
              ))} 
      </Container>
    </div>
  );
}

export default App;
