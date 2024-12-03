import { ChatContext } from './types/chat';

export interface UiConfig {
  title: string;
  subtitle?: string;
  inputPlaceholder: string;
  errorMessage: string;
  lessonId?: string;
  module?: string;
}

export const createUiConfig = (context?: ChatContext): UiConfig => ({
  title: 'The Heart of Dementia Care',
  subtitle: context?.subtitle,
  lessonId: context?.lessonId,
  module: context?.module,
  inputPlaceholder: 'Type your message...',
  errorMessage: 'Sorry, I encountered an error processing your request.',
});

// For backwards compatibility
export const uiConfig = createUiConfig();