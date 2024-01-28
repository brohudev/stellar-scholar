import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {canvas} from './SolarSystem/solarSystem';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterSelection from './CharacterSelection';

document.body.appendChild(canvas);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
          <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/character-selection" element={<CharacterSelection />} />
      </Routes>
    </Router>
  </React.StrictMode>
);


reportWebVitals();
