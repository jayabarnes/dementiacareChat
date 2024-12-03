import { Message } from '../types/chat';

export interface LLMService {
  generateResponse: (prompt: string, history: Message[]) => Promise<string>;
}

export class ChatGPTService implements LLMService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(prompt: string, history: Message[]): Promise<string> {
    try {
      const messages = [
        ...history.map(msg => ({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.content
        })),
        { role: 'user', content: prompt }
      ];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: messages
        })
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content || '';
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      throw error;
    }
  }
}

// Mock implementation for development/testing
export class MockLLMService implements LLMService {
  async generateResponse(prompt: string, history: Message[]): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return `This is a mock response to: "${prompt}". Previous messages: ${history.length}`;
  }
}

// Create service instance based on environment
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
console.log(API_KEY ? "OpenAI API key found" : "No OpenAI API key found");
export const llmService: LLMService = API_KEY
  ? new ChatGPTService(API_KEY)
  : new MockLLMService();