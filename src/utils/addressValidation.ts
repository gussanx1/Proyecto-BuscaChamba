export const validateAddress = (address: {
  street: string;
  number: string;
  district: string;
  reference?: string;
}): boolean => {
  // Validación básica
  if (!address.street.trim() || !address.number.trim() || !address.district.trim()) {
    return false;
  }

  // Validar que el número sea numérico o alfanumérico válido
  const validNumber = /^[0-9A-Za-z\-\/]+$/.test(address.number);
  if (!validNumber) {
    return false;
  }

  // Validar longitud mínima de la calle
  if (address.street.length < 3) {
    return false;
  }

  // Validar longitud mínima del distrito
  if (address.district.length < 3) {
    return false;
  }

  return true;
};