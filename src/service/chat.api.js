import { api } from '../Config/api.js';

export const sendMessageAPI = (chatId, message) =>
  api.post('/chat/send', { chatId, message });

export const createChatAPI = () =>
  api.post('/chat/new');

export const loadChatAPI = (chatId) =>
  api.get(`/chat/${chatId}`);

