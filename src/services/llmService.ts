import { Message } from '../types/chat';

export interface LLMService {
  generateResponse: (prompt: string, history: Message[]) => Promise<string>;
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