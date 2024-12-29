import React from 'react';
import { Map } from 'lucide-react';

interface MapContainerProps {
  className?: string;
}

export function MapContainer({ className = 'w-full h-[400px]' }: MapContainerProps) {
  return (
    <div className={className}>
      <div className="w-full h-full bg-gray-100 rounded-lg flex flex-col items-center justify-center">
        <Map className="w-12 h-12 text-gray-400 mb-4" />
        <div className="text-center px-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Ubicación en Trujillo
          </h3>
          <p className="text-sm text-gray-600">
            El trabajador se encuentra en el área de servicio de Trujillo
          </p>
        </div>
      </div>
    </div>
  );
}