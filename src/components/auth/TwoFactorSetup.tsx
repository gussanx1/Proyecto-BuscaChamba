import React, { useState } from 'react';
import { Shield, Copy, CheckCircle, AlertCircle } from 'lucide-react';

interface TwoFactorSetupProps {
  email: string;
  onComplete: (secret: string) => void;
  onCancel: () => void;
}

export function TwoFactorSetup({ email, onComplete, onCancel }: TwoFactorSetupProps) {
  // For demo purposes, we'll use a fixed secret
  const secret = 'DEMO2FASECRET123';
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Demo QR code URL (in a real app, this would be generated properly)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/BuscaChamba:${email}?secret=${secret}&issuer=BuscaChamba`;

  const handleVerify = () => {
    // For demo purposes, accept any 6-digit code
    if (verificationCode.length === 6) {
      onComplete(secret);
    } else {
      setError('Código incorrecto. Por favor, inténtalo de nuevo.');
    }
  };

  const copySecret = () => {
    navigator.clipboard.writeText(secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6">
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-emerald-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Configurar Autenticación de Dos Factores</h2>
          <p className="text-gray-600">
            Mejora la seguridad de tu cuenta configurando la autenticación de dos factores
          </p>
        </div>

        <div className="space-y-6">
          {/* QR Code */}
          <div className="flex justify-center">
            <div className="p-4 bg-white border-2 border-gray-200 rounded-lg">
              <img src={qrCodeUrl} alt="QR Code" className="w-[200px] h-[200px]" />
            </div>
          </div>

          {/* Manual Entry */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              Si no puedes escanear el código QR, ingresa esta clave manualmente:
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-white px-3 py-2 rounded border text-sm font-mono">
                {secret}
              </code>
              <button
                onClick={copySecret}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Copiar clave"
              >
                {copied ? <CheckCircle className="text-green-600" size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>

          {/* Verification */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ingresa el código de verificación
            </label>
            <input
              type="text"
              maxLength={6}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="000000"
              value={verificationCode}
              onChange={(e) => {
                setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6));
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
              disabled={verificationCode.length !== 6}
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