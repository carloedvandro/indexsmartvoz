
/**
 * Valida os primeiros dígitos de um CPF (para etapa inicial da verificação biométrica)
 * @param cpfDigits Os primeiros 5 dígitos do CPF
 * @returns Boolean indicando se os dígitos são válidos
 */
export const validatePartialCPF = (cpfDigits: string): boolean => {
  // Remover caracteres não numéricos
  const digits = cpfDigits.replace(/\D/g, '');
  
  // Verificar se tem 5 dígitos
  if (digits.length !== 5) {
    return false;
  }
  
  // Verificar se não são dígitos repetidos (00000, 11111, etc)
  if (/^(\d)\1+$/.test(digits)) {
    return false;
  }
  
  // Verificar se os dígitos são válidos (verificação básica)
  const firstDigit = parseInt(digits[0]);
  if (firstDigit < 0 || firstDigit > 9) {
    return false;
  }
  
  return true;
};

/**
 * Valida um CPF completo
 * @param cpf O CPF completo (com ou sem formatação)
 * @returns Boolean indicando se o CPF é válido
 */
export const validateCPF = (cpf: string): boolean => {
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
 * Formata um CPF para exibição (formato: 123.456.789-00)
 * @param cpf O CPF sem formatação
 * @returns O CPF formatado
 */
export const formatCPF = (cpf: string): string => {
  // Remover caracteres não numéricos
  cpf = cpf.replace(/\D/g, '');
  
  // Aplicar máscara
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

// Alias for isValidCPF (to maintain backward compatibility)
export const isValidCPF = validateCPF;
