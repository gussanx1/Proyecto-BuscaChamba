import React from 'react';
import { User, MapPin, Phone, Mail, Briefcase, Clock, Shield, Award, Calendar } from 'lucide-react';

interface WorkerProfileDetailsProps {
  worker: {
    name: string;
    email: string;
    phone: string;
    image: string;
    service?: string;
    category?: string;
    location?: string;
    description?: string;
    experience?: string;
    serviceHours?: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
  };
}

export function WorkerProfileDetails({ worker }: WorkerProfileDetailsProps) {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header con información principal */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-green-600 to-green-400 p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src={worker.image}
              alt={worker.name}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="text-center sm:text-left text-white">
              <h1 className="text-2xl font-bold">{worker.name}</h1>
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
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Información de contacto */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <User className="text-green-600" />
                Información de Contacto
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="text-green-600" size={20} />
                  <span>{worker.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="text-green-600" size={20} />
                  <span>{worker.phone}</span>
                </div>
                {worker.location && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="text-green-600" size={20} />
                    <span>{worker.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Información profesional */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Briefcase className="text-green-600" />
                Información Profesional
              </h2>
              <div className="space-y-3">
                {worker.experience && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <Award className="text-green-600" size={20} />
                    <span>{worker.experience}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-gray-600">
                  <Shield className="text-green-600" size={20} />
                  <span>Cuenta Verificada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horarios de Servicio */}
      {worker.serviceHours && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Clock className="text-green-600" />
            Horarios de Atención
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar className="text-green-600" size={20} />
              <div>
                <span className="font-medium">Lunes a Viernes:</span>
                <p>{worker.serviceHours.weekdays}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar className="text-green-600" size={20} />
              <div>
                <span className="font-medium">Sábados:</span>
                <p>{worker.serviceHours.saturday}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar className="text-green-600" size={20} />
              <div>
                <span className="font-medium">Domingos:</span>
                <p>{worker.serviceHours.sunday}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Descripción */}
      {worker.description && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Descripción del Servicio</h2>
          <p className="text-gray-600">{worker.description}</p>
        </div>
      )}
    </div>
  );
}