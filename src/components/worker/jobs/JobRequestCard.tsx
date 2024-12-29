import React, { useState } from 'react';
import { AlertTriangle, Calendar, Clock, MapPin, Image as ImageIcon, Tool, MessageCircle, Shield, Eye } from 'lucide-react';
import { JobPhotos } from './JobPhotos';
import { AIRecommendations } from './AIRecommendations';

interface JobRequestCardProps {
  job: {
    id: number;
    client: {
      name: string;
      image: string;
    };
    service: string;
    status: 'pending' | 'accepted' | 'rejected' | 'completed';
    date: string;
    time: string;
    location: string;
    description: string;
    budget: number;
    urgency: 'normal' | 'urgent';
    photos?: string[];
  };
  onAccept: (jobId: number) => void;
  onReject: (jobId: number) => void;
  onRequestInfo?: (jobId: number) => void;
}

export function JobRequestCard({ job, onAccept, onReject, onRequestInfo }: JobRequestCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);

  const demoPhotos = [
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1584622781867-1239b27c3a87?w=400&h=300&fit=crop'
  ];

  const photos = job.photos || demoPhotos;

  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden border ${
      job.urgency === 'urgent' ? 'border-red-200' : 'border-gray-200'
    } transition-all duration-300`}>
      {/* Header con información de urgencia */}
      {job.urgency === 'urgent' && job.status === 'pending' && (
        <div className="bg-red-50 px-4 py-2 flex items-center gap-2 text-red-700">
          <AlertTriangle size={18} />
          <span className="font-medium">Solicitud Urgente</span>
        </div>
      )}

      <div className="p-6">
        {/* Información básica */}
        <div className="flex items-start gap-4">
          <img
            src={job.client.image}
            alt={job.client.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">{job.service}</h3>
                <p className="text-gray-600">{job.client.name}</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg text-green-600">
                  S/. {job.budget.toFixed(2)}
                </div>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  job.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : job.status === 'accepted'
                    ? 'bg-blue-100 text-blue-800'
                    : job.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {job.status === 'pending' ? 'Pendiente' : 
                   job.status === 'accepted' ? 'Aceptado' : 
                   job.status === 'completed' ? 'Completado' :
                   'Rechazado'}
                </span>
              </div>
            </div>

            <p className="mt-2 text-gray-700">{job.description}</p>

            {/* Detalles del servicio */}
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-400" />
                <span>{new Date(job.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-400" />
                <span>{job.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" />
                <span>{job.location}</span>
              </div>
            </div>

            {/* Botón para ver más detalles */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="mt-4 text-green-600 hover:text-green-700 flex items-center gap-2"
            >
              <Eye size={16} />
              {showDetails ? 'Ocultar detalles' : 'Ver más detalles'}
            </button>

            {/* Detalles expandidos */}
            {showDetails && (
              <div className="mt-4 space-y-4">
                {/* Fotos del problema */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                    <ImageIcon size={16} className="text-gray-600" />
                    Fotos del problema
                  </h4>
                  <JobPhotos photos={photos} />
                </div>

                {/* Recomendaciones de IA */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                    <Tool size={16} className="text-gray-600" />
                    Análisis preliminar
                  </h4>
                  <AIRecommendations jobType={job.service} photos={photos} />
                </div>

                {/* Información adicional */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Shield size={16} />
                    <span className="font-medium">Información importante</span>
                  </div>
                  <p className="mt-2 text-sm text-blue-600">
                    El cliente ha verificado su identidad y dirección. La zona es segura y de fácil acceso.
                  </p>
                </div>
              </div>
            )}

            {/* Botones de acción */}
            {job.status === 'pending' && (
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => onAccept(job.id)}
                  className={`px-4 py-2 rounded-lg text-white transition-colors ${
                    job.urgency === 'urgent'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {job.urgency === 'urgent' ? 'Aceptar Urgente' : 'Aceptar'}
                </button>
                <button
                  onClick={() => onReject(job.id)}
                  className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Rechazar
                </button>
                {onRequestInfo && (
                  <button
                    onClick={() => onRequestInfo(job.id)}
                    className="px-4 py-2 flex items-center gap-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <MessageCircle size={16} />
                    Solicitar más información
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}