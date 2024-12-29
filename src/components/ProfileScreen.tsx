import React, { useState } from 'react';
import { Settings, Star, MapPin, Phone, Mail, Shield, Award, Edit2, Check, X } from 'lucide-react';

interface ProfileScreenProps {
  currentUser: {
    name: string;
    image: string;
  };
  onSettingsClick: () => void;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  image: string;
  bio: string;
}

export function ProfileScreen({ currentUser, onSettingsClick }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: currentUser.name,
    email: 'jose.sanchez@email.com',
    phone: '+51 999 888 777',
    location: 'Trujillo, La Libertad',
    image: currentUser.image,
    bio: 'Cliente activo en búsqueda de servicios de calidad.'
  });
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const userStats = {
    servicesRequested: 15,
    averageRating: 4.9,
    memberSince: 'Marzo 2024'
  };

  const recentServices = [
    {
      id: 1,
      service: 'Fontanería',
      worker: 'Juan Pérez',
      date: '15 Mar 2024',
      status: 'completed'
    },
    {
      id: 2,
      service: 'Electricidad',
      worker: 'María García',
      date: '10 Mar 2024',
      status: 'completed'
    }
  ];

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="pb-24 bg-gray-50">
      {/* Success Message */}
      <div
        className={`fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 flex items-center gap-2 ${
          showSuccess
            ? 'translate-y-0 opacity-100'
            : '-translate-y-12 opacity-0'
        }`}
      >
        <Check className="w-5 h-5" />
        <span>Perfil actualizado con éxito</span>
      </div>

      {/* Header */}
      <header className="bg-green-600 text-white py-6 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mi Perfil</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 hover:bg-green-700 rounded-full"
            >
              <Edit2 size={24} />
            </button>
            <button 
              onClick={onSettingsClick}
              className="p-2 hover:bg-green-700 rounded-full"
            >
              <Settings size={24} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-6 -mt-12 relative">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative group">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-white">
                    <Edit2 size={20} />
                  </button>
                </div>
              )}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  className="text-2xl font-bold bg-gray-50 border border-gray-300 rounded px-2 py-1 w-full"
                />
              ) : (
                <h2 className="text-2xl font-bold">{profile.name}</h2>
              )}
              <p className="text-gray-600 mt-1">Cliente Verificado</p>
              <div className="flex items-center gap-2 mt-2">
                <Shield size={16} className="text-green-600" />
                <span className="text-sm text-green-600">Cuenta Verificada</span>
              </div>
              {isEditing && (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <Check size={16} />
                    Guardar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center gap-2"
                  >
                    <X size={16} />
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-4">
          <h3 className="text-lg font-semibold mb-2">Sobre mí</h3>
          {isEditing ? (
            <textarea
              value={editedProfile.bio}
              onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
              className="w-full bg-gray-50 border border-gray-300 rounded p-2"
              rows={3}
            />
          ) : (
            <p className="text-gray-600">{profile.bio}</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {userStats.servicesRequested}
            </div>
            <div className="text-sm text-gray-600">Servicios</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {userStats.averageRating}
            </div>
            <div className="text-sm text-gray-600">Calificación</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {userStats.memberSince}
            </div>
            <div className="text-sm text-gray-600">Miembro desde</div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-4">
          <h3 className="text-lg font-semibold mb-4">Información de Contacto</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-gray-600" />
              {isEditing ? (
                <input
                  type="tel"
                  value={editedProfile.phone}
                  onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                  className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1"
                />
              ) : (
                <span>{profile.phone}</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-gray-600" />
              {isEditing ? (
                <input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                  className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1"
                />
              ) : (
                <span>{profile.email}</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-gray-600" />
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.location}
                  onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                  className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1"
                />
              ) : (
                <span>{profile.location}</span>
              )}
            </div>
          </div>
        </div>

        {/* Recent Services */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-4">
          <h3 className="text-lg font-semibold mb-4">Servicios Recientes</h3>
          <div className="space-y-4">
            {recentServices.map((service) => (
              <div key={service.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{service.service}</h4>
                  <p className="text-gray-600">{service.worker}</p>
                  <p className="text-sm text-gray-500">{service.date}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-600">
                  Completado
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}