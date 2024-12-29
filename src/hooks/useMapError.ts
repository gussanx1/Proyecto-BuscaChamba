import { useState, useCallback } from 'react';

export function useMapError() {
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((error: Error) => {
    console.error('Google Maps error:', error);

    if (error.message.includes('RefererNotAllowedMapError')) {
      setError('Error de configuración del mapa. Por favor, verifique la clave API y las restricciones de dominio.');
    } else if (error.message.includes('LoaderError')) {
      setError('No se pudo cargar el mapa. Por favor, verifique su conexión a internet.');
    } else {
      setError('Ocurrió un error al cargar el mapa. Por favor, intente nuevamente.');
    }
  }, []);

  return { error, handleError };
}