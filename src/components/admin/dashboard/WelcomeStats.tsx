import React from 'react';
import { Activity, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, change, icon, color }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${color}`}
  >
    <div className="flex items-center justify-between">
      <div className={`p-3 rounded-lg ${color.replace('border-', 'bg-').replace('-600', '-100')}`}>
        {icon}
      </div>
      <span className={`text-sm font-medium ${
        change.startsWith('+') ? 'text-green-600' : 'text-red-600'
      }`}>
        {change}
      </span>
    </div>
    <h3 className="mt-4 text-2xl font-bold">{value}</h3>
    <p className="text-gray-600">{title}</p>
  </motion.div>
);

export function WelcomeStats() {
  const stats = [
    {
      title: 'Usuarios Activos',
      value: '2,847',
      change: '+12.5%',
      icon: <Users className="w-6 h-6 text-purple-600" />,
      color: 'border-purple-600'
    },
    {
      title: 'Servicios Completados',
      value: '1,234',
      change: '+8.2%',
      icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
      color: 'border-blue-600'
    },
    {
      title: 'Tasa de Éxito',
      value: '95.8%',
      change: '+2.3%',
      icon: <Activity className="w-6 h-6 text-green-600" />,
      color: 'border-green-600'
    },
    {
      title: 'Crecimiento Mensual',
      value: '15.3%',
      change: '+5.4%',
      icon: <TrendingUp className="w-6 h-6 text-yellow-600" />,
      color: 'border-yellow-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
}