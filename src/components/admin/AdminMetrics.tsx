import React from 'react';
import { TrendingUp, Users, Briefcase, DollarSign, BarChart2 } from 'lucide-react';

export function AdminMetrics() {
  const metrics = [
    {
      title: 'Usuarios Activos',
      subtitle: 'Base de usuarios mensual',
      description: 'Total de usuarios que han interactuado con la plataforma en los últimos 30 días',
      value: '2,847',
      change: '+12.5%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Servicios Completados',
      subtitle: 'Trabajos finalizados',
      description: 'Número total de servicios exitosamente completados este mes',
      value: '1,234',
      change: '+8.2%',
      icon: Briefcase,
      color: 'bg-green-500'
    },
    {
      title: 'Ingresos Totales',
      subtitle: 'Facturación mensual',
      description: 'Ingresos totales generados por comisiones y servicios premium',
      value: 'S/. 45,678',
      change: '+15.3%',
      icon: DollarSign,
      color: 'bg-yellow-500'
    },
    {
      title: 'Tasa de Crecimiento',
      subtitle: 'Expansión mensual',
      description: 'Porcentaje de crecimiento en comparación con el mes anterior',
      value: '23.5%',
      change: '+5.4%',
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-100 rounded-lg">
          <BarChart2 className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Indicadores Clave de Rendimiento</h2>
          <p className="text-gray-600">Métricas principales del desempeño de la plataforma en tiempo real</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-4 md:p-6 transform hover:scale-105 transition-transform duration-200"
            >
              <div className="flex items-center justify-between">
                <div className={`${metric.color} p-3 rounded-lg`}>
                  <Icon className="text-white w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="text-green-600 text-sm font-medium">
                  {metric.change}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-sm md:text-base text-gray-600">{metric.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{metric.subtitle}</p>
                <p className="mt-2 text-xl md:text-2xl font-bold">{metric.value}</p>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">{metric.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}