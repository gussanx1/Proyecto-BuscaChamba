import React, { useState, useRef } from 'react';
import { X, Camera, Upload, Image as ImageIcon, Film, Send, Info } from 'lucide-react';
import { validateImageFile, fileToBase64 } from '../../utils/imageUtils';

interface WorkEvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: number;
  clientName: string;
  service: string;
}

interface Evidence {
  type: 'before' | 'after';
  files: {
    url: string;
    type: 'image' | 'video';
    file: File;
  }[];
}

export function WorkEvidenceModal({ isOpen, onClose, jobId, clientName, service }: WorkEvidenceModalProps) {
  const [description, setDescription] = useState('');
  const [evidence, setEvidence] = useState<Evidence>({
    before: { files: [] },
    after: { files: [] }
  });
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('before');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValid = validateImageFile(file) || file.type.startsWith('video/');
      if (!isValid) {
        alert('Por favor selecciona imágenes (JPG, PNG, GIF) o videos, máximo 10MB por archivo');
      }
      return isValid;
    });

    const newFiles = await Promise.all(
      validFiles.map(async (file) => ({
        url: URL.createObjectURL(file),
        type: file.type.startsWith('video/') ? 'video' : 'image',
        file
      }))
    );

    setEvidence(prev => ({
      ...prev,
      [activeTab]: {
        files: [...prev[activeTab].files, ...newFiles]
      }
    }));
  };

  const removeFile = (index: number) => {
    setEvidence(prev => ({
      ...prev,
      [activeTab]: {
        files: prev[activeTab].files.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = async () => {
    // Aquí iría la lógica para enviar al servidor
    const formData = new FormData();
    formData.append('jobId', jobId.toString());
    formData.append('description', description);
    
    evidence.before.files.forEach((file, index) => {
      formData.append(`before_${index}`, file.file);
    });
    
    evidence.after.files.forEach((file, index) => {
      formData.append(`after_${index}`, file.file);
    });

    // Simular envío
    console.log('Enviando evidencia:', formData);
    alert('Evidencia enviada correctamente');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-400 p-4">
          <div className="flex justify-between items-center">
            <div className="text-white">
              <h2 className="text-xl font-bold">Documentar Trabajo</h2>
              <p className="text-sm text-green-50">{service} - {clientName}</p>
            </div>
            <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-full">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('before')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'before'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Antes
            </button>
            <button
              onClick={() => setActiveTab('after')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'after'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Después
            </button>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción del trabajo
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={3}
              placeholder="Describe el trabajo realizado..."
            />
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Fotos y Videos
              </label>
              <span className="text-xs text-gray-500">
                {evidence[activeTab].files.length} archivos
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {evidence[activeTab].files.map((file, index) => (
                <div key={index} className="relative group aspect-square">
                  {file.type === 'video' ? (
                    <video
                      src={file.url}
                      className="w-full h-full object-cover rounded-lg"
                      controls
                    />
                  ) : (
                    <img
                      src={file.url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
              >
                <Upload size={20} />
                <span>Subir archivos</span>
              </button>
              <button
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.accept = 'image/*';
                    fileInputRef.current.click();
                  }
                }}
                className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
              >
                <Camera size={20} />
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <div className="flex gap-2 text-blue-700">
              <Info size={20} />
              <div>
                <p className="font-medium">Recomendaciones:</p>
                <ul className="text-sm mt-1 space-y-1">
                  <li>• Toma fotos con buena iluminación</li>
                  <li>• Incluye vistas generales y detalles</li>
                  <li>• Asegúrate que las imágenes sean claras</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!description || (evidence.before.files.length === 0 && evidence.after.files.length === 0)}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Send size={20} />
            Enviar Evidencia
          </button>
        </div>
      </div>
    </div>
  );
}