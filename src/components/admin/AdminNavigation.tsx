import React from 'react';
import { BarChart3, Brain, Users, Settings, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminNavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

export function AdminNavigation({ currentSection, onNavigate }: AdminNavigationProps) {
  const navItems = [
    { id: 'welcome', icon: Home, label: 'Inicio' },
    { id: 'algorithm', icon: BarChart3, label: 'Algoritmo' },
    { id: 'recommendations', icon: Brain, label: 'IA' },
    { id: 'users', icon: Users, label: 'Usuarios' },
    { id: 'settings', icon: Settings, label: 'Ajustes' }
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;

            return (
              <motion.button
                key={item.id}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 py-4 px-3 border-b-2 transition-colors ${
                  isActive
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}