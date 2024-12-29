import React from 'react';
import { CheckCircle } from 'lucide-react';

interface PaymentSuccessModalProps {
  worker: {
    name: string;
    service: string;
    image: string;
  };
}

export function PaymentSuccessModal({ worker }: PaymentSuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-sm mx-4 animate-bounce-in">
        <div className="text-center">
          <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <img
            src={worker.image}
            alt={worker.name}
            className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-green-100"
          />
          <h2 className="text-2xl font-bold mb-2">¡Pago Exitoso!</h2>
          <p className="text-gray-600 mb-2">
            Has contratado el servicio de {worker.service.toLowerCase()} con {worker.name}.
          </p>
          <p className="text-sm text-gray-500">
            Pronto recibirás la confirmación por correo electrónico.
          </p>
        </div>
      </div>
    </div>
  );
}