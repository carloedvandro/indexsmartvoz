
/**
 * Validates a CPF (Brazilian individual taxpayer registry) number
 * @param cpf The CPF to validate (with or without formatting)
 * @returns Boolean indicating if the CPF is valid
 */
export const isValidCPF = (cpf: string): boolean => {
  // Remover caracteres não numéricos
  cpf = cpf.replace(/[^\d]+/g, '');
  
  // Verificar se tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }
  
  // Verificar se não são dígitos repetidos (00000000000, 11111111111, etc)
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }
  
  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  let digit1 = remainder === 10 || remainder === 11 ? 0 : remainder;
  
  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  let digit2 = remainder === 10 || remainder === 11 ? 0 : remainder;
  
  // Verificar se os dígitos calculados são iguais aos informados
  return (
    digit1 === parseInt(cpf.charAt(9)) &&
    digit2 === parseInt(cpf.charAt(10))
  );
};

/**
 * Validates the first 5 digits of a CPF (for initial biometric verification stage)
 * @param cpfDigits The first 5 digits of the CPF
 * @returns Boolean indicating if the digits are valid
 */
export const validatePartialCPF = (cpfDigits: string): boolean => {
  // Remove non-numeric characters
  const digits = cpfDigits.replace(/\D/g, '');
  
  // Check if it has 5 digits
  if (digits.length !== 5) {
    return false;
  }
  
  // Check if it's not repeated digits (00000, 11111, etc)
  if (/^(\d)\1+$/.test(digits)) {
    return false;
  }
  
  // Verify if the digits are valid (basic verification)
  const firstDigit = parseInt(digits[0]);
  if (firstDigit < 0 || firstDigit > 9) {
    return false;
  }
  
  return true;
};

/**
 * Formats a CPF for display (format: 123.456.789-00)
 * @param cpf The CPF without formatting
 * @returns The formatted CPF
 */
export const formatCPF = (cpf: string): string => {
  // Remove non-numeric characters
  cpf = cpf.replace(/\D/g, '');
  
  // Apply mask
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

// Export the validateCPF function as well for backward compatibility
export const validateCPF = isValidCPF;
