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
      "sign_up": "Cadastrar",
      "signing_up": "Cadastrando...",
      "welcome_to": "Bem-vindo ao",
      "choose_access": "Escolha como deseja acessar o sistema",
      "client_area": "Área do Cliente",
      "admin_area": "Área Administrativa",
      "forgot_password": "Esqueceu sua senha?",
      "reset_password": "Redefinir Senha",
      "reset_password_success": "Email enviado com sucesso",
      "reset_password_error": "Erro ao enviar email",
      "check_email": "Verifique sua caixa de entrada para redefinir sua senha",
      "update_password": "Atualizar Senha",
      "update_password_success": "Senha atualizada com sucesso",
      "update_password_error": "Erro ao atualizar senha",
      "new_password": "Nova Senha",
      "confirm_password": "Confirmar Senha",
      "passwords_dont_match": "As senhas não conferem",
      "cancel": "Cancelar",
      "save": "Salvar",
      "loading": "Carregando...",
      "error": "Erro",
      "search": "Buscar",
      "actions": "Ações",
      "edit": "Editar",
      "delete": "Excluir",
      "confirm": "Confirmar",
      "confirm_delete": "Confirmar exclusão",
      "confirm_delete_message": "Tem certeza que deseja excluir este item?",
      "yes": "Sim",
      "no": "Não",
      "status": {
        "pending": "Pendente",
        "active": "Ativo",
        "blocked": "Bloqueado"
      },
      "sign_in": {
        "email_label": "Endereço de email",
        "password_label": "Senha",
        "button_label": "Entrar",
        "loading_button_label": "Entrando...",
        "password_input_placeholder": "Digite sua senha",
        "email_input_placeholder": "Digite seu endereço de email",
        "already_have_account": "Já tem uma conta? Entre aqui",
        "missing_email": "Email não informado",
        "anonymous_disabled": "Login anônimo está desabilitado"
      },
      "reset_password_form": {
        "email_label": "Endereço de email",
        "email_placeholder": "Digite seu endereço de email",
        "submit_button": "Enviar instruções de recuperação",
        "loading_button": "Enviando instruções...",
        "success_message": "Instruções enviadas para seu email",
        "already_have_account": "Já tem uma conta? Entre aqui",
        "forgot_password": "Esqueceu sua senha?",
        "create_account": "Não tem uma conta? Cadastre-se"
      }
    }
  },
  en: {
    translation: {
      "administration": "ADMINISTRATION",
      "welcome_to": "Welcome to",
      "choose_access": "Choose how you want to access the system",
      "client_area": "Client Area",
      "admin_area": "Administrative Area",
      "forgot_password": "Forgot password?",
      "reset_password": "Reset Password",
      "update_password": "Update Password",
      "sign_in": {
        "email_label": "Email address",
        "password_label": "Password",
        "button_label": "Sign in",
        "loading_button_label": "Signing in...",
        "password_input_placeholder": "Enter your password",
        "email_input_placeholder": "Enter your email address",
        "already_have_account": "Already have an account? Sign in",
        "missing_email": "Missing email or phone",
        "anonymous_disabled": "Anonymous sign-ins are disabled"
      },
      "reset_password_form": {
        "email_label": "Email address",
        "email_placeholder": "Your email address",
        "submit_button": "Reset Password",
        "success_message": "Instructions sent to your email",
        "already_have_account": "Already have an account? Sign in"
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