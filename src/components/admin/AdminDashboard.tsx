// src/components/admin/AdminDashboard.tsx
import React, { useState } from 'react';
import { Download, LogOut } from 'lucide-react';
import { AlgorithmReport } from './AlgorithmReport';
import { AdminMetrics } from './AdminMetrics';
import { UserManagement } from './UserManagement';
import { SystemSettings } from './SystemSettings';
import { AIRecommendations } from './AIRecommendations';
import { WelcomeScreen } from './dashboard/WelcomeScreen';
import { AdminNavigation } from './AdminNavigation';
import { generateAdminReport } from '../../utils/reportGenerator'; // Ajusta la ruta según tu estructura

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [currentSection, setCurrentSection] = useState('welcome');

  const generatePDFReport = async () => {
    try {
      // Si necesitas pasar datos específicos, ajústalo aquí. Por ahora, usamos datos vacíos.
      await generateAdminReport({});
    } catch (error) {
      console.error('Error al generar el reporte PDF:', error);
      alert('Ocurrió un error al generar el reporte. Por favor, intenta nuevamente.');
    }
  };

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'welcome':
        return <WelcomeScreen onSectionChange={handleNavigate} />;
      case 'algorithm':
        return (
          <>
            <AdminMetrics />
            <div className="mt-6">
              <AlgorithmReport />
            </div>
          </>
        );
      case 'recommendations':
        return <AIRecommendations />;
      case 'users':
        return <UserManagement />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <WelcomeScreen onSectionChange={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold text-gray-900">
              Panel de Administración
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={generatePDFReport}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Download size={20} />
                <span>Exportar Reporte</span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut size={20} />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <AdminNavigation
        currentSection={currentSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>
    </div>
  );
}
