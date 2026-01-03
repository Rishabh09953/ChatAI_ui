import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatContainer from './components/ChatContainer';
import MessageInput from './components/MessageInput';
import TypingIndicator from './components/TypingIndicator';
import WelcomeMessage from './components/WelcomeMessage';
import SettingsModal from './components/SettingsModal';

import {
  sendMessageAPI,
  createChatAPI,
  loadChatAPI,
} from './service/chat.api';

import './App.css';

function App() {
  const [conversationHistory, setConversationHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [chatHistories, setChatHistories] = useState({});
  const [isTyping, setIsTyping] = useState(false);

  const [settings, setSettings] = useState({
    apiKey: '',
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 1000,
  });

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // ✅ Create first chat on load
  useEffect(() => {
    createNewChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ SEND MESSAGE
  const sendMessage = async (text) => {
    if (!text.trim() || !currentChatId) return;

    const userMsg = { role: 'user', content: text };

    setConversationHistory(prev => [...prev, userMsg]);
    setChatHistories(prev => ({
      ...prev,
      [currentChatId]: [...(prev[currentChatId] || []), userMsg],
    }));

    setIsTyping(true);

    try {
      const data = await sendMessageAPI(currentChatId, text);

      const aiMsg = { role: 'assistant', content: data.reply };

      setConversationHistory(prev => [...prev, aiMsg]);
      setChatHistories(prev => ({
        ...prev,
        [currentChatId]: [...(prev[currentChatId] || []), aiMsg],
      }));
    } catch (error) {
      console.error('Send message failed:', error);

      const errorMsg = {
        role: 'assistant',
        content: 'Server error. Please try again.',
      };

      setConversationHistory(prev => [...prev, errorMsg]);
      setChatHistories(prev => ({
        ...prev,
        [currentChatId]: [...(prev[currentChatId] || []), errorMsg],
      }));
    } finally {
      setIsTyping(false);
    }
  };

  // ✅ CREATE NEW CHAT
  const createNewChat = async () => {
    try {
      const chat = await createChatAPI();

      if (!chat?.id) {
        throw new Error('Invalid chat response');
      }

      setChatHistories(prev => ({ ...prev, [chat.id]: [] }));
      setCurrentChatId(chat.id);
      setConversationHistory([]);
    } catch (err) {
      console.error('Create chat failed:', err);
    }
  };

  // ✅ LOAD CHAT
  const loadChat = async (chatId) => {
    try {
      const data = await loadChatAPI(chatId);
      setCurrentChatId(chatId);
      setConversationHistory(data.messages || []);
    } catch (error) {
      console.error('Load chat failed:', error);
    }
  };

  // ✅ CLEAR ALL (frontend only)
  const clearAllChats = () => {
    if (!window.confirm('Are you sure you want to clear all conversations?')) return;

    setChatHistories({});
    setConversationHistory([]);
    setCurrentChatId(null);

    createNewChat();
  };

  return (
    <div className="app-container">
      <Sidebar
        chatHistories={chatHistories}
        currentChatId={currentChatId}
        loadChat={loadChat}
        createNewChat={createNewChat}
        clearAllChats={clearAllChats}
        openSettings={() => setIsSettingsModalOpen(true)}
      />

      <div className="main-content">
        <div className="chat-header">
          <h5 className="mb-0">AI Assistant</h5>
          <span className="badge bg-secondary">{settings.model}</span>
        </div>

        <div className="chat-container">
          {conversationHistory.length === 0 ? (
            <WelcomeMessage sendMessage={sendMessage} />
          ) : (
            <ChatContainer messages={conversationHistory} />
          )}

          {isTyping && <TypingIndicator />}
        </div>

        <MessageInput sendMessage={sendMessage} disabled={isTyping} />
      </div>

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={settings}
        setSettings={setSettings}
      />
    </div>
  );
}

export default App;
