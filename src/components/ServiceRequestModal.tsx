import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, MapPin, AlertTriangle, CheckCircle, MessageCircle, Info } from 'lucide-react';
import { validateAddress } from '../utils/addressValidation';
import { isWithinWorkingHours, isValidDate, formatTime, parseWorkingHours } from '../utils/timeValidation';
import { WorkerTrackingModal } from './WorkerTrackingModal';

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  worker: {
    id: number;
    name: string;
    service: string;
    location: string;
    description: string;
    image: string;
    serviceHours: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
  };
  onSubmit: (request: ServiceRequestData) => void;
}

export interface ServiceRequestData {
  workerId: number;
  serviceType: string;
  description: string;
  date: string;
  time: string;
  location: {
    street: string;
    number: string;
    district: string;
    reference: string;
  };
  urgency: 'normal' | 'urgent';
  termsAccepted: boolean;
}

export function ServiceRequestModal({ isOpen, onClose, worker, onSubmit }: ServiceRequestModalProps) {
  const [step, setStep] = useState(1);
  const [showTracking, setShowTracking] = useState(false);
  const [requestStatus, setRequestStatus] = useState<'idle' | 'pending' | 'accepted' | 'rejected'>('idle');
  const [request, setRequest] = useState<ServiceRequestData>({
    workerId: worker.id,
    serviceType: worker.service,
    description: '',
    date: '',
    time: '',
    location: {
      street: '',
      number: '',
      district: '',
      reference: ''
    },
    urgency: 'normal',
    termsAccepted: false
  });

  const [errors, setErrors] = useState<{
    address?: string;
    time?: string;
    terms?: string;
  }>({});

  const [availability, setAvailability] = useState<{
    available: boolean;
    message?: string;
  }>({ available: true });

  if (!isOpen) return null;

  const validateStep = (currentStep: number): boolean => {
    const newErrors: typeof errors = {};

    switch (currentStep) {
      case 1:
        if (!request.description.trim()) {
          newErrors.address = 'La descripción es requerida';
        }
        if (!request.location.street || !request.location.number || !request.location.district) {
          newErrors.address = 'Todos los campos de dirección son requeridos';
        }
        break;

      case 2:
        if (!request.date || !request.time) {
          newErrors.time = 'La fecha y hora son requeridas';
        } else {
          const date = new Date(request.date);
          const dayOfWeek = date.getDay();

          if (dayOfWeek === 0) {
            newErrors.time = 'No hay servicio disponible los domingos';
          } else {
            const timeRange = dayOfWeek === 6 
              ? worker.serviceHours.saturday 
              : worker.serviceHours.weekdays;
            
            const { start, end } = parseWorkingHours(timeRange);
            
            if (!isWithinWorkingHours(request.time, start, end, request.date)) {
              newErrors.time = `El horario seleccionado (${formatTime(request.time)}) está fuera del horario de trabajo: ${timeRange}`;
            }
          }
        }
        break;

      case 3:
        if (!request.termsAccepted) {
          newErrors.terms = 'Debes aceptar los términos y condiciones';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkAvailability = () => {
    const isAvailable = Math.random() > 0.3;
    setAvailability({
      available: isAvailable,
      message: isAvailable 
        ? '¡El profesional está disponible en el horario seleccionado!' 
        : 'El profesional no está disponible en este horario. Por favor, seleccione otro.'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(step)) {
      return;
    }

    if (step < 3) {
      if (step === 2) {
        checkAvailability();
      }
      setStep(step + 1);
    } else {
      if (request.termsAccepted) {
        setRequestStatus('pending');
        // Simular procesamiento de la solicitud
        setTimeout(() => {
          const accepted = Math.random() > 0.3;
          setRequestStatus(accepted ? 'accepted' : 'rejected');
          if (accepted) {
            setShowTracking(true);
          }
        }, 2000);
      }
    }
  };

  if (showTracking) {
    return (
      <WorkerTrackingModal
        isOpen={true}
        onClose={() => setShowTracking(false)}
        worker={worker}
        serviceDetails={{
          date: request.date,
          time: request.time,
          address: `${request.location.street} ${request.location.number}, ${request.location.district}`,
          status: 'accepted'
        }}
      />
    );
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción del servicio requerido
              </label>
              <textarea
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={4}
                placeholder="Describe detalladamente el servicio que necesitas..."
                value={request.description}
                onChange={(e) => setRequest({ ...request, description: e.target.value })}
              />
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Dirección del servicio</h3>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Calle/Avenida</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={request.location.street}
                  onChange={(e) => setRequest({
                    ...request,
                    location: { ...request.location, street: e.target.value }
                  })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Número</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={request.location.number}
                    onChange={(e) => setRequest({
                      ...request,
                      location: { ...request.location, number: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Distrito</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={request.location.district}
                    onChange={(e) => setRequest({
                      ...request,
                      location: { ...request.location, district: e.target.value }
                    })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Referencia (opcional)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ej: Frente al parque, casa azul..."
                  value={request.location.reference}
                  onChange={(e) => setRequest({
                    ...request,
                    location: { ...request.location, reference: e.target.value }
                  })}
                />
              </div>
            </div>

            {errors.address && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <AlertTriangle size={16} />
                {errors.address}
              </p>
            )}

            <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Urgencia del servicio
  </label>
  <div className="grid grid-cols-3 gap-3"> {/* Cambiado a 3 columnas */}
        {/* Botón No tan urgente */}
    <button
      type="button"
      onClick={() => setRequest({ ...request, urgency: 'not_so_urgent' })}
      className={`p-3 rounded-lg border ${
        request.urgency === 'not_so_urgent'
          ? 'border-yellow-600 bg-yellow-50 text-yellow-600'
          : 'border-gray-200 hover:border-yellow-600'
      }`}
    >
      <div className="font-medium">No tan urgente</div>
    </button>
    
                  {/* Botón Normal */}
                  <button
                    type="button"
                    onClick={() => setRequest({ ...request, urgency: 'normal' })}
                    className={`p-2 rounded-lg border ${
                      request.urgency === 'normal'
                        ? 'border-green-600 bg-green-50 text-green-600'
                        : 'border-gray-200 hover:border-green-600'
                    }`}
                  >
                    <div className="font-medium">Normal</div>
                  </button>
              
              
                  {/* Botón Urgente */}
                  <button
                    type="button"
                    onClick={() => setRequest({ ...request, urgency: 'urgent' })}
                    className={`p-3 rounded-lg border ${
                      request.urgency === 'urgent'
                        ? 'border-red-600 bg-red-50 text-red-600'
                        : 'border-gray-200 hover:border-red-600'
                    }`}
                  >
                    <div className="font-medium">Urgente</div>
                  </button>
                </div>
              </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium mb-2">Horarios disponibles</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>Lunes a Viernes: {worker.serviceHours.weekdays}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>Sábados: {worker.serviceHours.saturday}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>Domingos: {worker.serviceHours.sunday}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha deseada
              </label>
              <input
                type="date"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={request.date}
                onChange={(e) => setRequest({ ...request, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hora preferida
              </label>
              <input
                type="time"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={request.time}
                onChange={(e) => setRequest({ ...request, time: e.target.value })}
              />
            </div>

            {errors.time && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <AlertTriangle size={16} />
                {errors.time}
              </p>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className={`p-4 rounded-lg ${
              availability.available ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <div className="flex items-center gap-2">
                {availability.available ? (
                  <CheckCircle className="text-green-600" size={24} />
                ) : (
                  <AlertTriangle className="text-red-600" size={24} />
                )}
                <p className={`font-medium ${
                  availability.available ? 'text-green-600' : 'text-red-600'
                }`}>
                  {availability.message}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium mb-4">Resumen de la solicitud</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CalendarIcon size={16} className="text-gray-500" />
                  <span>Fecha: {new Date(request.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-500" />
                  <span>Hora: {formatTime(request.time)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-gray-500" />
                  <span>
                    Dirección: {request.location.street} {request.location.number}, {request.location.district}
                    {request.location.reference && ` (${request.location.reference})`}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={request.termsAccepted}
                  onChange={(e) => setRequest({ ...request, termsAccepted: e.target.checked })}
                />
                <span className="text-sm text-gray-600">
                  He leído y acepto los{' '}
                  <button
                    type="button"
                    onClick={() => window.open('/terms', '_blank')}
                    className="text-blue-600 hover:underline"
                  >
                    términos y condiciones
                  </button>
                  {' '}del servicio
                </span>
              </label>

              {errors.terms && (
                <p className="text-red-600 text-sm flex items-center gap-1">
                  <AlertTriangle size={16} />
                  {errors.terms}
                </p>
              )}
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex gap-2">
                <Info size={20} className="text-yellow-700 flex-shrink-0" />
                <p className="text-sm text-yellow-800">
                  Al confirmar, se enviará una notificación al profesional. 
                  Te contactará para confirmar los detalles específicos del servicio.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <img
                src={worker.image}
                alt={worker.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-bold">{worker.service}</h2>
                <p className="text-gray-600">{worker.name}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200'
                }`}>
                  1
                </div>
                <div className={`h-1 w-12 ${
                  step >= 2 ? 'bg-green-600' : 'bg-gray-200'
                }`} />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200'
                }`}>
                  2
                </div>
                <div className={`h-1 w-12 ${
                  step >= 3 ? 'bg-green-600' : 'bg-gray-200'
                }`} />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200'
                }`}>
                  3
                </div>
              </div>
              <span className="text-sm text-gray-500">
                Paso {step} de 3
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            <div className="flex gap-3 mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Anterior
                </button>
              )}
              <button
                type="submit"
                className={`flex-1 px-4 py-2 rounded-lg text-white transition-colors ${
                  step === 3 && !availability.available
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
                disabled={step === 3 && !availability.available}
              >
                {step === 3 ? 'Confirmar Solicitud' : 'Siguiente'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}