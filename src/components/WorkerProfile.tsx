import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Shield, 
  Award, 
  ThumbsUp,
  Phone,
  Mail,
  Clock,
  Calendar
} from 'lucide-react';
import { PaymentModal } from './PaymentModal';

interface WorkerProfileProps {
  worker: {
    id: number;
    name: string;
    service: string;
    location: string;
    description: string;
    experience: string;
    skills: string[];
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
  onBack: () => void;
}

export function WorkerProfile({ worker, onBack }: WorkerProfileProps) {
  const [showPayment, setShowPayment] = useState(false);

  const reviews = [
    {
      id: 1,
      name: "María García",
      rating: 5,
      comment: "Excelente servicio, muy profesional y puntual.",
      date: "2024-03-15",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      name: "Juan Pérez",
      rating: 4,
      comment: "Buen trabajo, recomendado.",
      date: "2024-03-10",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        worker={worker}
      />

      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <button 
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={24} />
            <span className="ml-2">Volver</span>
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <img
              src={worker.image}
              alt={worker.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{worker.name}</h1>
              <p className="text-gray-600">{worker.service}</p>
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(worker.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
                <span className="ml-2 text-gray-600">
                  {worker.rating} ({worker.jobs} trabajos)
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Shield size={16} className="text-green-600" />
                <span className="text-sm text-green-600">Verificado</span>
              </div>
            </div>
            <div className="text-right mt-4 md:mt-0">
              <div className="text-2xl font-bold text-green-600">S/. {worker.price.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={20} />
            <span>{worker.location}</span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <h2 className="text-lg font-semibold mb-3">Descripción</h2>
          <p className="text-gray-600">{worker.description}</p>
        </div>

        {/* Experience */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <h2 className="text-lg font-semibold mb-3">Experiencia</h2>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={20} />
            <span>{worker.experience}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <h2 className="text-lg font-semibold mb-3">Habilidades</h2>
          <div className="flex flex-wrap gap-2">
            {worker.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Service Hours */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <h2 className="text-lg font-semibold mb-3">Horarios de Atención</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={16} className="text-green-600" />
              <div>
                <span className="font-medium">Lunes a Viernes:</span>
                <span className="ml-2">{worker.serviceHours.weekdays}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={16} className="text-green-600" />
              <div>
                <span className="font-medium">Sábados:</span>
                <span className="ml-2">{worker.serviceHours.saturday}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={16} className="text-green-600" />
              <div>
                <span className="font-medium">Domingos:</span>
                <span className="ml-2">{worker.serviceHours.sunday}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-20">
          <h2 className="text-lg font-semibold mb-4">Reseñas</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{review.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setShowPayment(true)}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>Solicitar Servicio</span>
              <span className="font-semibold">S/. {worker.price.toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}