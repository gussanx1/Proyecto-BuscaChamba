import React, { useState } from 'react';
import { X, CreditCard, QrCode, AlertTriangle, Star, Send, Wallet } from 'lucide-react';
import { YapePayment } from './payments/YapePayment';
import { CardPayment } from './payments/CardPayment';
import { VirtualWallet } from './payments/VirtualWallet';
import { RatingModal } from './RatingModal';
import { ThankYouModal } from './ThankYouModal';

interface PaymentFlowProps {
  isOpen: boolean;
  onClose: () => void;
  worker: {
    id: number;
    name: string;
    service: string;
    image: string;
    price?: number;
  };
  onPaymentComplete: () => void;
}

export function PaymentFlow({ isOpen, onClose, worker, onPaymentComplete }: PaymentFlowProps) {
  const [step, setStep] = useState<'method' | 'payment' | 'rating'>('method');
  const [paymentMethod, setPaymentMethod] = useState<'yape' | 'card' | 'wallet' | null>(null);
  const [showThanks, setShowThanks] = useState(false);

  if (!isOpen) return null;

  const handlePaymentComplete = () => {
    setStep('rating');
  };

  const handleRatingSubmit = (rating: number, comment: string) => {
    setShowThanks(true);
    setTimeout(() => {
      setShowThanks(false);
      onClose();
      onPaymentComplete();
    }, 3000);
  };

  if (showThanks) {
    return <ThankYouModal isOpen={true} onClose={() => {}} />;
  }

  if (step === 'rating') {
    return (
      <RatingModal
        isOpen={true}
        onClose={() => {}}
        onSubmit={handleRatingSubmit}
        workerName={worker.name}
        service={worker.service}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {step === 'method' ? 'Método de Pago' : (
              paymentMethod === 'yape' ? 'Pago con Yape' :
              paymentMethod === 'card' ? 'Pago con Tarjeta' :
              'Billetera Virtual'
            )}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="p-4">
          {/* Service Summary */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center gap-4">
              <img
                src={worker.image}
                alt={worker.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium">{worker.service}</h3>
                <p className="text-gray-600">{worker.name}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-green-600">
                  S/. {worker.price?.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {step === 'method' ? (
            <div className="space-y-4">
              <button
                onClick={() => {
                  setPaymentMethod('wallet');
                  setStep('payment');
                }}
                className="w-full p-4 rounded-lg border text-left flex items-center gap-3 transition-colors hover:bg-gray-50"
              >
                <Wallet className="text-green-600" size={24} />
                <div>
                  <div className="font-medium">Billetera Virtual</div>
                  <div className="text-sm text-gray-500">Pago rápido y seguro</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setPaymentMethod('yape');
                  setStep('payment');
                }}
                className="w-full p-4 rounded-lg border text-left flex items-center gap-3 transition-colors hover:bg-gray-50"
              >
                <QrCode className="text-green-600" size={24} />
                <div>
                  <div className="font-medium">Yape</div>
                  <div className="text-sm text-gray-500">Pago inmediato con Yape</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setPaymentMethod('card');
                  setStep('payment');
                }}
                className="w-full p-4 rounded-lg border text-left flex items-center gap-3 transition-colors hover:bg-gray-50"
              >
                <CreditCard className="text-green-600" size={24} />
                <div>
                  <div className="font-medium">Tarjeta de Crédito/Débito</div>
                  <div className="text-sm text-gray-500">Visa, Mastercard, American Express</div>
                </div>
              </button>
            </div>
          ) : (
            <>
              {paymentMethod === 'yape' && (
                <YapePayment amount={worker.price || 0} onComplete={handlePaymentComplete} />
              )}
              {paymentMethod === 'card' && (
                <CardPayment amount={worker.price || 0} onComplete={handlePaymentComplete} />
              )}
              {paymentMethod === 'wallet' && (
                <VirtualWallet
                  balance={200} // Demo balance
                  amount={worker.price || 0}
                  onPay={handlePaymentComplete}
                />
              )}

              <button
                onClick={() => {
                  setPaymentMethod(null);
                  setStep('method');
                }}
                className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cambiar método de pago
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}