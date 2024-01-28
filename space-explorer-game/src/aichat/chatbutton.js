// ChatButton.js

import React, { useState } from 'react';
import Chatbox from './chatbox';

const ChatButton = ({onClick}) => {
  const [isChatboxVisible, setIsChatboxVisible] = useState(false);

  const toggleChatbox = () => {
    setIsChatboxVisible(!isChatboxVisible);
  };

  return (
    <div className="fixed top-0 right-0 m-4">
      <button
        className="px-4 py-2 bg-gray-300 text-black rounded"
        onClick={toggleChatbox}
      >
        Chatbox
      </button>
      <Chatbox isVisible={isChatboxVisible} onClose={toggleChatbox} />
    </div>
  );
};

export default ChatButton;