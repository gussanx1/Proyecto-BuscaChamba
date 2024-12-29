import React, { useState } from 'react';
import { Wallet, CreditCard, QrCode, ArrowRight, Shield } from 'lucide-react';

interface VirtualWalletProps {
  balance: number;
  amount: number;
  onPay: () => void;
}

export function VirtualWallet({ balance, amount, onPay }: VirtualWalletProps) {
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      onPay();
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="w-8 h-8" />
          <div>
            <p className="text-sm text-white/80">Saldo disponible</p>
            <p className="text-2xl font-bold">S/. {balance.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/80">A pagar</p>
            <p className="text-xl font-semibold">S/. {amount.toFixed(2)}</p>
          </div>
          <Shield className="w-6 h-6 text-white/80" />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-medium mb-3">Métodos de recarga</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <CreditCard className="text-gray-600" />
              <span>Tarjeta de crédito/débito</span>
            </div>
            <ArrowRight className="text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <QrCode className="text-gray-600" />
              <span>Yape / Plin</span>
            </div>
            <ArrowRight className="text-gray-400" />
          </button>
        </div>
      </div>

      <button
        onClick={handlePay}
        disabled={loading || balance < amount}
        className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 ${
          loading || balance < amount
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700'
        } text-white transition-colors`}
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Procesando...</span>
          </>
        ) : balance < amount ? (
          'Saldo insuficiente'
        ) : (
          'Pagar ahora'
        )}
      </button>

      {balance < amount && (
        <p className="text-sm text-red-600 text-center">
          Necesitas recargar S/. {(amount - balance).toFixed(2)} para realizar este pago
        </p>
      )}
    </div>
  );
}