import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { uiConfig } from '../config/ui';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t bg-white/80 backdrop-blur-sm p-4 shadow-lg">
      <div className="flex gap-4 max-w-3xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          placeholder={uiConfig.inputPlaceholder}
          className="flex-grow p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DBB8F] focus:border-transparent transition-shadow"
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="p-3 bg-[#6DBB8F] text-white rounded-lg hover:bg-[#5ca77c] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};