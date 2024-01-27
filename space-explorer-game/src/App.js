import React from 'react';

function App() {
  // Generate 100 stars
  const stars = Array.from({ length: 100 }, (_, i) => {
    // Generate random position and size for each star
    const style = {
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      width: `${Math.random() * 2}px`,
      height: `${Math.random() * 2}px`,
    };
    return <div key={i} className="absolute bg-white rounded-full" style={style} />;
  });

  return (
    <main className="relative w-screen h-screen bg-gradient-to-b from-[#000033] via-[#054569] to-[#5591A9] overflow-hidden">
      {stars}
      <div className='absolute w-full h-full'>
        <div className='mt-24'>
          <h1 className='text-5xl text-white font-bold text-center'>Space Explorer</h1>
          <p className='text-2xl text-white text-center'>Welcome aboard the spacecraft!</p>
        </div>
      </div>
    </main>
  );
}

export default App;