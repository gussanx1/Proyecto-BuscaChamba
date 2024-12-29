import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ThankYouModal({ isOpen, onClose }: ThankYouModalProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 text-center max-w-sm mx-4 shadow-xl animate-bounce-in">
        <CheckCircle size={48} className="mx-auto text-green-600 mb-4" />
        <h2 className="text-2xl font-bold mb-2">¡Gracias por tus comentarios!</h2>
        <p className="text-gray-600">
          Tu opinión nos ayuda a mejorar nuestros servicios y la experiencia de todos los usuarios.
        </p>
      </div>
    </div>
  );
}