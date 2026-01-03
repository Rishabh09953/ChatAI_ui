import React from 'react';

function TypingIndicator() {
  return (
    <div className="typing-indicator show">
      <div className="ai-avatar">AI</div>
      <div className="message-content">
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
      </div>
    </div>
  );
}

export default TypingIndicator;