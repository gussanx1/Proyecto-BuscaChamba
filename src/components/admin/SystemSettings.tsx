import React, { useState } from 'react';
import { Save, Bell, Lock, Globe, Moon, Mail, Zap, Server, RefreshCw } from 'lucide-react';

interface Setting {
  id: string;
  name: string;
  description: string;
  type: 'toggle' | 'select' | 'input' | 'number';
  value: any;
  options?: { label: string; value: string }[];
  category: 'general' | 'notifications' | 'security' | 'performance';
}

export function SystemSettings() {
  const [settings, setSettings] = useState<Setting[]>([
    {
      id: 'theme',
      name: 'Tema del sistema',
      description: 'Selecciona el tema predeterminado para todos los usuarios',
      type: 'select',
      value: 'light',
      options: [
        { label: 'Claro', value: 'light' },
        { label: 'Oscuro', value: 'dark' },
        { label: 'Sistema', value: 'system' }
      ],
      category: 'general'
    },
    {
      id: 'language',
      name: 'Idioma predeterminado',
      description: 'Idioma principal del sistema',
      type: 'select',
      value: 'es',
      options: [
        { label: 'Español', value: 'es' },
        { label: 'English', value: 'en' },
        { label: 'Português', value: 'pt' }
      ],
      category: 'general'
    },
    {
      id: 'maintenance',
      name: 'Modo mantenimiento',
      description: 'Activar modo mantenimiento del sistema',
      type: 'toggle',
      value: false,
      category: 'general'
    },
    {
      id: 'email_notifications',
      name: 'Notificaciones por correo',
      description: 'Enviar notificaciones por correo electrónico',
      type: 'toggle',
      value: true,
      category: 'notifications'
    },
    {
      id: 'push_notifications',
      name: 'Notificaciones push',
      description: 'Habilitar notificaciones push',
      type: 'toggle',
      value: true,
      category: 'notifications'
    },
    {
      id: 'notification_frequency',
      name: 'Frecuencia de notificaciones',
      description: 'Frecuencia de envío de resúmenes',
      type: 'select',
      value: 'daily',
      options: [
        { label: 'Inmediato', value: 'immediate' },
        { label: 'Diario', value: 'daily' },
        { label: 'Semanal', value: 'weekly' }
      ],
      category: 'notifications'
    },
    {
      id: 'two_factor',
      name: 'Autenticación de dos factores',
      description: 'Requerir 2FA para todos los usuarios',
      type: 'toggle',
      value: true,
      category: 'security'
    },
    {
      id: 'session_timeout',
      name: 'Tiempo de sesión',
      description: 'Tiempo de expiración de sesión (minutos)',
      type: 'number',
      value: 30,
      category: 'security'
    },
    {
      id: 'password_expiry',
      name: 'Expiración de contraseña',
      description: 'Días hasta expiración de contraseña',
      type: 'number',
      value: 90,
      category: 'security'
    },
    {
      id: 'cache_duration',
      name: 'Duración de caché',
      description: 'Tiempo de vida del caché (minutos)',
      type: 'number',
      value: 60,
      category: 'performance'
    },
    {
      id: 'api_rate_limit',
      name: 'Límite de API',
      description: 'Solicitudes por minuto permitidas',
      type: 'number',
      value: 100,
      category: 'performance'
    }
  ]);

  const [activeCategory, setActiveCategory] = useState('general');
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  const categories = [
    { id: 'general', name: 'General', icon: Globe },
    { id: 'notifications', name: 'Notificaciones', icon: Bell },
    { id: 'security', name: 'Seguridad', icon: Lock },
    { id: 'performance', name: 'Rendimiento', icon: Zap }
  ];

  const handleSettingChange = (settingId: string, newValue: any) => {
    setSettings(settings.map(setting =>
      setting.id === settingId ? { ...setting, value: newValue } : setting
    ));
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios
    setShowSaveConfirmation(true);
    setTimeout(() => setShowSaveConfirmation(false), 3000);
  };

  const renderSettingInput = (setting: Setting) => {
    switch (setting.type) {
      case 'toggle':
        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={setting.value}
              onChange={(e) => handleSettingChange(setting.id, e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        );
      
      case 'select':
        return (
          <select
            value={setting.value}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
          >
            {setting.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={setting.value}
            onChange={(e) => handleSettingChange(setting.id, parseInt(e.target.value))}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
          />
        );
      
      default:
        return (
          <input
            type="text"
            value={setting.value}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
          />
        );
    }
  };

  return (
    <div className="relative">
      {/* Save Confirmation */}
      <div
        className={`fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 flex items-center gap-2 ${
          showSaveConfirmation
            ? 'translate-y-0 opacity-100'
            : '-translate-y-12 opacity-0'
        }`}
      >
        <Save size={20} />
        <span>Configuración guardada correctamente</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Categories */}
        <div className="lg:w-64 space-y-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeCategory === category.id
                    ? 'bg-purple-50 text-purple-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Settings */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="space-y-6">
              {settings
                .filter(setting => setting.category === activeCategory)
                .map((setting) => (
                  <div key={setting.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b last:border-b-0">
                    <div>
                      <label htmlFor={setting.id} className="block text-sm font-medium text-gray-700">
                        {setting.name}
                      </label>
                      <p className="mt-1 text-sm text-gray-500">{setting.description}</p>
                    </div>
                    <div className="sm:w-64 flex justify-end">
                      {renderSettingInput(setting)}
                    </div>
                  </div>
                ))}
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Save size={20} />
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}