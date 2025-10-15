
export function validateCPF(cpf: string) {
  cpf = cpf.replace(/[^\d]/g, '');
  
  if (cpf.length !== 11) return false;
  
  if (/^(\d)\1+$/.test(cpf)) return false;
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;
  
  return true;
}

// Alias for isValidCPF (to maintain backward compatibility)
export const isValidCPF = validateCPF;

// Function to validate partial CPF (first 5 digits only)
export function validatePartialCPF(partialCpf: string) {
  // Remove non-digits
  partialCpf = partialCpf.replace(/[^\d]/g, '');
  
  // Check if it has exactly 5 digits
  if (partialCpf.length !== 5) return false;
  
  // Check if it's not a repetition of the same digit
  if (/^(\d)\1+$/.test(partialCpf)) return false;
  
  // All checks passed
  return true;
}
