import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {canvas} from './SolarSystem/solarSystem';
import reportWebVitals from './reportWebVitals';

document.body.appendChild(canvas);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  </React.StrictMode>
);


reportWebVitals();
