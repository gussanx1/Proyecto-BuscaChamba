import React, { useState } from 'react';
import { Shield, AlertCircle, LockKeyhole } from 'lucide-react';
import { authenticator } from 'otplib';

interface TwoFactorVerifyProps {
  secret: string;
  onVerify: () => void;
  onCancel: () => void;
}

export function TwoFactorVerify({ secret, onVerify, onCancel }: TwoFactorVerifyProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  // Para propósitos de demostración, aceptamos '123456' como código válido
  const handleVerify = () => {
    if (code === '123456') {
      onVerify();
    } else {
      setError('Código incorrecto. Para esta demo, usa: 123456');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6">
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-emerald-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Verificación de Dos Factores</h2>
          <p className="text-gray-600">
            Ingresa el código de verificación
          </p>
        </div>

        <div className="space-y-6">
          {/* Demo Notice */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700">
              <LockKeyhole size={20} />
              <p className="font-medium">Modo Demo</p>
            </div>
            <p className="mt-1 text-blue-600">
              Para esta demostración, usa el código: <span className="font-mono font-bold">123456</span>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código de verificación
            </label>
            <input
              type="text"
              maxLength={6}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-center text-2xl font-mono tracking-wider"
              placeholder="000000"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                setError('');
              }}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleVerify}
              disabled={code.length !== 6}
              className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Verificar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}