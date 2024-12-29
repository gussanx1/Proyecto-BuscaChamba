import React, { useState } from 'react';
import { Search as SearchIcon, Star, MapPin, User } from 'lucide-react';
import { VoiceSearch } from './VoiceSearch';
import { workers } from '../data/workers';
import { ServiceRequestModal } from './ServiceRequestModal';
import { WorkerProfile } from './WorkerProfile';
import { WorkerTrackingModal } from './WorkerTrackingModal';
import type { ServiceRequestData } from './ServiceRequestModal';

interface SearchScreenProps {
  searchQuery: string;
  onSearchUpdate: (query: string) => void;
  onWorkerSelect: (worker: any) => void;
  onShowProfile: (show: boolean) => void;
}

export function SearchScreen({
  searchQuery = '',
  onSearchUpdate,
  onWorkerSelect,
  onShowProfile
}: SearchScreenProps) {
  const [showRequest, setShowRequest] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<any>(null);
  const [requestStatuses, setRequestStatuses] = useState<{ [key: number]: 'idle' | 'pending' | 'accepted' | 'rejected' }>({});

  const filteredWorkers = workers.filter(worker => {
    const searchTerms = [
      worker.service,
      worker.name,
      worker.category,
      worker.description,
      worker.location
    ].map(term => term?.toLowerCase() || '');

    const query = searchQuery.toLowerCase();
    return searchTerms.some(term => term.includes(query));
  });

  const handleRequestSubmit = (request: ServiceRequestData) => {
    if (selectedWorker) {
      setRequestStatuses(prev => ({
        ...prev,
        [selectedWorker.id]: 'pending'
      }));

      setTimeout(() => {
        const isAccepted = Math.random() > 0.3;
        setRequestStatuses(prev => ({
          ...prev,
          [selectedWorker.id]: isAccepted ? 'accepted' : 'rejected'
        }));
        setShowRequest(false);
        if (isAccepted) {
          setShowTracking(true);
        }
      }, 2000);
    }
  };

  const handleRequestClick = (worker: any) => {
    setSelectedWorker(worker);
    setShowRequest(true);
  };

  const handleProfileClick = (worker: any) => {
    setSelectedWorker(worker);
    onWorkerSelect(worker);
    onShowProfile(true);
  };

  const handleBackFromTracking = () => {
    setShowTracking(false);
    setSelectedWorker(null);
    if (selectedWorker) {
      setRequestStatuses(prev => {
        const newStatuses = { ...prev };
        delete newStatuses[selectedWorker.id];
        return newStatuses;
      });
    }
  };

  const getRequestButtons = (worker: any) => {
    const status = requestStatuses[worker.id] || 'idle';

    switch (status) {
      case 'pending':
        return (
          <button
            disabled
            className="px-4 py-1 bg-yellow-400 text-black rounded-lg animate-pulse"
          >
            Procesando...
          </button>
        );
      case 'accepted':
        return (
          <button
            onClick={() => setShowTracking(true)}
            className="px-4 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Ver seguimiento
          </button>
        );
      case 'rejected':
        return (
          <button
            disabled
            className="px-4 py-1 bg-red-600 text-white rounded-lg"
          >
            No disponible
          </button>
        );
      default:
        return (
          <button
            onClick={() => handleRequestClick(worker)}
            className="px-4 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Solicitar
          </button>
        );
    }
  };

  return (
    <div className="pb-24">
      {/* Search Header */}
      <div className="bg-white sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Buscar servicio o profesional..."
                className="w-full py-3 px-4 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => onSearchUpdate(e.target.value)}
              />
              <VoiceSearch onResult={onSearchUpdate} />
            </div>
            <button className="bg-green-600 text-white px-6 rounded-lg hover:bg-green-700 flex items-center gap-2">
              <SearchIcon size={20} />
              Buscar
            </button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">
          {searchQuery ? `Resultados para "${searchQuery}"` : 'Trabajadores Destacados'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.map((worker) => (
            <div key={worker.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <img
                  src={worker.image}
                  alt={worker.name}
                  className="w-12 h-12 rounded-full object-cover cursor-pointer"
                  onClick={() => handleProfileClick(worker)}
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
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-green-600">S/.{worker.price.toFixed(2)}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleProfileClick(worker)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                      >
                        <User size={20} />
                      </button>
                      {getRequestButtons(worker)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredWorkers.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500">
              No se encontraron ofertas que coincidan con los filtros aplicados
            </div>
          </div>
        )}
      </div>

      {/* Service Request Modal */}
      {showRequest && selectedWorker && (
        <ServiceRequestModal
          isOpen={showRequest}
          onClose={() => setShowRequest(false)}
          worker={selectedWorker}
          onSubmit={handleRequestSubmit}
        />
      )}

      {/* Tracking Modal */}
      {showTracking && selectedWorker && (
        <WorkerTrackingModal
          isOpen={showTracking}
          onClose={() => setShowTracking(false)}
          onBack={handleBackFromTracking}
          worker={selectedWorker}
          serviceDetails={{
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            address: "Dirección del servicio",
            status: "accepted"
          }}
        />
      )}
    </div>
  );
}