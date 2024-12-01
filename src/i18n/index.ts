import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "administration": "ADMINISTRATION",
      "user": "User",
      "password": "Password",
      "enter": "Enter",
      "entering": "Entering...",
      "technology_by": "Technology by",
      "login_error": "Login error",
      "check_credentials": "Check your credentials and try again.",
      "create_account": "Create Account",
      "full_name": "Full Name",
      "email": "Email",
      "cpf": "CPF",
      "referral_id": "Referral ID (optional)",
      "custom_id": "Your Custom ID",
      "recaptcha_error": "Please complete the reCAPTCHA verification",
      "custom_id_in_use": "This Custom ID is already in use",
      "success": "Success",
      "account_created": "Account created successfully! Check your email to confirm registration.",
      "registration_error": "Registration error",
      "not_registered": "Not registered? Sign up here!",
      "name_min_length": "Name must have at least 3 characters",
      "invalid_email": "Invalid email",
      "password_min_length": "Password must have at least 6 characters",
      "invalid_cpf": "Invalid CPF",
      "custom_id_min_length": "Custom ID must have at least 3 characters",
      "custom_id_invalid_chars": "Custom ID must contain only letters and numbers"
    }
  },
  pt: {
    translation: {
      "administration": "ADMINISTRAÇÃO",
      "user": "Usuário",
      "password": "Senha",
      "enter": "Entrar",
      "entering": "Entrando...",
      "technology_by": "Tecnologia por",
      "login_error": "Erro ao fazer login",
      "check_credentials": "Verifique suas credenciais e tente novamente.",
      "create_account": "Criar Conta",
      "full_name": "Nome Completo",
      "email": "Email",
      "cpf": "CPF",
      "referral_id": "ID de Indicação (opcional)",
      "custom_id": "Seu ID Personalizado",
      "recaptcha_error": "Por favor, complete a verificação reCAPTCHA",
      "custom_id_in_use": "Este ID personalizado já está em uso",
      "success": "Sucesso",
      "account_created": "Conta criada com sucesso! Verifique seu email para confirmar o cadastro.",
      "registration_error": "Erro no cadastro",
      "not_registered": "Não é cadastrado? Cadastre-se aqui!",
      "name_min_length": "Nome deve ter pelo menos 3 caracteres",
      "invalid_email": "Email inválido",
      "password_min_length": "Senha deve ter pelo menos 6 caracteres",
      "invalid_cpf": "CPF inválido",
      "custom_id_min_length": "ID personalizado deve ter pelo menos 3 caracteres",
      "custom_id_invalid_chars": "ID personalizado deve conter apenas letras e números"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "pt", // Define português como idioma padrão
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;