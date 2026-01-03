import React from 'react';
import Message from './Message';

function ChatContainer({ messages = [] }) {
  return (
    <>
      {messages.map((msg, idx) => (
        <Message
          key={msg.id || `${msg.role}-${idx}`}
          role={msg.role}
          content={msg.content}
        />
      ))}
    </>
  );
}

export default ChatContainer;
