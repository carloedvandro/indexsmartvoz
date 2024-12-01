export function validatePasswordStrength(password: string): { isValid: boolean; message: string } {
  if (password.length < 8) {
    return { 
      isValid: false, 
      message: "A senha deve ter pelo menos 8 caracteres" 
    };
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
    return { 
      isValid: false, 
      message: "A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais" 
    };
  }

  return { isValid: true, message: "" };
}