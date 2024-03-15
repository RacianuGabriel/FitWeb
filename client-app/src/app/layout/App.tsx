import React, { Fragment, useEffect, useState } from 'react';
import Navmenu from './Navmenu';
import { Workout } from '../models/workout';
import WorkoutDashboard from '../../features/workouts/dashboard/WorkoutDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Workouts.list()
      .then(response => {
        let workouts: Workout[] =[];
        response.forEach(workout => {
          workout.date = workout.date.split('T')[0];
          workouts.push(workout);
        })
        setWorkouts(workouts);
        setLoading(false);
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

  function handleCreateOrEditWorkout(event: React.FormEvent, workout: Workout) {
    event.preventDefault();
    setSubmitting(true);
    if(workout.id) {
      agent.Workouts.update(workout).then(() => {
        setWorkouts([...workouts.filter(x => x.id !== workout.id), workout]);
        setSelectedWorkout(workout);
        setEditMode(false);
        setSubmitting(false);
      })
    }
    else {
      workout.id = uuid();
      agent.Workouts.create(workout).then(() => {
        setWorkouts([...workouts, workout]);
        setSelectedWorkout(workout);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteWorkout(id: string) {
    setSubmitting(true);
    agent.Workouts.delete(id).then(() => {
      setWorkouts([...workouts.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }

  //if (loading) return <LoadingComponent content='Loading app'/>

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
        submitting={submitting}
      />
      {loading ? <LoadingComponent content='Loading app'/> : 
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
        submitting={submitting}
      />
      }
    </Fragment>
  );
}

export default App;
