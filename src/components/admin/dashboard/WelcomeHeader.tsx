import React from 'react';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export function WelcomeHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl p-6 text-white shadow-lg"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white/10 rounded-full backdrop-blur-lg">
          <Activity className="w-8 h-8" />
        </div>
        <div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold"
          >
            ¡Bienvenido al Panel de Administración!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/90"
          >
            Gestiona y monitorea el rendimiento de la plataforma en tiempo real
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}