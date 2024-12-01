import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from "@/integrations/supabase/client";
import AdminLogin from "./pages/admin/login";
import AdminDashboard from "./pages/admin/dashboard";
import AdminUsers from "./pages/admin/users";
import AdminPlans from "./pages/admin/plans";
import AdminNetwork from "./pages/admin/network";
import ClientLogin from "./pages/client/login";
import ClientRegister from "./pages/client/register";
import ClientDashboard from "./pages/client/dashboard";

function App() {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/plans" element={<AdminPlans />} />
              <Route path="/admin/network" element={<AdminNetwork />} />
              <Route path="/" element={<ClientLogin />} />
              <Route path="/register" element={<ClientRegister />} />
              <Route path="/reset-password" element={
                <Auth 
                  supabaseClient={supabase}
                  view="reset_password"
                  appearance={{ theme: ThemeSupa }}
                />
              } />
              <Route path="/update-password" element={
                <Auth 
                  supabaseClient={supabase}
                  view="update_password"
                  appearance={{ theme: ThemeSupa }}
                />
              } />
              <Route path="/client/dashboard" element={<ClientDashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;