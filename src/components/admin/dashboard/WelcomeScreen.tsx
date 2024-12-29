import React from 'react';
import { motion } from 'framer-motion';
import { WelcomeHeader } from './WelcomeHeader';
import { WelcomeStats } from './WelcomeStats';
import { QuickActions } from './QuickActions';
import { RecentActivity } from './RecentActivity';
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface WelcomeScreenProps {
  onSectionChange: (section: string) => void;
}

export function WelcomeScreen({ onSectionChange }: WelcomeScreenProps) {
  const systemHealth = [
    {
      title: 'Estado del Sistema',
      value: '99.9%',
      status: 'success',
      description: 'Todos los sistemas funcionando correctamente'
    },
    {
      title: 'Tiempo de Respuesta',
      value: '120ms',
      status: 'warning',
      description: 'Ligeramente por encima del objetivo de 100ms'
    },
    {
      title: 'Errores (24h)',
      value: '0.02%',
      status: 'success',
      description: 'Tasa de error dentro de límites aceptables'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <WelcomeHeader />
      
      <WelcomeStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <QuickActions onActionSelect={onSectionChange} />
          
          {/* System Health */}
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="text-purple-600" />
                Estado del Sistema
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {systemHealth.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{item.title}</span>
                    {item.status === 'success' ? (
                      <CheckCircle className="text-green-500" size={16} />
                    ) : (
                      <AlertTriangle className="text-yellow-500" size={16} />
                    )}
                  </div>
                  <div className="text-2xl font-bold mb-1">{item.value}</div>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity and Additional Info */}
        <div className="space-y-6">
          <RecentActivity />
          
          {/* Additional System Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold mb-4">Información del Sistema</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Versión</span>
                <span className="font-medium">2.1.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Última actualización</span>
                <span className="font-medium">Hace 2 días</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Base de datos</span>
                <span className="text-green-600 font-medium">Conectada</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">API</span>
                <span className="text-green-600 font-medium">Operativa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}