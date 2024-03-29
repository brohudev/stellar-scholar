import React, { useState } from 'react';
import backgroundImage from './pixelbg2.png';
import { useNavigate } from 'react-router-dom';

const characterKey = '1(hdb3#&93Af';

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
    width: `${2 + Math.random() * 3}px`, // Increase the size here
    height: `${2 + Math.random() * 3}px`, // Increase the size here
    animationDuration: `${2 + Math.random() * 3}s`,
    animationDelay: `${Math.random() * 5}s`,
  };
  return <div key={i} className="shooting-star" style={style} />;
});


const characters = ['FISHEE', 'MONKEE', 'PENGUII', 'TAMMY'];
const characterImages = ['./icons/fish.png', './icons/monkey.png', './icons/penguin.png', '/icons/tamulogo.png'];
const characterDescriptions = ["Bubbly intergalactic fish", 'Silly cosmic monkey', 'Nebula loving penguin', '10yr old space tiger'];
const characterAstronauts = ['./icons/astroFish.png', './icons/astroMonkey.png', './icons/astroPenguin.png', '/icons/astroTammy.png'];
const characterAnimated = ['./icons/animateFish.png', './icons/animateMonkey.png', './icons/animatePenguin.png', '/icons/animateTammy.png'];

function CharacterSelection() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const navigate = useNavigate();
  const handleClick = () => {
    setIsAnimating(true);

    setTimeout(() => {
      navigate('/game-start');
    }, 1250); // Adjust this delay to match the duration of your animation
  };
  const chooseCharacter = index => {
    localStorage.setItem(characterKey, index);
    setSelectedCard(index);
  };


  return (
<main className={`relative w-screen h-screen bg-gradient-to-b from-[#2b2b4e] via-[#000033] to-[#2b2b4e] overflow-hidden ${isAnimating ? 'animate-fade-out' : ''}`} style={{ backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      {stars}
      {shootingStars}
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-4xl mb-12 text-white">Choose your character</h1>
        <div className="flex flex-wrap justify-center space-x-4 mb-8">
        {characters.map((character, index) => (
  <div key={index} className={`card flex flex-col ${index === selectedCard ? 'shadow-purple-700 shadow-xl' : ''} items-center text-center bg-white p-4 rounded-2xl shadow-lg transition-all duration-500 ${index === selectedCard ? 'transform scale-125' : ''}`} onClick={() => chooseCharacter(index)}>
    <img className="w-48 h-48" src={index === selectedCard ? characterAnimated[index] : characterImages[index]} alt={character} />
    <h2 className="text-xl">{character}</h2>
    {index === selectedCard && <p>{characterDescriptions[index]}</p>}
  </div>
))}
        </div>

        {selectedCard !== null && <button className="px-4 py-2 bg-purple-500 text-white rounded mt-12" onClick={handleClick}>Select</button>}
      </div>
    </main>
  );
}

export {CharacterSelection, characterKey, characterImages, characters, characterDescriptions, characterAstronauts};