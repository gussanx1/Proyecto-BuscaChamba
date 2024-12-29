import React, { useState } from 'react';
import { X, Bell, Lock, Globe, Moon, HelpCircle, LogOut, ArrowLeft } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function SettingsModal({ isOpen, onClose, onLogout }: SettingsModalProps) {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false
  });
  const [privacy, setPrivacy] = useState({
    profile: 'public',
    location: true,
    activity: true
  });
  const [language, setLanguage] = useState('es');
  const [theme, setTheme] = useState('light');
  const [activeSection, setActiveSection] = useState('');

  if (!isOpen) return null;

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'notifications':
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg mb-4">Notificaciones</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span>Notificaciones por correo</span>
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                  className="w-4 h-4 text-green-600"
                />
              </label>
              <label className="flex items-center justify-between">
                <span>Notificaciones push</span>
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                  className="w-4 h-4 text-green-600"
                />
              </label>
              <label className="flex items-center justify-between">
                <span>Notificaciones SMS</span>
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                  className="w-4 h-4 text-green-600"
                />
              </label>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg mb-4">Privacidad</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Visibilidad del perfil</label>
                <select
                  value={privacy.profile}
                  onChange={(e) => setPrivacy({...privacy, profile: e.target.value})}
                  className="w-full p-2 border rounded"
                >
                  <option value="public">Público</option>
                  <option value="private">Privado</option>
                  <option value="contacts">Solo contactos</option>
                </select>
              </div>
              <label className="flex items-center justify-between">
                <span>Compartir ubicación</span>
                <input
                  type="checkbox"
                  checked={privacy.location}
                  onChange={(e) => setPrivacy({...privacy, location: e.target.checked})}
                  className="w-4 h-4 text-green-600"
                />
              </label>
              <label className="flex items-center justify-between">
                <span>Mostrar actividad</span>
                <input
                  type="checkbox"
                  checked={privacy.activity}
                  onChange={(e) => setPrivacy({...privacy, activity: e.target.checked})}
                  className="w-4 h-4 text-green-600"
                />
              </label>
            </div>
          </div>
        );

      case 'language':
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg mb-4">Idioma</h3>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="pt">Português</option>
            </select>
          </div>
        );

      case 'theme':
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg mb-4">Tema</h3>
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="light"
                  checked={theme === 'light'}
                  onChange={(e) => setTheme(e.target.value)}
                  className="mr-2"
                />
                Claro
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="dark"
                  checked={theme === 'dark'}
                  onChange={(e) => setTheme(e.target.value)}
                  className="mr-2"
                />
                Oscuro
              </label>
            </div>
          </div>
        );

      case 'help':
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg mb-4">Centro de Ayuda</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded">
                Preguntas frecuentes
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded">
                Contactar soporte
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded">
                Reportar un problema
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded">
                Guía de uso
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            {settingsOptions.map((option) => (
              <button
                key={option.label}
                onClick={() => setActiveSection(option.id)}
                className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="text-gray-600">{option.icon}</div>
                <div className="text-left flex-1">
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-gray-500">{option.description}</div>
                </div>
              </button>
            ))}
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Cerrar sesión</span>
            </button>
          </div>
        );
    }
  };

  const settingsOptions = [
    {
      id: 'notifications',
      icon: <Bell size={20} />,
      label: 'Notificaciones',
      description: 'Gestionar alertas y avisos'
    },
    {
      id: 'privacy',
      icon: <Lock size={20} />,
      label: 'Privacidad',
      description: 'Configurar visibilidad y datos'
    },
    {
      id: 'language',
      icon: <Globe size={20} />,
      label: 'Idioma',
      description: 'Cambiar idioma de la aplicación'
    },
    {
      id: 'theme',
      icon: <Moon size={20} />,
      label: 'Tema',
      description: 'Cambiar entre claro y oscuro'
    },
    {
      id: 'help',
      icon: <HelpCircle size={20} />,
      label: 'Ayuda',
      description: 'Centro de soporte'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">
            {activeSection ? (
              <button
                onClick={() => setActiveSection('')}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                Volver
              </button>
            ) : (
              'Ajustes'
            )}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}