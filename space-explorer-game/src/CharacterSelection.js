import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

function CharacterSelection() {
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
    const characters = ['fishie', 'monkee', 'penguii', 'tamy'];
    const characterImages = ['.icons/fish.png', './icons/monkey.png', './icons/penguin.png', '/icons/tamulogo.png'];

    return (
        <main className="relative w-screen h-screen bg-gradient-to-b from-[#2b2b4e] via-[#000033] to-[#2b2b4e] overflow-hidden">
            {stars}
            {shootingStars}
            <div className='flex justify-center items-center h-screen'>
                <div className='text-center text-white'>
                    <h1>Select Your Character</h1>
                    <Carousel>
                        {characters.map((character, index) => (
                            <div key={index}>
                                <img src={characterImages[index]} alt={character} />
                                <button onClick={() => console.log(`You selected ${character}`)}>
                                    {character}
                                </button>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </main>
    );
}

export default CharacterSelection;