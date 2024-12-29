import React, { useState } from 'react';
import { Mic } from 'lucide-react';

interface VoiceSearchProps {
  onResult: (text: string) => void;
}

export function VoiceSearch({ onResult }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'es-ES';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  };

  return (
    <button
      onClick={startListening}
      className={`absolute right-12 top-1/2 -translate-y-1/2 ${
        isListening ? 'text-green-600 animate-pulse' : 'text-gray-400 hover:text-green-600'
      }`}
    >
      <Mic size={20} />
    </button>
  );
}