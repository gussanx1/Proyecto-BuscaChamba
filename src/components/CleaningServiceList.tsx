import React, { useState } from 'react';
import { Star, MapPin, Award, Shield, Clock, Filter } from 'lucide-react';
import { cleaningWorkers } from '../data/cleaningWorkers';
import { WorkerProfile } from './WorkerProfile';

interface SortOption {
  label: string;
  value: 'rating' | 'price' | 'jobs';
}

export function CleaningServiceList() {
  const [selectedWorker, setSelectedWorker] = useState<any>(null);
  const [sortBy, setSortBy] = useState<SortOption['value']>('rating');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions: SortOption[] = [
    { label: 'Mejor valorados', value: 'rating' },
    { label: 'Precio', value: 'price' },
    { label: 'Experiencia', value: 'jobs' }
  ];

  const sortedWorkers = [...cleaningWorkers].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price':
        return a.price - b.price;
      case 'jobs':
        return b.jobs - a.jobs;
      default:
        return 0;
    }
  }).filter(worker => 
    worker.price >= priceRange[0] && worker.price <= priceRange[1]
  );

  if (selectedWorker) {
    return (
      <WorkerProfile
        worker={selectedWorker}
        onBack={() => setSelectedWorker(null)}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Servicios de Limpieza del Hogar</h1>
        <p className="text-gray-600">
          Encuentra profesionales confiables para la limpieza de tu hogar
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption['value'])}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <Filter size={20} />
              <span>Filtros</span>
            </button>
          </div>
          <p className="text-sm text-gray-600">
            {sortedWorkers.length} profesionales disponibles
          </p>
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rango de precio (S/.)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-24 px-3 py-2 border rounded-lg"
                    min="0"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-24 px-3 py-2 border rounded-lg"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedWorkers.map((worker) => (
          <div
            key={worker.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img
                src={worker.image}
                alt={worker.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-green-600">
                S/. {worker.price.toFixed(2)}
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{worker.name}</h3>
                  <p className="text-gray-600">{worker.service}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{worker.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <MapPin size={16} />
                <span>{worker.location}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                <Clock size={16} />
                <span>{worker.jobs} trabajos completados</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {worker.skills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-green-600">
                  <Shield size={16} />
                  <span className="text-sm">Verificado</span>
                </div>
                <button
                  onClick={() => setSelectedWorker(worker)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Ver perfil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedWorkers.length === 0 && (
        <div className="text-center py-8">
          <Award className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-500">No se encontraron profesionales con los filtros seleccionados</p>
        </div>
      )}
    </div>
  );
}