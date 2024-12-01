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
      "check_credentials": "Check your credentials and try again."
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
      "check_credentials": "Verifique suas credenciais e tente novamente."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "pt",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;