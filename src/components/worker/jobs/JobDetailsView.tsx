import React from 'react';
import { MapPin, Calendar, Clock, Tool, AlertTriangle } from 'lucide-react';
import { JobPhotos } from './JobPhotos';
import { AIRecommendations } from './AIRecommendations';

interface JobDetailsViewProps {
  job: {
    id: number;
    title: string;
    description: string;
    client: {
      name: string;
      image: string;
    };
    service: string;
    status: 'pending' | 'accepted' | 'rejected' | 'completed';
    date: string;
    time: string;
    location: string;
    budget: number;
    urgency: 'normal' | 'urgent';
    photos?: string[];
  };
  onAccept: (jobId: number) => void;
  onReject: (jobId: number) => void;
  onRequestInfo?: (jobId: number) => void; // Nueva función opcional para solicitar más información
}

export function JobDetailsView({ job, onAccept, onReject, onRequestInfo }: JobDetailsViewProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header con información del cliente y urgencia */}
      {job.urgency === 'urgent' && (
        <div className="bg-red-50 px-4 py-2 flex items-center gap-2 text-red-700">
          <AlertTriangle size={18} />
          <span className="font-medium">Solicitud Urgente</span>
        </div>
      )}

      <div className="p-6">
        {/* Información del cliente */}
        <div className="flex items-start gap-4 mb-6">
          <img
            src={job.client.image}
            alt={job.client.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-medium text-lg">{job.service}</h3>
            <p className="text-gray-600">{job.client.name}</p>
            <div className="mt-2 text-2xl font-bold text-green-600">
              S/. {job.budget.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Detalles del servicio */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={20} />
            <span>{new Date(job.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={20} />
            <span>{job.time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={20} />
            <span>{job.location}</span>
          </div>
        </div>

        {/* Descripción del problema */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-2">Descripción del problema</h4>
          <p className="text-gray-600">{job.description}</p>
        </div>

        {/* Fotos del problema */}
        {job.photos && job.photos.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
              <Tool size={20} className="text-gray-600" />
              Fotos del problema
            </h4>
            <JobPhotos photos={job.photos} />
          </div>
        )}

        {/* Recomendaciones de IA */}
        {job.photos && job.photos.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-gray-800 mb-2">Análisis y Recomendaciones</h4>
            <AIRecommendations jobType={job.service} photos={job.photos} />
          </div>
        )}

        {/* Botones de acción */}
        {job.status === 'pending' && (
          <div className="flex gap-3">
            <button
              onClick={() => onAccept(job.id)}
              className={`flex-1 py-2 rounded-lg text-white transition-colors ${
                job.urgency === 'urgent'
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {job.urgency === 'urgent' ? 'Aceptar Urgente' : 'Aceptar'}
            </button>
            <button
              onClick={() => onReject(job.id)}
              className="flex-1 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              Rechazar
            </button>
            {onRequestInfo && (
              <button
                onClick={() => onRequestInfo(job.id)}
                className="flex-1 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Solicitar más información
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
