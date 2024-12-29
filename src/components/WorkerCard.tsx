import React, { useState } from 'react';
import { Star, MapPin } from 'lucide-react';
import { PaymentModal } from './PaymentModal';
import { ServiceRequestModal } from './ServiceRequestModal';
import type { ServiceRequestData } from './ServiceRequestModal';

interface WorkerCardProps {
  worker: {
    id: number;
    name: string;
    service: string;
    location: string;
    rating: number;
    jobs: number;
    price: number;
    image: string;
    serviceHours: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
  };
  onProfileClick?: () => void;
}

export function WorkerCard({ worker, onProfileClick }: WorkerCardProps) {
  const [showPayment, setShowPayment] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [requestStatus, setRequestStatus] = useState<'idle' | 'pending' | 'accepted' | 'rejected'>('idle');

  const handleRequestSubmit = (request: ServiceRequestData) => {
    setRequestStatus('pending');
    // Aquí iría la lógica real para procesar la solicitud
    setTimeout(() => {
      setRequestStatus(Math.random() > 0.3 ? 'accepted' : 'rejected');
    }, 2000);
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <img
            src={worker.image}
            alt={worker.name}
            className="w-12 h-12 rounded-full object-cover cursor-pointer"
            onClick={onProfileClick}
          />
          <div className="flex-1">
            <h3 className="font-medium text-lg">{worker.service}</h3>
            <p className="text-gray-600">{worker.name}</p>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(worker.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
              ))}
              <span className="text-sm text-gray-600 ml-1">
                {worker.rating} ({worker.jobs} trabajos)
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 text-sm">
              <MapPin size={14} />
              {worker.location}
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-green-600">
              S/.{worker.price.toFixed(2)}
            </div>
            <button
              onClick={() => setShowRequest(true)}
              disabled={requestStatus === 'pending'}
              className={`mt-2 px-4 py-1 rounded-lg text-sm transition-colors ${
                requestStatus === 'pending'
                  ? 'bg-yellow-400 text-black animate-pulse'
                  : requestStatus === 'accepted'
                  ? 'bg-green-600 text-white'
                  : requestStatus === 'rejected'
                  ? 'bg-red-600 text-white'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {requestStatus === 'pending'
                ? 'Procesando...'
                : requestStatus === 'accepted'
                ? 'Solicitud Aceptada'
                : requestStatus === 'rejected'
                ? 'No Disponible'
                : 'Solicitar'}
            </button>
          </div>
        </div>
      </div>

      <ServiceRequestModal
        isOpen={showRequest}
        onClose={() => setShowRequest(false)}
        worker={worker}
        onSubmit={handleRequestSubmit}
      />

      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        worker={worker}
      />
    </>
  );
}