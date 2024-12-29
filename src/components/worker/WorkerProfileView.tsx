import React from 'react';
import { MapPin, Star, Shield, Award, Clock, Calendar, ArrowLeft, Briefcase, Mail, Phone, Tag } from 'lucide-react';

interface WorkerProfileViewProps {
  worker: {
    name: string;
    image: string;
    email?: string;
    phone?: string;
    type: string;
    category?: string;
    service?: string;
    description?: string;
    location?: string;
    rating?: number;
    jobs?: number;
    experience?: string;
    skills?: string[];
    serviceHours?: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
  };
  onBack: () => void;
}

export function WorkerProfileView({ worker, onBack }: WorkerProfileViewProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span>Volver</span>
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src={worker.image}
              alt={worker.name}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold">{worker.name}</h1>
              <div className="flex flex-col sm:flex-row items-center gap-2 mt-2">
                {worker.category && (
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {worker.category}
                  </span>
                )}
                {worker.service && (
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {worker.service}
                  </span>
                )}
              </div>
              {worker.rating && worker.jobs && (
                <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                  <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 font-medium">{worker.rating}</span>
                  </div>
                  <span className="text-green-50">({worker.jobs} trabajos)</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Verification Badge */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 text-green-600 bg-green-50 px-4 py-3 rounded-lg">
                <Shield size={24} />
                <div>
                  <h3 className="font-semibold">Cuenta Verificada</h3>
                  <p className="text-sm text-green-700">Profesional confiable</p>
                </div>
              </div>
            </div>

            {/* Description */}
            {worker.description && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Tag className="text-green-600" />
                  Descripción
                </h2>
                <p className="text-gray-600">{worker.description}</p>
              </div>
            )}

            {/* Contact Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold mb-3">Información de Contacto</h2>
              <div className="space-y-3">
                {worker.email && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="text-green-600" size={20} />
                    <span>{worker.email}</span>
                  </div>
                )}
                {worker.phone && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="text-green-600" size={20} />
                    <span>{worker.phone}</span>
                  </div>
                )}
                {worker.location && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="text-green-600" size={20} />
                    <span>{worker.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Service Hours */}
            {worker.serviceHours && (
              <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
                <h2 className="text-lg font-semibold mb-3">Horarios de Atención</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="text-green-600" size={20} />
                    <div>
                      <span className="font-medium">Lunes a Viernes:</span>
                      <span className="ml-2">{worker.serviceHours.weekdays}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="text-green-600" size={20} />
                    <div>
                      <span className="font-medium">Sábados:</span>
                      <span className="ml-2">{worker.serviceHours.saturday}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="text-green-600" size={20} />
                    <div>
                      <span className="font-medium">Domingos:</span>
                      <span className="ml-2">{worker.serviceHours.sunday}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Experience */}
            {worker.experience && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Clock className="text-green-600" />
                  Experiencia
                </h2>
                <p className="text-gray-600">{worker.experience}</p>
              </div>
            )}

            {/* Category and Service */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Briefcase className="text-green-600" />
                Especialidad
              </h2>
              <div className="space-y-3">
                {worker.category && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Categoría:</span>
                    <span className="text-gray-600">{worker.category}</span>
                  </div>
                )}
                {worker.service && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Servicio:</span>
                    <span className="text-gray-600">{worker.service}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            {worker.skills && worker.skills.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Award className="text-green-600" />
                  Habilidades
                </h2>
                <div className="flex flex-wrap gap-2">
                  {worker.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}