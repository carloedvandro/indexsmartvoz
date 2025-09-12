import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlanSelectionProvider } from "@/contexts/PlanSelectionContext";
import Index from "./pages/Index";

// Layouts
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { ClientLayout } from "@/components/layouts/ClientLayout";

// Public routes
import ClientPlanSelection from "./pages/client/plan-selection";
import ClientPlanConfiguration from "./pages/client/plan-configuration";
import ClientRegister from "./pages/client/register";

// Protected routes (require authentication)
import ClientProducts from "./pages/client/products";
import ClientLogin from "./pages/client/login";
import FacialBiometry from "./pages/client/facial-biometry";
import Dashboard from "./pages/client/dashboard";
import { DocumentVerification } from "./pages/client/DocumentVerification";

import AdminLogin from "./pages/admin/login";
import AdminDashboard from "./pages/admin/dashboard";
import AdminUsers from "./pages/admin/users";
import AdminPlans from "./pages/admin/plans";
import AdminReports from "./pages/admin/reports";

import ClientEsim from "./pages/client/esim";
import RegisterFlow from "./pages/register/register-flow";
import AdminPlanAddEdit from "./pages/admin/plans/add-edit";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PlanSelectionProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/new-user" element={<RegisterFlow />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Client routes with ClientLayout */}
            <Route path="/client" element={<ClientLayout />}>
              <Route
                path="plan-configuration"
                element={<ClientPlanConfiguration />}
              />    <Route
                path="dashboard"
                element={<Dashboard />}
              />
              <Route path="register" element={<ClientRegister />} />
              <Route path="login" element={<ClientLogin />} />
              <Route path="products" element={<ClientProducts />} />
              <Route path="facial-biometry" element={<FacialBiometry />} />
              <Route
                path="document-verification"
                element={<DocumentVerification />}
              />
              <Route path="esim" element={<ClientEsim />} />
            </Route>

            {/* Admin routes with AdminLayout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="plans" element={<AdminPlans />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="plans/add-edit" element={<AdminPlanAddEdit />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PlanSelectionProvider>
  </QueryClientProvider>
);

export default App;
