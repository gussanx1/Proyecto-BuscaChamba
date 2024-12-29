import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { QuickReplies } from './QuickReplies';
import { generateBotResponse } from './chatbotLogic';
import type { Message, QuickReply } from './types';

interface ChatBotProps {
  currentUser: {
    name: string;
    type: string;
  };
}

export function ChatBot({ currentUser }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      text: `¡Hola ${currentUser.name}! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?`,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickReplies: QuickReply[] = [
    {
      id: 'services',
      text: '¿Qué servicios ofrecen?',
      action: () => handleQuickReply('services')
    },
    {
      id: 'prices',
      text: '¿Cómo se calculan los precios?',
      action: () => handleQuickReply('prices')
    },
    {
      id: 'security',
      text: '¿Es seguro contratar servicios?',
      action: () => handleQuickReply('security')
    },
    {
      id: 'payment',
      text: 'Métodos de pago',
      action: () => handleQuickReply('payment')
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickReply = async (replyId: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      text: quickReplies.find(reply => reply.id === replyId)?.text || '',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    setIsTyping(true);
    const botResponse = await generateBotResponse(replyId);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'bot',
        text: botResponse,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      text: inputText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    setIsTyping(true);
    const botResponse = await generateBotResponse(inputText);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'bot',
        text: botResponse,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (currentUser.type !== 'user') return null;

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors z-50"
      >
        <Bot size={24} />
      </button>
    );
  }

  return (
    <div className={`fixed ${isMinimized ? 'bottom-24 right-4' : 'bottom-24 right-4 sm:right-8'} z-50 ${
      isMinimized ? 'w-auto' : 'w-full max-w-sm'
    }`}>
      <div className={`bg-white rounded-lg shadow-xl ${
        isMinimized ? 'hidden' : 'flex flex-col'
      } max-h-[calc(100vh-120px)]`}>
        {/* Header */}
        <div className="bg-green-600 p-4 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-2 text-white">
            <Bot size={24} />
            <div>
              <h3 className="font-medium">Asistente Virtual</h3>
              <p className="text-sm text-green-100">
                {isTyping ? 'Escribiendo...' : 'En línea'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 hover:bg-green-700 rounded-full text-white transition-colors"
            >
              <ChevronDown size={20} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-green-700 rounded-full text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50" style={{ maxHeight: '400px' }}>
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-gray-500">
                <Bot size={20} />
                <div className="flex gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick Replies */}
        <QuickReplies replies={quickReplies} onSelect={handleQuickReply} />

        {/* Input */}
        <div className="p-4 border-t flex-shrink-0">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu pregunta..."
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Minimized Button */}
      {isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Bot size={24} />
        </button>
      )}
    </div>
  );
}