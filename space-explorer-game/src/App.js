import React, { useState } from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import CharacterSelection from './CharacterSelection'; import './App.css';
import './index.css';
import { useNavigate } from 'react-router-dom';

function App() {

  const stars = [...Array(1000)].map((_, i) => {
    const style = {
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      width: `${Math.random() * 2}px`,
      height: `${Math.random() * 2}px`,
      animationDelay: `${Math.random() * 2}s`,
    };
    return <div key={i} className="star absolute bg-white rounded-full" style={style} />;
  });

  const shootingStars = [...Array(10)].map((_, i) => {
    const style = {
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      animationDuration: `${2 + Math.random() * 3}s`,
      animationDelay: `${Math.random() * 5}s`,
    };
    return <div key={i} className="shooting-star" style={style} />;
  });


  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('Button clicked');
    setAnimate(true);

    setTimeout(() => {
      navigate('/character-selection');
    }, 2000); // Adjust this delay to match the duration of your animation
  };

  return (
    <main className="relative w-screen h-screen bg-gradient-to-b from-[#2b2b4e] via-[#000033] to-[#2b2b4e] overflow-hidden">
      {stars}
      {shootingStars}

      <div className='absolute w-full h-full flex items-center justify-center'>
        <div className="flex flex-col items-center justify-center text-center">
          <button onClick={handleClick} className="focus:outline-none">
            <img
              className={`mx-auto ${animate ? 'animate-rocket' : ''}`}
              src='./rocket.svg'
              alt='rocket'
              style={{ zIndex: 10, position: 'relative' }}
            />
          </button>
          <h1 className='text-6xl text-white font-bold'>Stellar Scholars</h1>

          <p className='text-white tracking-wide text-sm mt-4'>
            Click the rocket to launch!
          </p>

        </div>
      </div>

    </main>
  );
}

export default App;
