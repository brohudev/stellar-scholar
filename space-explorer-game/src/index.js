import React from 'react';
import ReactDOM from 'react-dom/client';
import './App/index.css';
import App from './App/App';
import { canvas } from './SolarSystem/solarSystem';
import ChatButton from './aichat/chatbutton';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {CharacterSelection} from './App/CharacterSelection';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/character-selection" element={<CharacterSelection />} />
        <Route path="/game-start" element={<ChatButton canvas={canvas}/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);


reportWebVitals();
