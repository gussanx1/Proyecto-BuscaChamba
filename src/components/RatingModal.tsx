import React, { useState } from 'react';
import { Star, X } from 'lucide-react';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  workerName: string;
  service: string;
}

export function RatingModal({ isOpen, onClose, onSubmit, workerName, service }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Por favor selecciona una calificación');
      return;
    }
    onSubmit(rating, comment);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">¿Qué te pareció el servicio?</h2>
            <p className="text-gray-600">
              Tu opinión nos ayuda a mejorar el servicio de {workerName}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Stars */}
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => {
                    setRating(star);
                    setError('');
                  }}
                  className="p-1 transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    size={32}
                    className={`${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>

            {/* Rating Description */}
            <div className="text-center">
              <p className="text-lg font-medium text-gray-700">
                {rating === 5 && '¡Excelente!'}
                {rating === 4 && '¡Muy Bueno!'}
                {rating === 3 && 'Bueno'}
                {rating === 2 && 'Regular'}
                {rating === 1 && 'Malo'}
              </p>
            </div>

            {/* Comment */}
            <div className="space-y-2">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                Cuéntanos más sobre tu experiencia
              </label>
              <textarea
                id="comment"
                rows={4}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none p-4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="¿Qué te gustó? ¿Qué podría mejorar?"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Enviar Calificación
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}