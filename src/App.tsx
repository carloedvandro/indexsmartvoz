import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

// Pages
import Index from "@/pages/Index";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminUsers from "@/pages/admin/users";
import AdminPlans from "@/pages/admin/plans";
import AdminNetwork from "@/pages/admin/network";
import ClientLogin from "@/pages/client/login";
import ClientDashboard from "@/pages/client/dashboard";
import ClientRegister from "@/pages/client/register";
import NetworkPage from "@/pages/client/network";

// Styles
import "@/App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      
      {/* Client Routes */}
      <Route path="/client">
        <Route path="login" element={<ClientLogin />} />
        <Route path="dashboard" element={<ClientDashboard />} />
        <Route path="network" element={<NetworkPage />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin">
        <Route index element={<AdminLogin />} />
        <Route path="login" element={<AdminLogin />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="plans" element={<AdminPlans />} />
        <Route path="network" element={<AdminNetwork />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/register" element={<ClientRegister />} />
      <Route path="/reset-password" element={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm">
            <Auth 
              supabaseClient={supabase}
              view="forgotten_password"
              appearance={{ 
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#00ffa3',
                      brandAccent: '#004d31',
                    },
                  },
                },
              }}
              showLinks={false}
              redirectTo={`${window.location.origin}/update-password`}
              localization={{
                variables: {
                  sign_in: {
                    email_label: "Email",
                    password_label: "Senha",
                    button_label: "Entrar",
                    loading_button_label: "Entrando...",
                    password_input_placeholder: "Digite sua senha",
                    email_input_placeholder: "Digite seu email",
                  },
                  forgotten_password: {
                    email_label: "Email",
                    button_label: "Enviar instruções",
                    loading_button_label: "Enviando...",
                    link_text: "Esqueceu sua senha?",
                    confirmation_text: "Verifique seu email para redefinir sua senha",
                  },
                  update_password: {
                    password_label: "Nova Senha",
                    button_label: "Atualizar senha",
                    loading_button_label: "Atualizando...",
                    confirmation_text: "Sua senha foi atualizada",
                  },
                },
              }}
            />
          </div>
        </div>
      } />
      <Route path="/update-password" element={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm">
            <Auth 
              supabaseClient={supabase}
              view="update_password"
              appearance={{ 
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#00ffa3',
                      brandAccent: '#004d31',
                    },
                  },
                },
              }}
              showLinks={false}
              redirectTo={`${window.location.origin}/admin`}
              localization={{
                variables: {
                  sign_in: {
                    email_label: "Email",
                    password_label: "Senha",
                    button_label: "Entrar",
                    loading_button_label: "Entrando...",
                    password_input_placeholder: "Digite sua senha",
                    email_input_placeholder: "Digite seu email",
                  },
                  forgotten_password: {
                    email_label: "Email",
                    button_label: "Enviar instruções",
                    loading_button_label: "Enviando...",
                    link_text: "Esqueceu sua senha?",
                    confirmation_text: "Verifique seu email para redefinir sua senha",
                  },
                  update_password: {
                    password_label: "Nova Senha",
                    button_label: "Atualizar senha",
                    loading_button_label: "Atualizando...",
                    confirmation_text: "Sua senha foi atualizada",
                  },
                },
              }}
            />
          </div>
        </div>
      } />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <Toaster />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;