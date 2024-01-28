import React, { useEffect, useState } from 'react';
import { characterKey, characterImages } from '../App/CharacterSelection';
import './Chatbox.css';
import OpenAI from "openai";

let promptcontext = '';

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

const nullplanetproompt = () =>{
 return "how many planets have i visited?";
};

const planetproompt = (planet) =>{
  let childsetting = "you are responding to a child under the age of 12. ";
  let planetsetting = `you are teaching them about the planet ${planet}. `;
  let shortanswer = "give very short answers, they must not go over four sentences";
  return childsetting + planetsetting + ".  your name is: " + characterKey[localStorage.getItem(characterKey)]+". "+shortanswer;
}
const Proompt = (planet) =>{
  let answer = ""
  planet == null ? answer = nullplanetproompt() : answer = planetproompt(planet);
  return answer;
  
}

const handleSendMessage = (newMessage, planet, setNewMessage, setMessages, messages) => {
  if (newMessage.trim() !== '') {
    //save message to local storage. 
    const promptcontext = "you are a friend of a budding space explorer under the age of 12. your job is to answer any questions they might have in short and simple english";
    const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true });
    openai.chat.completions.create({
      messages: [{ role: 'user', content: Proompt(planet)},
                 { role: 'assistant', content: promptcontext}],
      model: "gpt-4"
    }).then((completion) => {
      setMessages([...messages, { text: newMessage, sender: "player" }, { text: completion.choices[0].message.content, sender: 'bot' }]);
    }).catch((error) => {
      console.log("openai error: ", error.message);
    });

    // Clear the input field after sending the message
    setNewMessage('');
  }
};

const Chatbox = ({ isVisible }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage(newMessage, null, setNewMessage, setMessages, messages);
    }
  };

  return (
    <div className={`relative top-0 right-0 bg-purple-300 p-4 rounded-3xl max-w-md chatbox -m-1  ${isVisible ? 'visible' : ''}`}>
      <div className="flex flex-col h-96 overflow-y-auto mb-4 border-2 border-black rounded-3xl p-2 ">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-1 ${message.sender === 'player' ? 'text-right' : 'text-left'}`}
          >
            <span
              className={`inline-block px-2 py-1 rounded ${message.sender === 'player' ? 'bg-blue-500 mx-2 mt-1 text-white' : 'bg-gray-200'
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