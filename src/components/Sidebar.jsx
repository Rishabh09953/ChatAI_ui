import React from 'react';

function Sidebar({
  chatHistories,
  currentChatId,
  loadChat,
  createNewChat,
  clearAllChats,
  openSettings
}) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="new-chat-btn" onClick={createNewChat}>
          <i className="bi bi-plus-lg"></i> New Chat
        </button>
      </div>

      <div className="chat-history">
        {Object.entries(chatHistories).map(([id, history]) => (
          <div
            key={id}
            className={`chat-history-item ${id === currentChatId ? 'active' : ''}`}
            onClick={() => loadChat(id)}
          >
            <i className="bi bi-chat-dots"></i>{' '}
            {history.length > 0
              ? history[0].content.substring(0, 30) + '...'
              : 'New Chat'}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <button
          className="btn btn-sm btn-outline-light w-100 mb-2"
          onClick={openSettings}
        >
          <i className="bi bi-gear"></i> Settings
        </button>
        <button
          className="btn btn-sm btn-outline-light w-100"
          onClick={clearAllChats}
        >
          <i className="bi bi-trash"></i> Clear Conversations
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
