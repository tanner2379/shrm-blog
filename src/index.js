import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureSessionsStore from './hooks-store/sessions-store';

import './assets/fonts/CrimsonText-Bold.ttf';
import './assets/fonts/CrimsonText-BoldItalic.ttf';
import './assets/fonts/CrimsonText-Italic.ttf';
import './assets/fonts/CrimsonText-Regular.ttf';
import './assets/fonts/CrimsonText-SemiBold.ttf';
import './assets/fonts/CrimsonText-SemiBoldItalic.ttf';


require('dotenv').config();

configureSessionsStore();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
