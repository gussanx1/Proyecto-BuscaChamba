import React, { useState } from 'react';
import { LoginModal } from './LoginModal';
import { UserCircle2, Briefcase } from 'lucide-react';

interface AuthButtonsProps {
  onLogin: (userData: any) => void;
}

export function AuthButtons({ onLogin }: AuthButtonsProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userType, setUserType] = useState<'user' | 'worker'>('user');

  const handleLoginClick = (type: 'user' | 'worker') => {
    setUserType(type);
    setShowLoginModal(true);
  };

  return (
    <>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          onClick={() => handleLoginClick('user')}
          className="group relative w-full bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 transform -skew-x-12 group-hover:skew-x-12 transition-transform duration-300" />
          <div className="relative flex items-center justify-center gap-3">
            <UserCircle2 size={24} />
            <span className="text-lg font-semibold">Soy Usuario</span>
          </div>
          <div className="mt-1 text-sm text-white/80 text-center">
            Encuentra servicios profesionales
          </div>
        </button>

        <button
          onClick={() => handleLoginClick('worker')}
          className="group relative w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 transform skew-x-12 group-hover:-skew-x-12 transition-transform duration-300" />
          <div className="relative flex items-center justify-center gap-3">
            <Briefcase size={24} />
            <span className="text-lg font-semibold">Soy Trabajador</span>
          </div>
          <div className="mt-1 text-sm text-white/80 text-center">
            Ofrece tus servicios y crece
          </div>
        </button>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={onLogin}
        userType={userType}
      />
    </>
  );
}