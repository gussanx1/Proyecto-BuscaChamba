import React, { useState, useEffect } from 'react';
import { QrCode, Copy, CheckCircle } from 'lucide-react';

interface YapePaymentProps {
  amount: number;
  onComplete: () => void;
}

export function YapePayment({ amount, onComplete }: YapePaymentProps) {
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(180); // 3 minutos
  const yapeNumber = "999-888-777";
  const qrUrl = "https://images.unsplash.com/photo-1605098293544-25f4c32344c8?w=300&h=300&fit=crop";

  useEffect(() => {
    // Simular verificación de pago cada 5 segundos
    const paymentCheck = setInterval(() => {
      // Aquí iría la lógica real de verificación de pago
      const paymentReceived = Math.random() > 0.7;
      if (paymentReceived) {
        clearInterval(paymentCheck);
        onComplete();
      }
    }, 5000);

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          clearInterval(paymentCheck);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(paymentCheck);
      clearInterval(timer);
    };
  }, [onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const copyNumber = () => {
    navigator.clipboard.writeText(yapeNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="text-center space-y-6">
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-medium text-lg mb-2">Pagar con Yape</h3>
        <p className="text-gray-600">Monto a pagar: S/. {amount.toFixed(2)}</p>
        <p className="text-sm text-gray-500 mt-2">
          Tiempo restante: {formatTime(countdown)}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img 
              src={qrUrl} 
              alt="Código QR Yape" 
              className="w-48 h-48 object-cover"
            />
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">O puedes yapear al número:</p>
          <div className="flex items-center justify-center gap-2">
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <span className="font-mono text-lg">{yapeNumber}</span>
            </div>
            <button
              onClick={copyNumber}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title={copied ? 'Copiado!' : 'Copiar número'}
            >
              {copied ? (
                <CheckCircle className="text-green-600" size={20} />
              ) : (
                <Copy size={20} />
              )}
            </button>
          </div>
        </div>

        <div className="bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800">
          <p>Esperando confirmación del pago...</p>
        </div>
      </div>
    </div>
  );
}