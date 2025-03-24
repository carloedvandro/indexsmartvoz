
export const formatCurrency = (value: number, currency: string = 'BRL') => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
  }).format(value);
};

/**
 * Formats a date to the Brazilian format DD/MM/YYYY
 */
export const formatDateBR = (date: Date | string | null | undefined): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return '';
  
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  
  return `${day}/${month}/${year}`;
};

/**
 * Formats a date string from DD/MM/YYYY to YYYY-MM-DD for database storage
 */
export const formatDateForDB = (dateString: string): string | null => {
  if (!dateString) return null;
  
  // Already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}/.test(dateString)) {
    return dateString.split('T')[0]; // Remove time part if present
  }
  
  const parts = dateString.split('/');
  if (parts.length !== 3) return null;
  
  const [day, month, year] = parts;
  return `${year}-${month}-${day}`;
};

/**
 * Formats a date from database (YYYY-MM-DD) for input[type="date"]
 */
export const formatDateForInput = (dateString: string | null | undefined): string => {
  if (!dateString) return '';
  
  // If already in YYYY-MM-DD format, return as is
  if (/^\d{4}-\d{2}-\d{2}/.test(dateString)) {
    return dateString.split('T')[0]; // Remove time part if present
  }
  
  // If in DD/MM/YYYY format, convert to YYYY-MM-DD
  const parts = dateString.split('/');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month}-${day}`;
  }
  
  return '';
};
