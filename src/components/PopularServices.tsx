import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { WorkerCard } from './WorkerCard';
import { workers } from '../data/workers';

interface PopularServicesProps {
  onServiceSelect: (service: string) => void;
}

export function PopularServices({ onServiceSelect }: PopularServicesProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const popularServices = [
    { name: 'Limpieza', count: 1250, filter: 'Limpieza' },
    { name: 'Electricidad', count: 980, filter: 'Electricidad' },
    { name: 'Fontanería', count: 850, filter: 'Fontanería' },
    { name: 'Pintura', count: 720, filter: 'Pintura' },
    { name: 'Carpintería', count: 650, filter: 'Carpintería' },
    { name: 'Jardinería', count: 580, filter: 'Jardinería' }
  ];

  const handleServiceClick = (service: { name: string, filter: string }) => {
    setSelectedService(service.filter);
    onServiceSelect(service.name);
  };

  const filteredWorkers = selectedService
    ? workers.filter(worker => 
        worker.service === selectedService && 
        worker.category === 'domestic'
      )
    : [];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-green-600" size={24} />
          <h3 className="text-lg font-semibold">Servicios más solicitados</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularServices.map((service) => (
            <button
              key={service.name}
              onClick={() => handleServiceClick(service)}
              className={`${
                selectedService === service.filter
                  ? 'bg-green-600 text-white'
                  : 'bg-green-50 hover:bg-green-100 text-green-700'
              } px-4 py-2 rounded-full text-sm transition-colors flex items-center gap-2`}
            >
              <span>{service.name}</span>
              <span className={`${
                selectedService === service.filter
                  ? 'bg-green-500 text-white'
                  : 'bg-green-200 text-green-800'
              } px-2 py-0.5 rounded-full text-xs`}>
                {service.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedService && filteredWorkers.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">
            {filteredWorkers.length} Profesionales disponibles en {
              popularServices.find(s => s.filter === selectedService)?.name
            }
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWorkers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
        </div>
      )}

      {selectedService && filteredWorkers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay profesionales disponibles en este momento para {
            popularServices.find(s => s.filter === selectedService)?.name
          }
        </div>
      )}
    </div>
  );
}