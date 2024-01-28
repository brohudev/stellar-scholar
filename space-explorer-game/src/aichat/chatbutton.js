import React, { useEffect, useState } from 'react';
import { characterKey, characters, characterDescriptions, characterAstronauts } from '../App/CharacterSelection';
import './Chatbox.css';
import OpenAI from "openai";
//global context for all chats. 
let setGptContext = "you are a friend of a budding space explorer under the age of 12. your job is to answer any questions they might have in short and simple english. give very short answers, they must not go over five sentences";
const messages=[];
const toggleChatbox = () => {
  renderer.setIsChatboxVisible(!renderer.isChatboxVisible);
};
const openChatbox=()=>renderer.setIsChatboxVisible(true);
const ChatButton = ({ canvas, characterImage }) => {
  const [isChatboxVisible, setIsChatboxVisible] = useState(false);
  renderer.isChatboxVisible=isChatboxVisible;
  renderer.setIsChatboxVisible=setIsChatboxVisible;
  useEffect(() => {
    if (canvas.current && !canvas.current.parent)
      document.body.appendChild(canvas.current);
  }, [canvas]);

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
  let planetsetting = `You are teaching them about the planet ${planet}. `;
  let motive = "Give them a short description of this planet, in a simple and terse manner. ";
  return planetsetting + motive +"Your name is: " + characters[localStorage.getItem(characterKey)]+"You are "+characterDescriptions[localStorage.getItem(characterKey)]+". ask them if the want to know more.";
}
const renderer={};
const handleSendMessage = (planet, newMessage, setNewMessage) => {
      let additionalcontext; //ik its not best practice but idc anymore. 
      if (planet === null) {//add the user message to additional context
        additionalcontext = `user: ${newMessage}`;
      } 
      setGptContext += `\n${additionalcontext}`; //create a context pool to send with every api request. 
      const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true });
      const content=planet?planetproompt(planet):newMessage;
      openai.chat.completions.create({
        messages: [{ role: 'user', content }, //pass the prompt...
                  { role: 'assistant', content: setGptContext}], //pass all context that exists. 
        model: "gpt-4"
      }).then((completion) => {
        messages.push({ text: newMessage, sender: "player" }, { text: completion.choices[0].message.content, sender: 'bot' });
        renderer.rerender(renderer.renderIdx+1);
        setGptContext += '\n'+characters[localStorage.getItem(characterKey)]+': '+content; 
      }).catch((error) => {
        console.log("openai error: ", error.message);
      });
      if(setNewMessage)
        setNewMessage('');    // Clear the input field after sending the message
};


const Chatbox = ({ isVisible }) => {
  const [renderIdx,rerender]=useState(0);
  const [newMessage, setNewMessage] = useState('');
  renderer.renderIdx=renderIdx;
  renderer.rerender=rerender;

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // console.log("handle key press log: ",event);
      handleSendMessage(null, newMessage, setNewMessage);
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
          
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="px-4 py-2 bg-purple-500 border-2 border-black border-l-0 text-white rounded-2xl rounded-l-none"
          onClick={()=>handleSendMessage(null, newMessage, setNewMessage)}
        >
          Send
        </button>
      </div>
    </div>
  );
};
export {ChatButton,handleSendMessage,openChatbox,renderer};