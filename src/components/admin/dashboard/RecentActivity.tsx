import React from 'react';
import { Clock, CheckCircle, AlertTriangle, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface Activity {
  id: number;
  type: 'success' | 'warning' | 'info';
  message: string;
  time: string;
  user?: string;
}

export function RecentActivity() {
  const activities: Activity[] = [
    {
      id: 1,
      type: 'success',
      message: 'Nuevo trabajador verificado exitosamente',
      time: 'Hace 5 minutos',
      user: 'Carlos Mendoza'
    },
    {
      id: 2,
      type: 'warning',
      message: 'Intento de acceso no autorizado detectado',
      time: 'Hace 15 minutos'
    },
    {
      id: 3,
      type: 'info',
      message: 'Actualización del sistema completada',
      time: 'Hace 1 hora'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-purple-600" />
        Actividad Reciente
      </h3>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border ${getActivityColor(activity.type)} flex items-start gap-3`}
          >
            {getIcon(activity.type)}
            <div className="flex-1">
              <p className="text-gray-800">{activity.message}</p>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                <span>{activity.time}</span>
                {activity.user && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{activity.user}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}