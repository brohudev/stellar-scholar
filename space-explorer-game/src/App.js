import React, { useState } from 'react';
import './App.css';

function App() {
  // Generate 100 stars
  const stars = [...Array(1000)].map((_, i) => {
    // Generate random position and size for each star
    const style = {
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      width: `${Math.random() * 2}px`,
      height: `${Math.random() * 2}px`,
      pointerEvents: 'none', // Add this line
    };
    return <div key={i} className="absolute bg-white rounded-full" style={style} />;
  });

  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    console.log('Button clicked');
    setAnimate(true);
  };

  return (
    <main className="relative w-screen h-screen bg-gradient-to-b from-[#000033] via-[#054569] to-[#5591A9] overflow-hidden">
      {stars}
      <div className='absolute w-full h-full flex items-center justify-center'>
        <div>
          <h1 className='text-6xl text-white font-bold text-center tracking-widest mt-56'>Game Title</h1>
          <button onClick={handleClick} className="focus:outline-none">
            <img
              className={`mx-auto ${animate ? 'animate-rocket' : ''}`}
              src='./rocket.svg'
              alt='rocket'
              style={{ zIndex: 10, position: 'relative' }}
            />
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;