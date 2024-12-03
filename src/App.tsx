import React from 'react';
import { ChatContainer } from './components/ChatContainer';
import { uiConfig } from './config/ui';
import { MessageCircle } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-[#EBF2FA]">
      <div className="h-screen flex flex-col">
        <header className="bg-[#6DBB8F] shadow-md">
          <div className="max-w-3xl mx-auto p-4 flex items-center justify-center gap-2">
          <img src="/gentledementiacarelogo-500x200.jpg" alt="The Heart of Dementia Care" className="h-8 w-auto" />
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