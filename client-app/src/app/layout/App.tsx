import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Navmenu from './Navmenu';
import { Workout } from '../models/workout';

function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    axios.get<Workout[]>('http://localhost:5000/api/workouts')
      .then(response => {
        setWorkouts(response.data);
      }); 
  }, [])

  return (
    <Fragment>
      <Navmenu />``
      <ListGroup>
          {workouts.map(workout => (
              <ListGroup.Item key={workout.id}>
                {workout.title}
              </ListGroup.Item>
              ))} 
      </ListGroup>
    </Fragment>
  );
}

export default App;
