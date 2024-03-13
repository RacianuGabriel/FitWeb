import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Navmenu from './Navmenu';
import { Workout } from '../models/workout';
import WorkoutDashboard from '../../features/workouts/dashboard/WorkoutDashboard';

function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    axios.get<Workout[]>('http://localhost:5000/api/workouts')
      .then(response => {
        setWorkouts(response.data);
      }); 
  }, [])

  function handleSelectWorkout(id: string) {
    setSelectedWorkout(workouts.find(x => x.id === id) ?? null);
  }

  function handleCancelSelectWorkout() {
    setSelectedWorkout(null);
  }

  return (
    <Fragment>
      <Navmenu />
      <WorkoutDashboard 
        workouts={workouts}
        selectWorkout={handleSelectWorkout}
        selectedWorkout={selectedWorkout}
        cancelSelectWorkout={handleCancelSelectWorkout}
      />
    </Fragment>
  );
}

export default App;
