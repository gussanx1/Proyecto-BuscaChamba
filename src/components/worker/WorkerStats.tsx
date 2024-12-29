import React from 'react';
import { Star, DollarSign, Calendar, Clock } from 'lucide-react';

export function WorkerStats() {
  const stats = [
    {
      label: 'Calificación',
      value: '4.8',
      icon: Star,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      label: 'Ganancias del Mes',
      value: 'S/. 1,250',
      icon: DollarSign,
      color: 'bg-green-100 text-green-600'
    },
    {
      label: 'Trabajos Completados',
      value: '28',
      icon: Calendar,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      label: 'Horas Trabajadas',
      value: '156',
      icon: Clock,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}