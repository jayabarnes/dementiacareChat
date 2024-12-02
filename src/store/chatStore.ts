import { create } from 'zustand';
import { ChatState, Message, SYSTEM_MESSAGE } from '../types/chat';

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  addMessage: (role, content) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      role,
      content,
      timestamp: Date.now(),
    };
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },
  setLoading: (loading) => set({ isLoading: loading }),
  initializeChat: () => {
    const systemMessage: Message = {
      id: crypto.randomUUID(),
      role: 'system',
      content: SYSTEM_MESSAGE,
      timestamp: Date.now(),
    };
    set({ messages: [systemMessage] });
  },
}));