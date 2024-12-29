import React from 'react';
import { Map } from 'lucide-react';

interface MapErrorProps {
  message: string;
}

export function MapError({ message }: MapErrorProps) {
  return (
    <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center p-6">
        <Map className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No se pudo cargar el mapa
        </h3>
        <p className="text-sm text-gray-600">
          {message}
        </p>
      </div>
    </div>
  );
}