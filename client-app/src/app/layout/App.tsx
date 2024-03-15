import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Navmenu from './Navmenu';
import { Workout } from '../models/workout';
import WorkoutDashboard from '../../features/workouts/dashboard/WorkoutDashboard';
import { v4 as uuid } from 'uuid';

function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [editMode, setEditMode] = useState(false);

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

  function handleFormOpen(id?: string) {
    id ? handleSelectWorkout(id) : handleCancelSelectWorkout();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditWorkout(workout: Workout) {
    workout.id ? setWorkouts([...workouts.filter(x => x.id !== workout.id), workout]) 
    : setWorkouts([...workouts, {...workout, id: uuid()}]);
    setEditMode(false);
    setSelectedWorkout(workout);
  }

  function handleDeleteWorkout(id: string) {
    setWorkouts([...workouts.filter(x => x.id !== id)]);
    setSelectedWorkout(null);
  }

  return (
    <Fragment>
      <Navmenu 
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        selectedWorkout={selectedWorkout}
        cancelSelectWorkout={handleCancelSelectWorkout}
        editOrCreateWorkout={handleCreateOrEditWorkout}
        deleteWorkout={handleDeleteWorkout}
      />
      <WorkoutDashboard 
        workouts={workouts}
        selectWorkout={handleSelectWorkout}
        selectedWorkout={selectedWorkout}
        cancelSelectWorkout={handleCancelSelectWorkout}
        closeForm={handleFormClose}
        openForm={handleFormOpen}
        editMode={editMode}
        editOrCreateWorkout={handleCreateOrEditWorkout}
        deleteWorkout={handleDeleteWorkout}
      />
    </Fragment>
  );
}

export default App;
