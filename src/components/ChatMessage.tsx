import React from 'react';
import { Message } from '../types/chat';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';
  
  return (
    <div className={`flex gap-4 p-4 rounded-lg transition-colors ${
      isAssistant ? 'bg-white shadow-sm' : 'bg-transparent'
    }`}>
      <div className="flex-shrink-0">
        {isAssistant ? (
          <div className="p-2 bg-[#6DBB8F]/10 rounded-full">
            <Bot className="w-5 h-5 text-[#6DBB8F]" />
          </div>
        ) : (
          <div className="p-2 bg-gray-100 rounded-full">
            <User className="w-5 h-5 text-gray-600" />
          </div>
        )}
      </div>
      <div className="flex-grow">
        <ReactMarkdown className="prose max-w-none prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200">
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};