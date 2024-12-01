import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
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
      "custom_id_invalid_chars": "ID personalizado deve conter apenas letras e números",
      "forgot_password": "Esqueceu sua senha?",
      "sign_up": "Cadastrar",
      "signing_up": "Cadastrando...",
      "dont_have_account": "Não tem uma conta? Cadastre-se",
      "welcome_to": "Bem-vindo ao",
      "choose_access": "Escolha como deseja acessar o sistema",
      "client_area": "Área do Cliente",
      "admin_area": "Área Administrativa",
      "sign_in": {
        "email_label": "Email",
        "password_label": "Senha",
        "button_label": "Entrar",
        "loading_button_label": "Entrando...",
        "password_input_placeholder": "Sua senha",
        "email_input_placeholder": "seu@email.com",
        "link_text": "Não tem uma conta? Cadastre-se"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "pt",
    fallbackLng: "pt",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;