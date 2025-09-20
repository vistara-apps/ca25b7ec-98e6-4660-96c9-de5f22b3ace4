'use client';

import { AIChatMessage } from '../lib/types';
import { formatDate } from '../lib/utils';

interface ChatBubbleProps {
  message: AIChatMessage;
  variant: 'user' | 'ai';
}

export function ChatBubble({ message, variant }: ChatBubbleProps) {
  const isUser = variant === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-accent text-white rounded-br-md'
              : 'bg-white/10 text-white rounded-bl-md'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.message}</p>
        </div>
        
        <div className={`text-xs text-white/40 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {formatDate(message.timestamp)}
        </div>
      </div>
    </div>
  );
}
