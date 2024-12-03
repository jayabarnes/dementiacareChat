import React, { useEffect, useState, FC } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChatStore } from '../store/chatStore';
import { llmService } from '../services/llmService';
import { createUiConfig } from '../config/ui';
import { getContextFromUrl } from '../utils/urlParams.ts';
import { UiConfig } from '../types/chat';

export const ChatContainer: FC = () => {
  const { messages, isLoading, addMessage, setLoading, initializeChat } = useChatStore();
  const [config, setConfig] = useState<UiConfig>(createUiConfig());

  useEffect(() => {
    // Initialize chat and load context from URL
    initializeChat();
    const context = getContextFromUrl();
    setConfig(createUiConfig(context));
  }, [initializeChat]);

  const handleSendMessage = async (content: string) => {
    addMessage('user', content);
    setLoading(true);
    
    try {
      const response = await llmService.generateResponse(content, messages);
      addMessage('assistant', response);
    } catch (error) {
      addMessage('assistant', config.errorMessage);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const visibleMessages = messages.filter(message => message.role !== 'system');

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      <div className="mb-4 p-4 border-b">
        <h1 className="text-xl font-semibold text-center">{config.title}</h1>
        {config.subtitle && (
          <h2 className="text-lg text-gray-600 text-center mt-2">{config.subtitle}</h2>
        )}
        {config.module && (
          <div className="text-sm text-gray-500 text-center mt-1">
            Module: {config.module}
          </div>
        )}
      </div>
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

Version 2 of 2