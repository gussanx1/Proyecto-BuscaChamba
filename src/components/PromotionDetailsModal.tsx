import React from 'react';
import { X, Calendar, Tag, Clock } from 'lucide-react';

interface PromotionDetailsModalProps {
  promotion: {
    id: number;
    title: string;
    description: string;
    image: string;
    discount: string;
    validUntil: string;
    fullDescription?: string;
    terms?: string[];
    services?: string[];
  };
  onClose: () => void;
}

export function PromotionDetailsModal({ promotion, onClose }: PromotionDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-lg my-8 overflow-hidden animate-bounce-in relative">
        {/* Header Image */}
        <div className="relative h-48">
          <img
            src={promotion.image}
            alt={promotion.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-yellow-400 text-black font-bold px-3 py-1 rounded-full text-sm">
            {promotion.discount} OFF
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{promotion.title}</h2>
          <p className="text-gray-600 text-sm mb-4">{promotion.description}</p>

          {/* Details */}
          <div className="space-y-4">
            {/* Validity */}
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Calendar className="text-green-600" size={16} />
              <span>Válido hasta {promotion.validUntil}</span>
            </div>

            {/* Services Included */}
            {promotion.services && (
              <div>
                <h3 className="font-semibold text-sm mb-2">Servicios Incluidos:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {promotion.services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-green-50 p-2 rounded-lg text-sm"
                    >
                      <Tag className="text-green-600" size={14} />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full Description */}
            {promotion.fullDescription && (
              <div>
                <h3 className="font-semibold text-sm mb-2">Detalles de la Promoción:</h3>
                <p className="text-gray-600 text-sm">{promotion.fullDescription}</p>
              </div>
            )}

            {/* Terms and Conditions */}
            {promotion.terms && (
              <div>
                <h3 className="font-semibold text-sm mb-2">Términos y Condiciones:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                  {promotion.terms.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Validity Period */}
            <div className="bg-yellow-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-800">
                <Clock size={16} />
                <span className="font-medium text-sm">¡No te lo pierdas!</span>
              </div>
              <p className="mt-1 text-yellow-700 text-sm">
                Esta oferta especial está disponible solo hasta el {promotion.validUntil}. 
                ¡Aprovecha este descuento exclusivo!
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={onClose}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}