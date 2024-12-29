import React, { useState } from 'react';
import { WorkerJobCard } from './WorkerJobCard';
import { WorkEvidenceModal } from './WorkEvidenceModal';
import { Filter, AlertTriangle } from 'lucide-react';

interface WorkerJobsProps {
  currentUser: {
    name: string;
    image: string;
    service?: string;
  };
}

export function WorkerJobs({ currentUser }: WorkerJobsProps) {
  const [showEvidence, setShowEvidence] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'urgent' | 'completed'>('all');

  const jobs = [
    {
      id: 1,
      client: {
        name: 'María García',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
      },
      service: currentUser.service || 'Servicio',
      status: 'pending',
      urgency: 'urgent',
      date: '2024-03-20',
      time: '14:00',
      location: 'Trujillo Centro',
      description: 'Necesito ayuda con una reparación urgente. Fuga de agua en la cocina.',
      budget: 150.00
    },
    {
      id: 2,
      client: {
        name: 'Juan Pérez',
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop'
      },
      service: currentUser.service || 'Servicio',
      status: 'completed',
      urgency: 'normal',
      date: '2024-03-21',
      time: '10:00',
      location: 'La Esperanza',
      description: 'Mantenimiento regular programado.',
      budget: 120.00,
      evidence: {
        before: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=300&fit=crop'],
        after: ['https://images.unsplash.com/photo-1584622781867-1239b27c3a87?w=300&h=300&fit=crop'],
        description: 'Mantenimiento completado exitosamente'
      }
    },
    {
      id: 3,
      client: {
        name: 'Ana Torres',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop'
      },
      service: currentUser.service || 'Servicio',
      status: 'pending',
      urgency: 'urgent',
      date: '2024-03-20',
      time: '16:00',
      location: 'El Porvenir',
      description: 'Emergencia: Tubería rota con inundación.',
      budget: 180.00
    },
    {
      id: 4,
      client: {
        name: 'Carlos Mendoza',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
      },
      service: currentUser.service || 'Servicio',
      status: 'accepted',
      urgency: 'normal',
      date: '2024-03-22',
      time: '11:30',
      location: 'Víctor Larco',
      description: 'Instalación de nuevo sistema de tuberías.',
      budget: 200.00
    },
    {
      id: 5,
      client: {
        name: 'Laura Rodríguez',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'
      },
      service: currentUser.service || 'Servicio',
      status: 'completed',
      urgency: 'normal',
      date: '2024-03-19',
      time: '09:00',
      location: 'Moche',
      description: 'Reparación de grifo y ducha.',
      budget: 130.00,
      evidence: {
        before: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=300&fit=crop'],
        after: ['https://images.unsplash.com/photo-1584622781867-1239b27c3a87?w=300&h=300&fit=crop'],
        description: 'Reparación exitosa de grifo y ducha'
      }
    }
  ];

  const handleShowEvidence = (job: any) => {
    setSelectedJob(job);
    setShowEvidence(true);
  };

  const filteredJobs = jobs.filter(job => {
    if (filter === 'all') return true;
    if (filter === 'urgent') return job.urgency === 'urgent' && job.status === 'pending';
    if (filter === 'pending') return job.status === 'pending';
    if (filter === 'completed') return job.status === 'completed';
    return true;
  });

  const urgentCount = jobs.filter(job => job.urgency === 'urgent' && job.status === 'pending').length;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Solicitudes de Trabajo</h2>
          <div className="flex items-center gap-4">
            {urgentCount > 0 && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1 rounded-full">
                <AlertTriangle size={16} />
                <span className="font-medium">{urgentCount} urgentes</span>
              </div>
            )}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Todas las solicitudes</option>
              <option value="urgent">Solicitudes urgentes</option>
              <option value="pending">Pendientes</option>
              <option value="completed">Completadas</option>
            </select>
          </div>
        </div>
      </div>

      <div className="divide-y">
        {filteredJobs.map(job => (
          <WorkerJobCard
            key={job.id}
            job={job}
            onEvidence={() => handleShowEvidence(job)}
          />
        ))}

        {filteredJobs.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No hay solicitudes que coincidan con el filtro seleccionado
          </div>
        )}
      </div>
    </div>
  );
}