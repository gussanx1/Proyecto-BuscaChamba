import React, { useState, useRef } from 'react';
import { Camera, Upload, X, FileText, Clock, MapPin } from 'lucide-react';

interface ServiceRequestFormProps {
  onSubmit: (request: ServiceRequest) => void;
  onClose: () => void;
}

interface ServiceRequest {
  title: string;
  description: string;
  category: string;
  urgency: 'low' | 'medium' | 'high';
  location: string;
  budget?: number;
  mediaUrls: string[];
}

export function ServiceRequestForm({ onSubmit, onClose }: ServiceRequestFormProps) {
  const [request, setRequest] = useState<ServiceRequest>({
    title: '',
    description: '',
    category: '',
    urgency: 'medium',
    location: '',
    budget: undefined,
    mediaUrls: []
  });

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'Limpieza',
    'Jardinería',
    'Fontanería',
    'Electricidad',
    'Carpintería',
    'Pintura',
    'Otros'
  ];

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newPreviewUrls: string[] = [];
    const newMediaUrls: string[] = [];

    Array.from(files).forEach(file => {
      const url = URL.createObjectURL(file);
      newPreviewUrls.push(url);
      // In a real app, you would upload the file to a server and get a URL back
      newMediaUrls.push(url);
    });

    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    setRequest(prev => ({
      ...prev,
      mediaUrls: [...prev.mediaUrls, ...newMediaUrls]
    }));
  };

  const removeMedia = (index: number) => {
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    const newMediaUrls = request.mediaUrls.filter((_, i) => i !== index);
    setPreviewUrls(newPreviewUrls);
    setRequest(prev => ({ ...prev, mediaUrls: newMediaUrls }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(request);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 my-8">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Nueva Solicitud de Servicio</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título de la solicitud
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Reparación de grifo con fuga"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={request.title}
                onChange={e => setRequest(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <select
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={request.category}
                onChange={e => setRequest(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="">Selecciona una categoría</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción detallada
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe el servicio que necesitas con el mayor detalle posible..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={request.description}
                onChange={e => setRequest(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            {/* Media Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fotos o Videos
              </label>
              <div className="space-y-4">
                {/* Preview Grid */}
                {previewUrls.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        {url.includes('video') ? (
                          <video
                            src={url}
                            className="w-full h-32 object-cover rounded-lg"
                            controls
                          />
                        ) : (
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        )}
                        <button
                          type="button"
                          onClick={() => removeMedia(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Buttons */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
                  >
                    <Upload size={20} />
                    <span>Subir archivos</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
                  >
                    <Camera size={20} />
                    <span>Tomar foto</span>
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="hidden"
                  onChange={handleMediaUpload}
                />
                <p className="text-sm text-gray-500">
                  Puedes subir hasta 5 fotos o videos (máx. 10MB cada uno)
                </p>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ubicación
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Ingresa la dirección del servicio"
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={request.location}
                  onChange={e => setRequest(prev => ({ ...prev, location: e.target.value }))}
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Buscar Profesionales
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}