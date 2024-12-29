import React, { useState } from 'react';
import { Camera, AlertTriangle, CheckCircle, Calendar, Clock, MapPin } from 'lucide-react';
import { WorkEvidenceModal } from './WorkEvidenceModal';

interface WorkerJobCardProps {
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
    evidenceSubmitted?: boolean;
    evidence?: {
      before: string[];
      after: string[];
      description: string;
    };
  };
  onEvidence: () => void;
}

export function WorkerJobCard({ job, onEvidence }: WorkerJobCardProps) {
  const [status, setStatus] = useState(job.status);
  const [showEvidence, setShowEvidence] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [evidenceSubmitted, setEvidenceSubmitted] = useState(job.evidenceSubmitted || false);

  const handleAccept = () => {
    setStatus('accepted');
  };

  const handleReject = () => {
    setStatus('rejected');
  };

  const handleEvidenceSubmit = () => {
    // Update status to completed when evidence is submitted
    setStatus('completed');
    setEvidenceSubmitted(true);
    setShowEvidence(false);
    setShowSuccessAnimation(true);
    setTimeout(() => setShowSuccessAnimation(false), 3000);
  };

  const handleViewEvidence = () => {
    if (status === 'completed' && job.evidence) {
      setShowEvidence(true);
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-50';
      case 'accepted':
        return 'bg-blue-50';
      case 'rejected':
        return 'bg-red-50';
      default:
        return job.urgency === 'urgent' ? 'bg-red-50' : '';
    }
  };

  return (
    <>
      <div className={`p-6 ${getStatusColor()} transition-colors duration-300`}>
        {job.urgency === 'urgent' && status === 'pending' && (
          <div className="flex items-center gap-2 text-red-600 mb-4 bg-red-100 p-3 rounded-lg">
            <AlertTriangle size={20} />
            <span className="font-medium">Solicitud Urgente</span>
          </div>
        )}
        
        <div className="flex items-start gap-4">
          <img
            src={job.client.image}
            alt={job.client.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{job.service}</h3>
                <p className="text-gray-600">{job.client.name}</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">
                  S/. {job.budget.toFixed(2)}
                </div>
                <span className={`text-sm ${
                  status === 'pending'
                    ? 'text-yellow-600'
                    : status === 'accepted'
                    ? 'text-blue-600'
                    : status === 'completed'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {status === 'pending' ? 'Pendiente' : 
                   status === 'accepted' ? 'Aceptado' : 
                   status === 'completed' ? 'Completado' :
                   'Rechazado'}
                </span>
              </div>
            </div>

            <p className="mt-2 text-gray-600">{job.description}</p>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="text-gray-400" size={16} />
                <span>{new Date(job.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-gray-400" size={16} />
                <span>{job.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-gray-400" size={16} />
                <span>{job.location}</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {status === 'pending' && (
                <>
                  <button
                    onClick={handleAccept}
                    className={`px-4 py-2 rounded-lg text-white transition-colors ${
                      job.urgency === 'urgent' 
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {job.urgency === 'urgent' ? 'Aceptar Urgente' : 'Aceptar'}
                  </button>
                  <button
                    onClick={handleReject}
                    className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Rechazar
                  </button>
                </>
              )}
              
              {status === 'accepted' && !evidenceSubmitted && (
                <button
                  onClick={() => setShowEvidence(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Camera size={20} />
                  <span>Documentar Trabajo</span>
                </button>
              )}

              {(status === 'completed' || evidenceSubmitted) && job.evidence && (
                <button
                  onClick={handleViewEvidence}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2"
                >
                  <CheckCircle size={20} />
                  <span>Ver Evidencia</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showEvidence && (
        <WorkEvidenceModal
          isOpen={showEvidence}
          onClose={() => setShowEvidence(false)}
          jobId={job.id}
          clientName={job.client.name}
          service={job.service}
          readOnly={status === 'completed'}
          existingEvidence={job.evidence}
          onSubmit={handleEvidenceSubmit}
        />
      )}

      {showSuccessAnimation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center animate-bounce-in">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">¡Trabajo Completado!</h3>
            <p className="text-gray-600">La evidencia ha sido enviada exitosamente</p>
          </div>
        </div>
      )}
    </>
  );
}