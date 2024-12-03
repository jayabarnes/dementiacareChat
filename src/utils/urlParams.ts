// utils/urlParams.ts
import { ChatContext } from '../types/chat';

export const getContextFromUrl = (): ChatContext => {
  const urlParams = new URLSearchParams(window.location.search);
  const context: ChatContext = {};

  if (urlParams.has('subtitle')) context.subtitle = urlParams.get('subtitle') || undefined;
  if (urlParams.has('lessonId')) context.lessonId = urlParams.get('lessonId') || undefined;
  if (urlParams.has('module')) context.module = urlParams.get('module') || undefined;

  return context;
};

export const generateChatToolUrl = (context: Partial<ChatContext>): string => {
  const baseUrl = window.location.origin + window.location.pathname;
  const params = new URLSearchParams();

  if (context.subtitle) params.set('subtitle', encodeURIComponent(context.subtitle));
  if (context.lessonId) params.set('lessonId', encodeURIComponent(context.lessonId));
  if (context.module) params.set('module', encodeURIComponent(context.module));

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};