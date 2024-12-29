export const isWithinWorkingHours = (
  selectedTime: string,
  startTime: string,
  endTime: string,
  selectedDate?: string
): boolean => {
  // Convertir las horas a minutos para facilitar la comparación
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Convertir el formato "8:00 AM" a "08:00"
  const convertTo24Hour = (time: string): string => {
    const [timeStr, period] = time.split(' ');
    let [hours, minutes] = timeStr.split(':').map(Number);
    
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // Si el tiempo incluye AM/PM, convertirlo a formato 24 horas
  const normalizedStartTime = startTime.includes('AM') || startTime.includes('PM') 
    ? convertTo24Hour(startTime)
    : startTime;
  
  const normalizedEndTime = endTime.includes('AM') || endTime.includes('PM')
    ? convertTo24Hour(endTime)
    : endTime;

  const selected = timeToMinutes(selectedTime);
  const start = timeToMinutes(normalizedStartTime);
  const end = timeToMinutes(normalizedEndTime);

  // Validar que la hora esté dentro del rango
  const isTimeValid = selected >= start && selected <= end;

  // Si se proporciona una fecha, validar también el día
  if (selectedDate) {
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

    // Validar según el día de la semana
    if (dayOfWeek === 0) { // Domingo
      return false; // Cerrado los domingos
    } else if (dayOfWeek === 6) { // Sábado
      // Usar horario especial de sábado si es necesario
      return isTimeValid;
    } else { // Lunes a Viernes
      return isTimeValid;
    }
  }

  return isTimeValid;
};

export const isValidDate = (date: string): boolean => {
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // La fecha debe ser hoy o en el futuro
  return selectedDate >= today;
};

export const formatTime = (time: string): string => {
  // Convertir "09:14" a "09:14 AM"
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

export const parseWorkingHours = (timeRange: string): { start: string; end: string } => {
  const [start, end] = timeRange.split(' - ');
  return { start, end };
};