import React from 'react';
import { WorkerDashboard } from './worker/WorkerDashboard';

interface WorkerJobsScreenProps {
  currentUser: {
    name: string;
    image: string;
    service?: string;
  };
  onLogout: () => void;
}

export function WorkerJobsScreen({ currentUser, onLogout }: WorkerJobsScreenProps) {
  return <WorkerDashboard currentUser={currentUser} onLogout={onLogout} />;
}