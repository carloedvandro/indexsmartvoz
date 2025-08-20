import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlanSelectionProvider } from "@/contexts/PlanSelectionContext";
import Index from "./pages/Index";

// Public routes
import ClientPlanSelection from "./pages/client/plan-selection";
import ClientPlanConfiguration from "./pages/client/plan-configuration";
import ClientRegister from "./pages/client/register";

// Protected routes (require authentication)
import ClientProducts from "./pages/client/products";
import ClientLogin from "./pages/client/login";
import FacialBiometry from "./pages/client/facial-biometry";
import DocumentVerification from "./pages/client/document-verification";

// Admin routes
import AdminLogin from "./pages/admin/login";
import AdminDashboard from "./pages/admin/dashboard";
import AdminUsers from "./pages/admin/users";
import AdminPlans from "./pages/admin/plans";
import AdminNetworkPlans from "./pages/admin/network-plans";
import AdminCommissions from "./pages/admin/commissions";
import AdminPayments from "./pages/admin/payments";
import AdminSettings from "./pages/admin/settings";
import AdminReports from "./pages/admin/reports";

// Store routes
import StoreOwnerDashboard from "./pages/store-owner/dashboard";
import StoreOwnerLogin from "./pages/store-owner/login";
import StoreOwnerRegister from "./pages/store-owner/register";
import StoreOwnerProfile from "./pages/store-owner/profile";
import StoreOwnerCommissions from "./pages/store-owner/commissions";
import StoreOwnerPayments from "./pages/store-owner/payments";
import StoreOwnerClients from "./pages/store-owner/clients";
import StoreOwnerReports from "./pages/store-owner/reports";
import StoreOwnerSettings from "./pages/store-owner/settings";

// Client routes
import ClientEsim from "./pages/client/esim";
import ClientRecharge from "./pages/client/recharge";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PlanSelectionProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Public routes - no authentication required */}
            <Route path="/client/plan-selection" element={<ClientPlanSelection />} />
            <Route path="/client/plan-configuration" element={<ClientPlanConfiguration />} />
            <Route path="/client/register" element={<ClientRegister />} />
            <Route path="/client/login" element={<ClientLogin />} />
            
            {/* Protected routes - require authentication */}
            <Route path="/client/products" element={<ClientProducts />} />
            <Route path="/client/facial-biometry" element={<FacialBiometry />} />
            <Route path="/client/document-verification" element={<DocumentVerification />} />
            <Route path="/client/esim" element={<ClientEsim />} />
            <Route path="/client/recharge" element={<ClientRecharge />} />
            
            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/plans" element={<AdminPlans />} />
            <Route path="/admin/network-plans" element={<AdminNetworkPlans />} />
            <Route path="/admin/commissions" element={<AdminCommissions />} />
            <Route path="/admin/payments" element={<AdminPayments />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            
            {/* Store Owner routes */}
            <Route path="/store-owner/login" element={<StoreOwnerLogin />} />
            <Route path="/store-owner/register" element={<StoreOwnerRegister />} />
            <Route path="/store-owner/dashboard" element={<StoreOwnerDashboard />} />
            <Route path="/store-owner/profile" element={<StoreOwnerProfile />} />
            <Route path="/store-owner/commissions" element={<StoreOwnerCommissions />} />
            <Route path="/store-owner/payments" element={<StoreOwnerPayments />} />
            <Route path="/store-owner/clients" element={<StoreOwnerClients />} />
            <Route path="/store-owner/reports" element={<StoreOwnerReports />} />
            <Route path="/store-owner/settings" element={<StoreOwnerSettings />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PlanSelectionProvider>
  </QueryClientProvider>
);

export default App;
