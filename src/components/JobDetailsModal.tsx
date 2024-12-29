import React from 'react';
import { MapPin, Calendar, Clock, Image, Video, MessageCircle } from 'lucide-react';

interface JobDetailsModalProps {
  job: {
    id: number;
    title: string;
    description: string;
    budget: number;
    clientName: string;
    clientImage: string;
    photos: number;
    videos: number;
    requirements?: string[];
    schedule?: string;
    location?: string;
  };
  onChat: () => void;
  onApply: (jobId: number) => void;
  isApplied: boolean;
}

export function JobDetailsModal({ job, onChat, onApply, isApplied }: JobDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white w-full max-w-2xl mx-4 my-8 rounded-xl overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 p-6">
          <div className="flex items-center gap-4">
            <img
              src={job.clientImage}
              alt={job.clientName}
              className="w-16 h-16 rounded-full border-4 border-white"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">{job.title}</h2>
              <p className="text-white/90">{job.clientName}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">S/.{job.budget}</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Descripción del trabajo</h3>
            <p className="text-gray-600">{job.description}</p>
          </div>

          {/* Requirements */}
          {job.requirements && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Requisitos</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Schedule and Location */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <Clock className="text-emerald-600 mt-1" size={20} />
              <div>
                <h4 className="font-medium">Horario</h4>
                <p className="text-gray-600 text-sm">{job.schedule}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="text-emerald-600 mt-1" size={20} />
              <div>
                <h4 className="font-medium">Ubicación</h4>
                <p className="text-gray-600 text-sm">{job.location}</p>
              </div>
            </div>
          </div>

          {/* Media */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Archivos adjuntos</h3>
            <div className="flex gap-4">
              {job.photos > 0 && (
                <div className="flex items-center gap-1 text-gray-600">
                  <Image size={20} />
                  <span>{job.photos} {job.photos === 1 ? 'Foto' : 'Fotos'}</span>
                </div>
              )}
              {job.videos > 0 && (
                <div className="flex items-center gap-1 text-gray-600">
                  <Video size={20} />
                  <span>{job.videos} {job.videos === 1 ? 'Video' : 'Videos'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onChat}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-100 text-emerald-600 px-6 py-3 rounded-lg hover:bg-emerald-200 transition-colors"
            >
              <MessageCircle size={20} />
              Chatear
            </button>
            <button
              onClick={() => onApply(job.id)}
              disabled={isApplied}
              className={`flex-1 px-6 py-3 rounded-lg transition-all transform ${
                isApplied
                  ? 'bg-yellow-400 text-black animate-pulse'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-105'
              }`}
            >
              {isApplied ? 'Postulando servicio...' : 'Postular'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}