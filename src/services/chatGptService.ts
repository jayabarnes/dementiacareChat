import { encode } from 'gpt-tokenizer';
import { Message } from '../types/chat';
import { LLMService } from './llmService';

const MAX_TOKENS = 8000;

export class ChatGPTService implements LLMService {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private countTokens(messages: Message[]): number {
    const messageString = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
    return encode(messageString).length;
  }

  private truncateHistory(messages: Message[]): Message[] {
    let currentMessages = [...messages];
    
    // Always keep the system message and the latest user message
    const systemMessage = currentMessages.find(msg => msg.role === 'system');
    const latestUserMessage = currentMessages[currentMessages.length - 1];
    
    while (this.countTokens(currentMessages) > MAX_TOKENS && currentMessages.length > 2) {
      // Remove the second message (after system, before latest)
      const systemIndex = systemMessage ? 1 : 0;
      currentMessages.splice(systemIndex, 1);
    }
    
    // Ensure system message is first if it exists
    if (systemMessage) {
      currentMessages = [
        systemMessage,
        ...currentMessages.filter(msg => msg.role !== 'system')
      ];
    }
    
    return currentMessages;
  }

  async generateResponse(prompt: string, history: Message[]): Promise<string> {
    const messages = this.truncateHistory([...history, { 
      id: crypto.randomUUID(),
      role: 'user' as const,
      content: prompt,
      timestamp: Date.now()
    }]);

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: messages.map(({ role, content }) => ({ role, content })),
          temperature: 0.7,
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from ChatGPT API');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('ChatGPT API Error:', error);
      throw error;
    }
  }
}