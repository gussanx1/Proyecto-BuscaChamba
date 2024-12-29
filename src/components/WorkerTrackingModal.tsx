import React, { useState, useEffect } from 'react';
import { Map, Phone, Shield, Clock, ArrowLeft, Calendar, MapPin, Star } from 'lucide-react';
import { MapContainer } from './maps/MapContainer';
import { PaymentFlow } from './PaymentFlow';
import { RatingModal } from './RatingModal';

interface WorkerTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  worker: {
    id: number;
    name: string;
    image: string;
    service: string;
    phone?: string;
    location?: string;
    rating?: number;
    jobs?: number;
    experience?: string;
    price?: number;
  };
  serviceDetails: {
    date: string;
    time: string;
    address: string;
    status: string;
  };
}

export function WorkerTrackingModal({ isOpen, onClose, onBack, worker, serviceDetails }: WorkerTrackingModalProps) {
  const [estimatedArrival, setEstimatedArrival] = useState('15 minutos');
  const [distance, setDistance] = useState('2.5 km');
  const [arrivalProgress, setArrivalProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState<'preparing' | 'on_way' | 'arrived'>('preparing');
  const [showPayment, setShowPayment] = useState(false);
  const [showRating, setShowRating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setArrivalProgress(prev => {
          const newProgress = Math.min(prev + 5, 100);
          
          if (newProgress < 30) {
            setCurrentStatus('preparing');
          } else if (newProgress < 90) {
            setCurrentStatus('on_way');
          } else {
            setCurrentStatus('arrived');
            // When worker arrives, show payment modal after 3 seconds
            if (newProgress === 100) {
              setTimeout(() => {
                setShowPayment(true);
              }, 3000);
            }
          }
          
          return newProgress;
        });

        const newMinutes = Math.max(5, parseInt(estimatedArrival) - 1);
        setEstimatedArrival(`${newMinutes} minutos`);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isOpen, estimatedArrival]);

  const handlePaymentComplete = () => {
    setShowPayment(false);
    setShowRating(true);
  };

  const handleRatingSubmit = (rating: number, comment: string) => {
    setShowRating(false);
    onClose();
  };

  const handleCall = () => {
    if (worker.phone) {
      window.open(`tel:${worker.phone}`);
    }
  };

  const getStatusInfo = () => {
    switch (currentStatus) {
      case 'preparing':
        return {
          title: 'Preparándose',
          description: 'El profesional está preparando sus herramientas',
          color: 'text-yellow-600 bg-yellow-100'
        };
      case 'on_way':
        return {
          title: 'En camino',
          description: 'El profesional se dirige a tu ubicación',
          color: 'text-blue-600 bg-blue-100'
        };
      case 'arrived':
        return {
          title: 'Ha llegado',
          description: 'El profesional ha llegado a tu ubicación',
          color: 'text-green-600 bg-green-100'
        };
    }
  };

  if (!isOpen) return null;

  if (showPayment) {
    return (
      <PaymentFlow
        isOpen={true}
        onClose={() => setShowPayment(false)}
        worker={worker}
        onPaymentComplete={handlePaymentComplete}
      />
    );
  }

  if (showRating) {
    return (
      <RatingModal
        isOpen={true}
        onClose={() => setShowRating(false)}
        onSubmit={handleRatingSubmit}
        workerName={worker.name}
        service={worker.service}
      />
    );
  }

  const statusInfo = getStatusInfo();

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
      <div className="bg-white w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl my-4 md:my-8 animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-400 p-4 sm:p-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack || onClose}
              className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <img
                src={worker.image}
                alt={worker.name}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-white object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-white truncate">
                  {worker.name}
                </h2>
                <p className="text-green-50 truncate">{worker.service}</p>
                {worker.rating && worker.jobs && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white/90">{worker.rating}</span>
                    <span className="text-white/70">({worker.jobs} trabajos)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-lg ${statusInfo.color}`}>
                <Map size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">{statusInfo.title}</h3>
                <p className="text-gray-600 truncate">{statusInfo.description}</p>
              </div>
            </div>
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-green-600 transition-all duration-500 rounded-full"
                style={{ width: `${arrivalProgress}%` }}
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <Clock className="text-blue-600" size={24} />
                <div>
                  <p className="text-sm text-blue-700">Tiempo estimado</p>
                  <p className="text-lg font-semibold">{estimatedArrival}</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <Map className="text-purple-600" size={24} />
                <div>
                  <p className="text-sm text-purple-700">Distancia</p>
                  <p className="text-lg font-semibold">{distance}</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <Shield className="text-green-600" size={24} />
                <div>
                  <p className="text-sm text-green-700">Estado</p>
                  <p className="text-lg font-semibold">Verificado</p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-lg mb-4">Detalles del Servicio</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
                <Calendar className="text-gray-500" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Fecha</p>
                  <p className="font-medium">{serviceDetails.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
                <Clock className="text-gray-500" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Hora</p>
                  <p className="font-medium">{serviceDetails.time}</p>
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="flex items-start gap-3 bg-white p-3 rounded-lg">
                  <MapPin className="text-gray-500 mt-1 flex-shrink-0" size={20} />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-600">Dirección</p>
                    <p className="font-medium truncate">{serviceDetails.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <MapContainer />
          </div>

          {/* Contact Button */}
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-700 mb-3">
              <Phone size={20} />
              <p className="font-medium">¿Necesitas contactar al profesional?</p>
            </div>
            <button
              onClick={handleCall}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              <span>Llamar al profesional</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}