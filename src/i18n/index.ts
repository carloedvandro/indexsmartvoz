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
        "password_input_placeholder": "Digite sua senha",
        "email_input_placeholder": "Digite seu email",
        "link_text": "Não tem uma conta? Cadastre-se"
      }
    }
  },
  en: {
    translation: {
      "administration": "ADMINISTRATION",
      "welcome_to": "Welcome to",
      "choose_access": "Choose how you want to access the system",
      "client_area": "Client Area",
      "admin_area": "Administrative Area"
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