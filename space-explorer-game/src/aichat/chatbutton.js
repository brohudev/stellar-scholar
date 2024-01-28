// ChatButton.js

import React, { useEffect, useState } from 'react';
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
        className="px-4 py-2 bg-purple-300 text-black rounded mt-4 mr-4 z-50"
        onClick={toggleChatbox}
        style={{ borderRadius: '50%', overflow: 'hidden', width: '75px', height: '75px' }}
      >
        <img src={characterImages[localStorage.getItem(characterKey)]} alt="Character" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
      </button>
      <div style={{ position: 'fixed', top: '100px', right: '100px' }}>
        <Chatbox isVisible={isChatboxVisible} />
      </div>
    </div>
  );
};

const Chatbox = ({ isVisible }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
    }
  };

  return (
    <div className={`relative top-0 right-0 bg-purple-300 p-4 rounded-3xl max-w-md chatbox -m-4 ${isVisible ? 'visible' : ''}`}>
      <div className="flex flex-col h-64 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
          >
            <span
              className={`inline-block px-2 py-1 rounded ${
                message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-r"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatButton;