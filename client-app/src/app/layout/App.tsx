import React, { Fragment, useEffect } from 'react';
import Navmenu from './Navmenu';
import WorkoutDashboard from '../../features/workouts/dashboard/WorkoutDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import WorkoutForm from '../../features/workouts/form/WorkoutForm';
import WorkoutDetails from '../../features/workouts/details/WorkoutDetails';
import Footer from './Footer';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import eventEmitter from '../../features/emitter/eventEmitter';
import ServerError from '../../features/errors/ServerError';


function MainLayout({children}: {children: React.ReactNode}) {
  return (
    <Fragment>
      <Navmenu/>
      <div className="main-layout-children">
        {children}
      </div>
      <Footer />
    </Fragment>
  );
}

function App() {

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = (path: string) => {
      navigate(path);
    };

    eventEmitter.on('redirect', handleRedirect);

    return () => {
      eventEmitter.off('redirect', handleRedirect);
    };
  }, [navigate]);

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/errors' element={<TestErrors/>}/>
        <Route path='/workouts' element={<MainLayout><WorkoutDashboard/></MainLayout>}/>
        <Route path='/workouts/:id' element={<MainLayout><WorkoutDetails/></MainLayout>}/>
        <Route path='/createWorkout' element={<MainLayout><WorkoutForm key={location.key} /></MainLayout>} />
        <Route path='/manage/:id' element={<MainLayout><WorkoutForm key={location.key} /></MainLayout>} />
        <Route path='/server-error' element={<MainLayout><ServerError/></MainLayout>}/>
        <Route path='*' element={<MainLayout><NotFound/></MainLayout>}/>
      </Routes>
    </>
  );
}

export default observer(App);
