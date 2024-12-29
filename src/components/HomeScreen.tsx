import React, { useState, useEffect } from 'react';
import { Settings, Search as SearchIcon, Plus, Mic, Briefcase, Sparkles, Clock } from 'lucide-react';
import { ServiceCategories } from './ServiceCategory';
import { WorkerCard } from './WorkerCard';
import { VoiceSearch } from './VoiceSearch';
import { PopularServices } from './PopularServices';
import { workers } from '../data/workers';
import { ServiceRequestForm } from './ServiceRequestForm';
import { WorkerProfile } from './WorkerProfile';
import { PromotionDetailsModal } from './PromotionDetailsModal';

interface HomeScreenProps {
  currentUser: {
    name: string;
    image: string;
  };
  onSettingsClick: () => void;
  onScreenChange: (screen: string) => void;
  onSearch: (query: string) => void;
}

export function HomeScreen({ currentUser, onSettingsClick, onScreenChange, onSearch }: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<any>(null);
  const [showWorkerProfile, setShowWorkerProfile] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null);

  const recentJobs = [
    {
      id: 1,
      title: "Limpieza Profunda",
      worker: "María Torres",
      date: "Hace 2 horas",
      price: 45.00,
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=200&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Reparación Eléctrica",
      worker: "Juan Pérez",
      date: "Hace 3 horas",
      price: 60.00,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=200&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Jardinería",
      worker: "Carlos Mendoza",
      date: "Hace 4 horas",
      price: 55.00,
      image: "https://images.unsplash.com/photo-1599629954294-16b394a8ba35?q=80&w=200&h=200&fit=crop"
    }
  ];

  const specialPromotions = [
    {
      id: 1,
      title: "¡50% OFF en Primera Limpieza!",
      description: "Válido para nuevos clientes",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400&h=300&fit=crop",
      discount: "50%",
      validUntil: "31 Mar",
      fullDescription: "Disfruta de un 50% de descuento en tu primer servicio de limpieza. Nuestros profesionales certificados realizarán una limpieza profunda de tu hogar u oficina, incluyendo todas las áreas y utilizando productos de primera calidad.",
      services: [
        "Limpieza profunda",
        "Desinfección",
        "Limpieza de ventanas",
        "Limpieza de muebles"
      ],
      terms: [
        "Válido solo para nuevos clientes",
        "No acumulable con otras promociones",
        "Servicio mínimo de 4 horas",
        "Sujeto a disponibilidad"
      ]
    },
    {
      id: 2,
      title: "Pack Mantenimiento Hogar",
      description: "Fontanería + Electricidad",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400&h=300&fit=crop",
      discount: "30%",
      validUntil: "15 Mar",
      fullDescription: "Aprovecha nuestro pack completo de mantenimiento para el hogar que incluye servicios de fontanería y electricidad. Realiza una revisión completa de tus instalaciones y soluciona cualquier problema con un gran descuento.",
      services: [
        "Revisión de instalaciones",
        "Reparaciones básicas",
        "Mantenimiento preventivo",
        "Diagnóstico completo"
      ],
      terms: [
        "Descuento aplicable al total del servicio",
        "Incluye visita de diagnóstico",
        "Materiales no incluidos",
        "Reserva con 48h de anticipación"
      ]
    }
  ];

  useEffect(() => {
    const messages = [
      '¿Qué servicio necesitas hoy?',
      '¿En qué podemos ayudarte?',
      'Encuentra el servicio perfecto',
      'Los mejores profesionales te esperan'
    ];
    const interval = setInterval(() => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setWelcomeMessage(randomMessage);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      onScreenChange('search');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleServiceRequest = (request: any) => {
    setShowRequestForm(false);
    onSearch(request.category);
    onScreenChange('search');
  };

  if (showWorkerProfile && selectedWorker) {
    return (
      <WorkerProfile
        worker={selectedWorker}
        onBack={() => setShowWorkerProfile(false)}
      />
    );
  }

  return (
    <div className="pb-32">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">BuscaChamba!</h1>
            <div className="p-2 bg-green-100 rounded-full">
              <Briefcase className="text-green-600 w-6 h-6" />
            </div>
          </div>
          <button
            onClick={onSettingsClick}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Settings size={24} />
          </button>
        </div>

        {/* User Welcome */}
        <div className="bg-gradient-to-r from-green-500 to-green-400 rounded-2xl p-6 mb-6 shadow-lg transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser.image}
                alt={currentUser.name}
                className="w-16 h-16 rounded-full border-4 border-white shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <h2 className="text-white text-2xl font-bold">
                Bienvenido, {currentUser.name}
              </h2>
              <p className="text-white/90 text-lg mt-1 animate-fade-in">
                {welcomeMessage}
              </p>
            </div>
          </div>
        </div>

        {/* New Service Request Button */}
        <button
          onClick={() => setShowRequestForm(true)}
          className="w-full bg-green-600 text-white py-4 rounded-lg mb-6 flex items-center justify-center gap-2 hover:bg-green-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
        >
          <Plus size={20} />
          <span>Nueva Solicitud de Servicio</span>
        </button>

        {/* Search Bar */}
        <div className="flex gap-2 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Buscar servicio o profesional..."
              className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <VoiceSearch onResult={setSearchQuery} />
          </div>
          <button
            onClick={handleSearch}
            className="px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
          >
            Buscar
          </button>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Service Categories */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Categorías de Servicios</h2>
            <ServiceCategories onSelectService={(category, service) => {
              onSearch(service);
              onScreenChange('search');
            }} />
          </div>

          {/* Popular Services */}
          <PopularServices onServiceSelect={(service) => {
            onSearch(service);
            onScreenChange('search');
          }} />

          {/* Available Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios Disponibles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workers.slice(0, 6).map((worker) => (
                <WorkerCard
                  key={worker.id}
                  worker={worker}
                  onProfileClick={() => {
                    setSelectedWorker(worker);
                    setShowWorkerProfile(true);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Recent Jobs */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="text-green-600" size={24} />
              <h3 className="text-lg font-semibold">Trabajos Recientes</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={job.image}
                      alt={job.worker}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium">{job.title}</h4>
                      <p className="text-sm text-gray-600">{job.worker}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{job.date}</span>
                    <span className="font-semibold text-green-600">S/. {job.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Special Promotions */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-green-600" size={24} />
              <h3 className="text-lg font-semibold">Promociones Especiales</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specialPromotions.map((promo) => (
                <div key={promo.id} className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={promo.image}
                      alt={promo.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-yellow-400 text-black font-bold px-3 py-1 rounded-full">
                      {promo.discount} OFF
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-lg mb-1">{promo.title}</h4>
                    <p className="text-gray-600 text-sm">{promo.description}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-sm text-gray-500">Válido hasta {promo.validUntil}</span>
                      <button 
                        onClick={() => setSelectedPromotion(promo)}
                        className="bg-green-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-green-700 transition-colors"
                      >
                        Ver más
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service Request Form Modal */}
        {showRequestForm && (
          <ServiceRequestForm
            onSubmit={handleServiceRequest}
            onClose={() => setShowRequestForm(false)}
          />
        )}

        {/* Promotion Details Modal */}
        {selectedPromotion && (
          <PromotionDetailsModal
            promotion={selectedPromotion}
            onClose={() => setSelectedPromotion(null)}
          />
        )}
      </div>
    </div>
  );
}