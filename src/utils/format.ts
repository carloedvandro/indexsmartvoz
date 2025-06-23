
export const formatCurrency = (value: number, currency: string = 'BRL') => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
  }).format(value);
};

export const formatDate = (date: string | Date | null | undefined) => {
  if (!date) return '-';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(dateObj);
};

export const formatCurrencyInput = (value: string): string => {
  // Remove tudo que não é dígito
  const digits = value.replace(/\D/g, '');
  
  // Se não há dígitos, retorna vazio
  if (!digits) return '';
  
  // Converte para número (centavos)
  const amount = parseInt(digits, 10) / 100;
  
  // Formata como moeda brasileira
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const parseCurrencyInput = (formattedValue: string): number => {
  // Remove símbolos de moeda e espaços, substitui vírgula por ponto
  const cleanValue = formattedValue
    .replace(/[R$\s]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
  
  return parseFloat(cleanValue) || 0;
};
