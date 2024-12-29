import React, { useState, useRef } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Briefcase, Camera, Upload, ChevronDown } from 'lucide-react';
import { TwoFactorSetup } from './TwoFactorSetup';
import { TwoFactorVerify } from './TwoFactorVerify';
import { fileToBase64, validateImageFile } from '../../utils/imageUtils';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData: any) => void;
  userType: 'user' | 'worker';
}

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
  category?: string;
  service?: string;
  description?: string;
  location?: string;
  profilePhoto?: string;
}

export function LoginModal({ isOpen, onClose, onLogin, userType }: LoginModalProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [show2FAVerify, setShow2FAVerify] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    category: '',
    service: '',
    description: '',
    location: '',
    profilePhoto: ''
  });

  if (!isOpen) return null;

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!validateImageFile(file)) {
        alert('Por favor selecciona una imagen válida (JPG, PNG o GIF, máximo 5MB)');
        return;
      }

      try {
        const base64Image = await fileToBase64(file);
        setFormData(prev => ({ ...prev, profilePhoto: base64Image }));
      } catch (error) {
        console.error('Error al procesar la imagen:', error);
        alert('Error al procesar la imagen. Por favor, intenta con otra.');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isRegistering) {
      if (!formData.email || !formData.password) {
        setError('Por favor completa todos los campos');
        return;
      }

      // Verificar credenciales de administrador
      if (formData.email === 'admin@buscachamba.com' && formData.password === 'admin123') {
        onLogin({
          id: 'admin-1',
          email: formData.email,
          name: 'Administrador',
          type: 'admin',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
        });
        onClose();
        return;
      }

      setShow2FAVerify(true);
      return;
    }

    if (currentStep === 1) {
      if (!formData.name || !formData.email || !formData.phone) {
        setError('Por favor completa todos los campos');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError('Por favor ingresa un email válido');
        return;
      }
      if (!/^\d{9}$/.test(formData.phone)) {
        setError('Por favor ingresa un número de teléfono válido (9 dígitos)');
        return;
      }
      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      if (!validatePassword(formData.password)) {
        setError('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
      }
      if (userType === 'worker') {
        setCurrentStep(3);
        return;
      }
      setShow2FASetup(true);
      return;
    }

    if (currentStep === 3 && userType === 'worker') {
      if (!formData.category || !formData.service || !formData.description || !formData.location) {
        setError('Por favor completa todos los campos');
        return;
      }
      setShow2FASetup(true);
      return;
    }
  };

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  };

  const handle2FAComplete = (secret: string) => {
    const userData = {
      id: Date.now().toString(),
      email: formData.email,
      name: formData.name,
      type: userType,
      profilePhoto: formData.profilePhoto,
      image: formData.profilePhoto || (
        userType === 'user'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'
          : 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop'
      ),
      category: formData.category,
      service: formData.service,
      location: formData.location
    };
    onLogin(userData);
    onClose();
  };

  if (show2FAVerify) {
    return (
      <TwoFactorVerify
        secret="DEMO2FASECRET"
        onVerify={() => {
          const userData = {
            id: Date.now().toString(),
            email: formData.email,
            name: userType === 'user' ? 'José Sánchez' : 'Carlos Mendoza',
            type: userType,
            image: formData.profilePhoto || `https://images.unsplash.com/photo-${userType === 'user' ? '1534528741775-53994a69daeb' : '1506794778202-cad84cf45f1d'}?w=200&h=200&fit=crop`,
            service: userType === 'worker' ? 'Fontanería' : undefined
          };
          onLogin(userData);
          onClose();
        }}
        onCancel={() => setShow2FAVerify(false)}
      />
    );
  }

  if (show2FASetup) {
    return (
      <TwoFactorSetup
        email={formData.email}
        onComplete={handle2FAComplete}
        onCancel={() => setShow2FASetup(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && currentStep === 1 && (
              <>
                <div className="flex flex-col items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      {formData.profilePhoto ? (
                        <img
                          src={formData.profilePhoto}
                          alt="Profile preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Camera size={32} className="text-gray-400" />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                    >
                      <Upload size={16} />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/gif"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Sube una foto de perfil (opcional)
                  </p>
                  {formData.profilePhoto && (
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, profilePhoto: '' }))}
                      className="text-red-600 text-sm hover:text-red-700"
                    >
                      Eliminar foto
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>
              </>
            )}

            {(!isRegistering || currentStep === 1) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>
            )}

            {(!isRegistering || currentStep === 2) && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {isRegistering && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmar contraseña
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>
                )}
              </>
            )}

            {isRegistering && currentStep === 3 && userType === 'worker' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría de servicio
                  </label>
                  <div className="relative">
                    <select
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value, service: '' })}
                    >
                      <option value="">Selecciona una categoría</option>
                      <option value="domestic">Servicios Domésticos</option>
                      <option value="maintenance">Servicios de mantenimiento</option>
                      <option value="public">Servicios Públicos</option>
                    </select>
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>

                {formData.category && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Servicio específico
                    </label>
                    <div className="bg-gray-50 rounded-lg p-2 max-h-40 overflow-y-auto">
                      {formData.category === 'domestic' && (
                        ['Limpieza', 'Jardinería', 'Cocina', 'Lavandería', 'Cuidado de mascotas'].map((service) => (
                          <label
                            key={service}
                            className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
                              formData.service === service
                                ? 'bg-green-100 text-green-800'
                                : 'hover:bg-gray-100'
                            }`}
                          >
                            <input
                              type="radio"
                              name="service"
                              value={service}
                              checked={formData.service === service}
                              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                              className="hidden"
                            />
                            <span>{service}</span>
                          </label>
                        ))
                      )}
                      {formData.category === 'maintenance' && (
                        ['Fontanería', 'Electricidad', 'Carpintería', 'Pintura', 'Albañilería'].map((service) => (
                          <label
                            key={service}
                            className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
                              formData.service === service
                                ? 'bg-green-100 text-green-800'
                                : 'hover:bg-gray-100'
                            }`}
                          >
                            <input
                              type="radio"
                              name="service"
                              value={service}
                              checked={formData.service === service}
                              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                              className="hidden"
                            />
                            <span>{service}</span>
                          </label>
                        ))
                      )}
                      {formData.category === 'public' && (
                        ['Transporte', 'Mensajería', 'Seguridad', 'Limpieza pública', 'Mantenimiento de áreas verdes'].map((service) => (
                          <label
                            key={service}
                            className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
                              formData.service === service
                                ? 'bg-green-100 text-green-800'
                                : 'hover:bg-gray-100'
                            }`}
                          >
                            <input
                              type="radio"
                              name="service"
                              value={service}
                              checked={formData.service === service}
                              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                              className="hidden"
                            />
                            <span>{service}</span>
                          </label>
                        ))
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción de tu servicio
                  </label>
                  <textarea
                    className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe tu experiencia y habilidades en este servicio..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ubicación
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>
              </>
            )}

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              {isRegistering
                ? currentStep < (userType === 'worker' ? 3 : 2)
                  ? 'Siguiente'
                  : 'Registrarse'
                : 'Iniciar sesión'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setCurrentStep(1);
                setError('');
                setFormData({
                  email: '',
                  password: '',
                  confirmPassword: '',
                  name: '',
                  phone: '',
                  category: '',
                  service: '',
                  description: '',
                  location: '',
                  profilePhoto: ''
                });
              }}
              className="text-green-600 hover:text-green-700"
            >
              {isRegistering
                ? '¿Ya tienes cuenta? Inicia sesión'
                : '¿No tienes cuenta? Regístrate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}