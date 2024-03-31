import React, { Fragment } from 'react';
import Navmenu from './Navmenu';
import WorkoutDashboard from '../../features/workouts/dashboard/WorkoutDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import WorkoutForm from '../../features/workouts/form/WorkoutForm';
import WorkoutDetails from '../../features/workouts/details/WorkoutDetails';
import Footer from './Footer';

function MainLayout({children}: {children: React.ReactNode}) {
  return (
    <Fragment>
      <Navmenu/>
      {children}
      <Footer/>
    </Fragment>
  );
}

function App() {

  const location = useLocation();

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/workouts' element={<MainLayout><WorkoutDashboard/></MainLayout>}/>
      <Route path='/workouts/:id' element={<MainLayout><WorkoutDetails/></MainLayout>}/>
      <Route path='/createWorkout' element={<MainLayout><WorkoutForm key={location.key} /></MainLayout>} />
      <Route path='/manage/:id' element={<MainLayout><WorkoutForm key={location.key} /></MainLayout>} />
    </Routes>
  );
}

export default observer(App);
