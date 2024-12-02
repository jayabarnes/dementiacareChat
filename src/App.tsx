import React from 'react';
import { ChatContainer } from './components/ChatContainer';
import { uiConfig } from './config/ui';
import { MessageCircle } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-screen flex flex-col">
        <header className="bg-[#6DBB8F] shadow-md">
          <div className="max-w-3xl mx-auto p-4 flex items-center justify-center gap-2">
            <MessageCircle className="w-6 h-6 text-white" />
            <h1 className="text-xl font-semibold text-white">{uiConfig.title}</h1>
          </div>
        </header>
        <main className="flex-grow overflow-hidden bg-gradient-to-b from-[#6DBB8F]/5 to-transparent">
          <ChatContainer />
        </main>
      </div>
    </div>
  );
}

export default App;