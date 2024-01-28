// Chatbox.js

import React, { useState } from 'react';

const Chatbox = ({ isVisible, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      // You can add logic here to handle responses from a chatbot or server
      setNewMessage('');
    }
  };

  return (
    <div className={`fixed top-0 right-0 m-4 p-4 border rounded shadow max-w-md ${isVisible ? '' : 'hidden'}`}>
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
        <button
          className="ml-2 px-4 py-2 bg-gray-300 text-black rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
