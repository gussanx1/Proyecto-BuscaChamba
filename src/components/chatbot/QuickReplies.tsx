import React from 'react';
import type { QuickReply } from './types';

interface QuickRepliesProps {
  replies: QuickReply[];
  onSelect: (replyId: string) => void;
}

export function QuickReplies({ replies, onSelect }: QuickRepliesProps) {
  return (
    <div className="p-4 border-t bg-gray-50">
      <p className="text-sm text-gray-600 mb-2">Preguntas frecuentes:</p>
      <div className="flex flex-wrap gap-2">
        {replies.map((reply) => (
          <button
            key={reply.id}
            onClick={() => onSelect(reply.id)}
            className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            {reply.text}
          </button>
        ))}
      </div>
    </div>
  );
}