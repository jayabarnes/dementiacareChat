import React, { useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChatStore } from '../store/chatStore';
import { llmService } from '../services/llmService';
import { uiConfig } from '../config/ui';

export const ChatContainer: React.FC = () => {
  const { messages, isLoading, addMessage, setLoading, initializeChat } = useChatStore();

  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  const handleSendMessage = async (content: string) => {
    addMessage('user', content);
    setLoading(true);
    
    try {
      const response = await llmService.generateResponse(content, messages);
      addMessage('assistant', response);
    } catch (error) {
      addMessage('assistant', uiConfig.errorMessage);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const visibleMessages = messages.filter(message => message.role !== 'system');

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {visibleMessages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-sm">Start a conversation by typing a message below</p>
          </div>
        )}
        {visibleMessages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
};