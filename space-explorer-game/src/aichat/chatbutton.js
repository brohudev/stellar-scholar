import React, { useEffect, useState } from 'react';
import { characterKey, characterImages, characterAstronauts } from '../App/CharacterSelection';
import './Chatbox.css';
import OpenAI from "openai";

let setGptContext;

const ChatButton = ({ canvas, characterImage }) => {
  const [isChatboxVisible, setIsChatboxVisible] = useState(false);
  useEffect(() => {
    if (canvas.current && !canvas.current.parent)
      document.body.appendChild(canvas.current);
  }, [canvas]);

  const toggleChatbox = () => {
    setIsChatboxVisible(!isChatboxVisible);
  };

  return (
    <div className="fixed top-0 right-0 m-4">
      <button
        className=" text-black rounded mt-4 mr-4 z-1"
        onClick={toggleChatbox}
        style={{ borderRadius: '50%', overflow: 'hidden', width: '150px', height: '150px' }}
      >
        <img src={characterAstronauts[localStorage.getItem(characterKey)]} alt="Character" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
      </button>
      <div style={{ position: 'fixed', top: '100px', right: '100px' }}>
        <Chatbox isVisible={isChatboxVisible} />
      </div>
    </div>
  );
};
const planetproompt = (planet) =>{
  let childsetting = "you are responding to a child under the age of 12. ";
  let planetsetting = `you are teaching them about the planet ${planet}. `;
  let shortanswer = "give very short answers, they must not go over four sentences";
  return childsetting + planetsetting + ".  your name is: " + characterKey[localStorage.getItem(characterKey)]+". "+shortanswer;
}
const Proompt = (planet, newMessage) =>{
  let answer = ""
  planet == null ? answer = newMessage : answer = planetproompt(planet);
  return answer; 
}
const handleSendMessage = (newMessage, planet, setNewMessage, setMessages, messages) => {
  if (newMessage.trim() !== '') {
    let promptcontext = "you are a friend of a budding space explorer under the age of 12. your job is to answer any questions they might have in short and simple english";
    let additionalcontext; //ik its not best practice but idc anymore. 
    if (planet === null) {//add the user message to additional context
      additionalcontext = `user: ${newMessage}`;
    } else if (characterKey[localStorage.getItem(characterKey)]) { //if friendname exists. 
      additionalcontext = `${characterKey[localStorage.getItem(characterKey)]}: ${newMessage}`; //set that to additional context.
    }
    setGptContext((prevContext) => [...prevContext, additionalcontext]); //create a context pool to send with every api request. 
    
    const allContext = setGptContext.map(line => `${line}\n`).join(''); //dirty processing to create a string.
    const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true });
    openai.chat.completions.create({
      messages: [{ role: 'user', content: Proompt(planet, newMessage)}, //pass the prompt...
                 { role: 'assistant', content: `${promptcontext}\n${allContext}`}], //pass all context that exists. 
      model: "gpt-4"
    }).then((completion) => {
      setMessages([...messages, { text: newMessage, sender: "player" }, { text: completion.choices[0].message.content, sender: 'bot' }]);
    }).catch((error) => {
      console.log("openai error: ", error.message);
    });
    setNewMessage('');    // Clear the input field after sending the message

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
    <div className={`relative top-0 right-0 bg-purple-300 p-4 rounded-3xl max-w-md chatbox m-6  ${isVisible ? 'visible' : ''}`}>
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
          
          onChange={(e) => {console.log(e.target.value); setNewMessage(e.target.value)}}
          onKeyPress={handleKeyPress}
        />
        <button
          className="px-4 py-2 bg-purple-500 border-2 border-black border-l-0 text-white rounded-2xl rounded-l-none"
          onClick={handleSendMessage(newMessage, null, setNewMessage, setMessages, messages)}
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default ChatButton;