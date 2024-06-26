import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootswatch/dist/lux/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.min.css';
import './app/layout/styles.css';
import './app/layout/profileStyles.css';
import 'react-datepicker/dist/react-datepicker.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { StoreContext, store } from './app/stores/store';
import { BrowserRouter } from 'react-router-dom';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </StoreContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
