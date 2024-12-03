export interface Message {
  id: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  addMessage: (role: Message['role'], content: string) => void;
  setLoading: (loading: boolean) => void;
  initializeChat: () => void;
}

export interface ChatContext {
  subtitle?: string;
  lessonId?: string;
  module?: string;
}

export const SYSTEM_MESSAGE = "You are advising someone who is caring for a person living with dementia.";