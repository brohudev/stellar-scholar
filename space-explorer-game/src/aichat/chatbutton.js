// ChatButton.js

import React, { useEffect, useState } from 'react';
import Chatbox from './chatbox';
import { characterKey, characterImages } from '../App/CharacterSelection';
import './Chatbox.css';

const ChatButton = ({ canvas, characterImage }) => {
  const [isChatboxVisible, setIsChatboxVisible] = useState(false);
  useEffect(() => {
    if (canvas && !canvas.parent)
      document.body.appendChild(canvas);
  }, [canvas]);

  const toggleChatbox = () => {
    setIsChatboxVisible(!isChatboxVisible);
  };

  return (
    <div className="fixed top-0 right-0 m-4">
      <button
        className="px-4 py-2 bg-purple-300 text-black rounded m-4"
        onClick={toggleChatbox}
        style={{ borderRadius: '50%', overflow: 'hidden', width: '75px', height: '75px' }}
      >
        <img src={characterImages[localStorage.getItem(characterKey)]} alt="Character" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
      </button>
      <Chatbox isVisible={isChatboxVisible} onClose={toggleChatbox} />
    </div>
  );
};

export default ChatButton;