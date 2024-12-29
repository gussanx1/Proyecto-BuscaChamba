import React from 'react';
import { BarChart3, Users, Brain, Settings, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const QuickAction = ({ icon, title, description, onClick }: QuickActionProps) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full group"
  >
    <div className="p-3 rounded-lg bg-purple-100 text-purple-600 group-hover:bg-purple-200 transition-colors">
      {icon}
    </div>
    <div className="flex-1 text-left">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transform group-hover:translate-x-1 transition-all" />
  </motion.button>
);

interface QuickActionsProps {
  onActionSelect: (section: string) => void;
}

export function QuickActions({ onActionSelect }: QuickActionsProps) {
  const actions = [
    {
      id: 'algorithm',
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Reporte de Algoritmo',
      description: 'Ver métricas y análisis detallado'
    },
    {
      id: 'recommendations',
      icon: <Brain className="w-6 h-6" />,
      title: 'Recomendaciones IA',
      description: 'Insights y sugerencias del sistema'
    },
    {
      id: 'users',
      icon: <Users className="w-6 h-6" />,
      title: 'Gestión de Usuarios',
      description: 'Administrar usuarios y permisos'
    },
    {
      id: 'settings',
      icon: <Settings className="w-6 h-6" />,
      title: 'Configuración',
      description: 'Ajustes del sistema'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {actions.map((action, index) => (
        <QuickAction
          key={index}
          icon={action.icon}
          title={action.title}
          description={action.description}
          onClick={() => onActionSelect(action.id)}
        />
      ))}
    </div>
  );
}