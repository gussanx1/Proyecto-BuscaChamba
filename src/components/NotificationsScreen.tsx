import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  Calendar, 
  AlertTriangle,
  MessageSquare,
  DollarSign,
  Star,
  Shield,
  Award,
  Trash2
} from 'lucide-react';

export function NotificationsScreen() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'service_completed',
      title: 'Servicio Completado',
      message: 'Juan Pérez ha completado el servicio de fontanería. ¿Podrías calificarlo?',
      time: '2h',
      read: false,
      worker: {
        name: 'Juan Pérez',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop'
      }
    },
    {
      id: 2,
      type: 'service_scheduled',
      title: 'Servicio Programado',
      message: 'Tu servicio de electricidad con María García está programado para mañana a las 10:00 AM',
      time: '5h',
      read: true,
      worker: {
        name: 'María García',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop'
      }
    },
    {
      id: 3,
      type: 'service_started',
      title: 'Servicio Iniciado',
      message: 'Carlos López ha iniciado el servicio de carpintería',
      time: '1d',
      read: true,
      worker: {
        name: 'Carlos López',
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop'
      }
    },
    {
      id: 4,
      type: 'payment_received',
      title: 'Pago Recibido',
      message: 'Has recibido un pago de S/. 120.00 por el servicio de jardinería',
      time: '3h',
      read: false
    },
    {
      id: 5,
      type: 'new_message',
      title: 'Nuevo Mensaje',
      message: 'Ana Torres te ha enviado un mensaje sobre el servicio de limpieza',
      time: '30m',
      read: false,
      worker: {
        name: 'Ana Torres',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop'
      }
    },
    {
      id: 6,
      type: 'urgent_request',
      title: 'Solicitud Urgente',
      message: 'Solicitud urgente de fontanería en tu zona',
      time: '15m',
      read: false
    },
    {
      id: 7,
      type: 'promotion',
      title: '¡Oferta Especial!',
      message: '50% de descuento en tu próximo servicio de limpieza',
      time: '4h',
      read: true
    },
    {
      id: 8,
      type: 'achievement',
      title: '¡Nueva Insignia!',
      message: 'Has desbloqueado la insignia "Cliente Frecuente"',
      time: '2d',
      read: true
    },
    {
      id: 9,
      type: 'verification',
      title: 'Cuenta Verificada',
      message: 'Tu cuenta ha sido verificada exitosamente',
      time: '3d',
      read: true
    }
  ]);

  const [filter, setFilter] = useState('all');

  const getIcon = (type: string) => {
    switch (type) {
      case 'service_completed':
        return <CheckCircle className="text-green-600" size={24} />;
      case 'service_scheduled':
        return <Calendar className="text-blue-600" size={24} />;
      case 'service_started':
        return <Clock className="text-orange-600" size={24} />;
      case 'payment_received':
        return <DollarSign className="text-emerald-600" size={24} />;
      case 'new_message':
        return <MessageSquare className="text-purple-600" size={24} />;
      case 'urgent_request':
        return <AlertTriangle className="text-red-600" size={24} />;
      case 'promotion':
        return <Award className="text-yellow-600" size={24} />;
      case 'achievement':
        return <Star className="text-amber-600" size={24} />;
      case 'verification':
        return <Shield className="text-indigo-600" size={24} />;
      default:
        return <Bell className="text-gray-600" size={24} />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'service_completed':
        return 'border-green-600';
      case 'service_scheduled':
        return 'border-blue-600';
      case 'service_started':
        return 'border-orange-600';
      case 'payment_received':
        return 'border-emerald-600';
      case 'new_message':
        return 'border-purple-600';
      case 'urgent_request':
        return 'border-red-600';
      case 'promotion':
        return 'border-yellow-600';
      case 'achievement':
        return 'border-amber-600';
      case 'verification':
        return 'border-indigo-600';
      default:
        return 'border-gray-200';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="bg-white sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Notificaciones</h1>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                Marcar todas como leídas
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === 'unread'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              No leídas
            </button>
            <button
              onClick={() => setFilter('service_completed')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === 'service_completed'
                  ? 'bg-green-600 text-white'
                  : 'bg-green-50 text-green-600 hover:bg-green-100'
              }`}
            >
              Servicios Completados
            </button>
            <button
              onClick={() => setFilter('urgent_request')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === 'urgent_request'
                  ? 'bg-red-600 text-white'
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
              }`}
            >
              Urgentes
            </button>
          </div>
        </div>
      </header>

      {/* Notifications List */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow-sm p-4 border-l-4 transition-all ${
                getBorderColor(notification.type)
              } ${
                !notification.read ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{notification.title}</h3>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                    </div>
                    <span className="text-sm text-gray-500">{notification.time}</span>
                  </div>
                  
                  {notification.worker && (
                    <div className="flex items-center gap-2 mt-3">
                      <img
                        src={notification.worker.image}
                        alt={notification.worker.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-600">
                        {notification.worker.name}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex gap-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-sm text-green-600 hover:text-green-700"
                        >
                          Marcar como leída
                        </button>
                      )}
                      {notification.type === 'service_completed' && (
                        <button className="text-sm text-blue-600 hover:text-blue-700">
                          Calificar servicio
                        </button>
                      )}
                      {notification.type === 'new_message' && (
                        <button className="text-sm text-purple-600 hover:text-purple-700">
                          Responder
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredNotifications.length === 0 && (
            <div className="text-center py-8">
              <Bell className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500">No hay notificaciones {filter !== 'all' && 'de este tipo'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}