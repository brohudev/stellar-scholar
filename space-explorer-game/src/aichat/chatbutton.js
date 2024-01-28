import React, { useEffect, useState } from 'react';
// import { getresponse } from './openai';
import { characterKey, characterImages } from '../App/CharacterSelection';
import './Chatbox.css';
import OpenAI from "openai";

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
        style={{ borderRadius: '50%', overflow: 'hidden', width: '100px', height: '100px' }}
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
  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      const openai = new OpenAI({apiKey:"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", dangerouslyAllowBrowser: true});
      console.log(newMessage);
      try {
        // Call the Getresponse function instead of directly making the OpenAI API call
        // const botResponse = await getresponse(newMessage);
        console.log("abracadabra");
        console.log("before the api request");
        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: 'Say this is a test'}],
            // messages: [{ role: "user", content: message },
            //            { role: "assistant", name:`${characters[localStorage.getItem(characterKey)]}`}],
            model: "gpt-3.5-turbo",
          });
        // Update state with the received response from OpenAI
        setMessages([...messages, { text: newMessage, sender: "player" }, { text: completion.choices[0].message.content, sender: 'bot' }]);
      } catch (error) {
        // console.log(error.message)// Handle errors if needed
      }

      // Clear the input field after sending the message
      setNewMessage('');
    }
  };

  const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    handleSendMessage();
  }
};

  return (
    <div className={`relative top-0 right-0 bg-purple-300 p-4 rounded-3xl max-w-md chatbox -m-1  ${isVisible ? 'visible' : ''}`}>
    <div className="flex flex-col h-96 overflow-y-auto mb-4 border-2 border-black rounded-3xl p-2 ">
      {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
          >
            <span
              className={`inline-block px-2 py-1 rounded ${
                message.sender === 'user' ? 'bg-purple-500 mx-2 mt-1 text-white' : 'bg-gray-200'
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
            className="flex-1 p-2 border-2 border-black rounded-2xl bg-transparent text-black rounded-r-none"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="px-4 py-2 bg-purple-500 border-2 border-black border-l-0 text-white rounded-2xl rounded-l-none"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    );
};

export default ChatButton;