
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlanSelectionProvider } from "@/contexts/PlanSelectionContext";
import Index from "./pages/Index";

// Site pages
import SiteIndex from "./pages/site/index";

// Client pages (public)
import ClientLogin from "./pages/client/login";
import PlanSelection from "./pages/client/plan-selection";
import ClientRegister from "./pages/client/register";
import FacialBiometry from "./pages/client/facial-biometry";

// Client pages (protected)
import ClientProducts from "./pages/client/products";
import ESIMActivation from "./pages/client/esim-activation";
import ClientProfile from "./pages/client/profile";
import ClientDashboard from "./pages/client/dashboard";
import NetworkTree from "./pages/client/network-tree";
import DocumentVerification from "./pages/client/document-verification";
import ClientBanking from "./pages/client/banking";
import ClientCommissions from "./pages/client/commissions";
import ClientReferrals from "./pages/client/referrals";
import PaymentReturn from "./pages/client/payment-return";

// Admin pages (protected)
import AdminDashboard from "./pages/admin/dashboard";
import AdminPlans from "./pages/admin/plans";
import AdminUsers from "./pages/admin/users";
import AdminNetworks from "./pages/admin/networks";
import AdminSettings from "./pages/admin/settings";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PlanSelectionProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Root */}
              <Route path="/" element={<Index />} />
              
              {/* Site routes */}
              <Route path="/site" element={<SiteIndex />} />
              
              {/* Client public routes */}
              <Route path="/client/login" element={<ClientLogin />} />
              <Route path="/client/plan-selection" element={<PlanSelection />} />
              <Route path="/client/register" element={<ClientRegister />} />
              <Route path="/client/facial-biometry" element={<FacialBiometry />} />
              
              {/* Client protected routes */}
              <Route path="/client/dashboard" element={<ClientDashboard />} />
              <Route path="/client/products" element={<ClientProducts />} />
              <Route path="/client/esim-activation" element={<ESIMActivation />} />
              <Route path="/client/profile" element={<ClientProfile />} />
              <Route path="/client/network-tree" element={<NetworkTree />} />
              <Route path="/client/document-verification" element={<DocumentVerification />} />
              <Route path="/client/banking" element={<ClientBanking />} />
              <Route path="/client/commissions" element={<ClientCommissions />} />
              <Route path="/client/referrals" element={<ClientReferrals />} />
              <Route path="/client/payment-return" element={<PaymentReturn />} />
              
              {/* Admin protected routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/plans" element={<AdminPlans />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/networks" element={<AdminNetworks />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PlanSelectionProvider>
    </QueryClientProvider>
  );
}

export default App;
