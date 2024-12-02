import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import "./App.css";

// Admin pages
import AdminDashboard from "./pages/admin/dashboard";
import AdminLogin from "./pages/admin/login";
import AdminNetwork from "./pages/admin/network";
import AdminPlans from "./pages/admin/plans";
import AdminUsers from "./pages/admin/users";

// Client pages
import ClientDashboard from "./pages/client/dashboard";
import ClientLogin from "./pages/client/login";
import ClientNetwork from "./pages/client/network";
import ClientRegister from "./pages/client/register";
import ClientNews from "./pages/client/news";
import UpgradePage from "./pages/client/upgrade";
import Index from "./pages/Index";

const queryClient = new QueryClient();

function AppRoutes() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        {/* Index route */}
        <Route path="/" element={<Index />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/network" element={<AdminNetwork />} />
        <Route path="/admin/plans" element={<AdminPlans />} />
        <Route path="/admin/users" element={<AdminUsers />} />

        {/* Client routes */}
        <Route path="/client/login" element={<ClientLogin />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/client/network" element={<ClientNetwork />} />
        <Route path="/client/register" element={<ClientRegister />} />
        <Route path="/client/upgrade" element={<UpgradePage />} />
        <Route path="/client/news" element={<ClientNews />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AppRoutes />
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;