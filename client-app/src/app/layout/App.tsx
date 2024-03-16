import React, { Fragment, useEffect, useState } from 'react';
import Navmenu from './Navmenu';
import WorkoutDashboard from '../../features/workouts/dashboard/WorkoutDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {workoutStore} = useStore();

  useEffect(() => {
    workoutStore.loadWorkouts();
  }, []);

  return (
    <Fragment>
      <Navmenu/>
      {workoutStore.loadingInitial ? <LoadingComponent content='Loading app'/> : 
      <WorkoutDashboard/>
      }
    </Fragment>
  );
}

export default observer(App);
