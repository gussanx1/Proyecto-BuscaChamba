import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Paperclip, X, ArrowLeft } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'worker';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name?: string;
  }[];
}

interface ChatModalProps {
  worker: {
    name: string;
    image: string;
  };
  onClose: () => void;
}

export function ChatModal({ worker, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '¡Hola! He visto tu postulación para el trabajo de fontanería.',
      sender: 'user',
      timestamp: new Date(Date.now() - 3600000),
      status: 'read'
    },
    {
      id: 2,
      text: '¡Hola! Sí, estoy interesado en el trabajo. Tengo experiencia en reparaciones similares.',
      sender: 'worker',
      timestamp: new Date(Date.now() - 3500000),
      status: 'read'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isAttaching, setIsAttaching] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim() || attachments.length > 0) {
      const newMessageObj: Message = {
        id: Date.now(),
        text: newMessage,
        sender: 'worker',
        timestamp: new Date(),
        status: 'sent',
        attachments: attachments.map(file => ({
          type: file.type.startsWith('image/') ? 'image' : 'file',
          url: URL.createObjectURL(file),
          name: file.name
        }))
      };

      setMessages(prev => [...prev, newMessageObj]);
      setNewMessage('');
      setAttachments([]);
      setIsAttaching(false);

      // Simulate client response
      setTimeout(() => {
        const response: Message = {
          id: Date.now() + 1,
          text: '¡Gracias por la información! ¿Cuándo podrías comenzar?',
          sender: 'user',
          timestamp: new Date(),
          status: 'sent'
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg h-[600px] mx-4 rounded-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 p-4 flex items-center gap-4">
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-full"
          >
            <ArrowLeft size={20} />
          </button>
          <img
            src={worker.image}
            alt={worker.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white"
          />
          <div className="flex-1">
            <h3 className="text-white font-medium">{worker.name}</h3>
            <p className="text-white/80 text-sm">En línea</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'worker' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'worker'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.attachments.map((attachment, index) => (
                      <div key={index} className="rounded-lg overflow-hidden">
                        {attachment.type === 'image' ? (
                          <img
                            src={attachment.url}
                            alt="Attached"
                            className="max-w-full h-auto"
                          />
                        ) : (
                          <div className="bg-white/10 p-2 rounded flex items-center gap-2">
                            <Paperclip size={16} />
                            <span className="text-sm truncate">{attachment.name}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-end gap-1 mt-1">
                  <p className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {message.sender === 'worker' && (
                    <span className="text-xs opacity-70">
                      {message.status === 'sent' ? '✓' : message.status === 'delivered' ? '✓✓' : '✓✓'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Attachment Preview */}
        {attachments.length > 0 && (
          <div className="p-2 border-t bg-gray-50">
            <div className="flex gap-2 overflow-x-auto">
              {attachments.map((file, index) => (
                <div key={index} className="relative group">
                  {file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                      <Paperclip size={24} className="text-gray-500" />
                    </div>
                  )}
                  <button
                    onClick={() => removeAttachment(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              onChange={handleFileSelect}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
            >
              <ImageIcon size={20} />
            </button>
            <button
              onClick={() => setIsAttaching(!isAttaching)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
            >
              <Paperclip size={20} />
            </button>
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe un mensaje..."
                className="w-full px-4 py-2 pr-12 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                rows={1}
              />
              <button
                onClick={handleSend}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-emerald-600 hover:bg-emerald-50 rounded-full"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}