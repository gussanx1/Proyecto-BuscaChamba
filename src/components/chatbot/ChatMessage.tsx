import React from 'react';
import { Bot } from 'lucide-react';
import type { Message } from './types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.type === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex gap-2 max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        {isBot && (
          <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <Bot size={20} className="text-green-600" />
          </div>
        )}
        <div
          className={`rounded-lg p-3 ${
            isBot
              ? 'bg-white text-gray-800 shadow-sm'
              : 'bg-green-600 text-white'
          }`}
        >
          <p className="whitespace-pre-wrap">{message.text}</p>
          <span className="text-xs opacity-70 mt-1 block text-right">
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>
    </div>
  );
}