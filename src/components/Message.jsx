import React from 'react';

function Message({ role, content }) {
  const isUser = role === 'user';
  
  return (
    <div className="message">
      <div className={`message-avatar ${isUser ? 'user-avatar' : 'ai-avatar'}`}>
        {isUser ? 'U' : 'AI'}
      </div>
      <div className="message-content">
        <div className={`${isUser ? 'user-message' : 'ai-message'}`}>
          {content}
        </div>
      </div>
    </div>
  );
}

export default Message;