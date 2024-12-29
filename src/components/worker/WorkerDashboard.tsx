import React, { useState } from 'react';
import { Settings, LogOut } from 'lucide-react';
import { WorkerStats } from './WorkerStats';
import { WorkerJobs } from './WorkerJobs';
import { WorkerHeader } from './WorkerHeader';
import { WorkerProfileDetails } from './WorkerProfileDetails';
import { SettingsModal } from '../SettingsModal';

interface WorkerDashboardProps {
  currentUser: {
    name: string;
    image: string;
    service?: string;
    email?: string;
    phone?: string;
    category?: string;
    location?: string;
    description?: string;
    experience?: string;
    serviceHours?: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
  };
  onLogout: () => void;
}

export function WorkerDashboard({ currentUser, onLogout }: WorkerDashboardProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<'jobs' | 'profile'>('jobs');

  return (
    <div className="min-h-screen bg-gray-50">
      <WorkerHeader 
        currentUser={currentUser}
        onSettingsClick={() => setShowSettings(true)}
      />

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-4 border-b">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'jobs'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            Solicitudes
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'profile'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            Mi Perfil
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'jobs' ? (
          <div className="space-y-6">
            <WorkerStats />
            <WorkerJobs currentUser={currentUser} />
          </div>
        ) : (
          <WorkerProfileDetails worker={currentUser} />
        )}
      </div>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onLogout={onLogout}
      />
    </div>
  );
}