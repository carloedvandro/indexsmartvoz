import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import CompanySite from "@/pages/CompanySite";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RoleBasedRoute } from "@/components/RoleBasedRoute";

// Client pages
import ClientLogin from "@/pages/client/login";
import ClientRegister from "@/pages/client/register";
import ClientDashboard from "@/pages/client/dashboard";
import ClientFinancial from "@/pages/client/financial";
import ClientNetwork from "@/pages/client/network";
import ClientProfile from "@/pages/client/profile";
import ClientBanking from "@/pages/client/profile/banking";
import ClientSecurityPassword from "@/pages/client/profile/security-password";
import ClientProducts from "@/pages/client/products";
import ClientNotifications from "@/pages/client/notifications";
import ClientEsim from "@/pages/client/esim";
import ClientFacialBiometry from "@/pages/client/facial-biometry";
import { DocumentVerification } from "@/pages/client/DocumentVerification";
import { VerificationComplete } from "@/pages/client/VerificationComplete";
import { VerificationRejected } from "@/pages/client/VerificationRejected";
import UserDashboard from "@/pages/client/UserDashboard";
import ClientResetPassword from "@/pages/client/reset-password";
import ClientNavigation from "@/pages/client/navigation";
import ClientPlanSelection from "@/pages/client/plan-selection";
import InventoryReports from "@/pages/client/inventory-reports";
import ClientTermsUpdated from "@/pages/client/terms-updated";
import PaymentReturn from "@/pages/client/payment-return";
import ChipActivation from "@/pages/client/chip-activation";

// Admin pages
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminClients from "@/pages/admin/clients";
import AdminPlans from "@/pages/admin/plans";
import AdminPlanAddEdit from "@/pages/admin/plans/add-edit";
import AdminOrders from "@/pages/admin/orders";
import AdminFinance from "@/pages/admin/finance";
import AdminReports from "@/pages/admin/reports";

// Store pages
// import StorePage from "@/pages/public/store";

// Layouts
import { DynamicLayout } from "@/components/layouts/DynamicLayout";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/company" element={<CompanySite />} />
          <Route path="/site" element={<CompanySite />} />
          {/* <Route path="/store/:storeUrl" element={<StorePage />} /> */}

          {/* Client Routes */}
          <Route path="/client/login" element={<ClientLogin />} />
          <Route path="/client/register" element={<ClientRegister />} />
          <Route path="/client/reset-password" element={<ClientResetPassword />} />
          <Route path="/client/terms-updated" element={<ClientTermsUpdated />} />
          <Route path="/client/payment-return" element={<PaymentReturn />} />
          <Route path="/client/chip-activation" element={<ChipActivation />} />
          <Route path="/client/document-verification" element={<DocumentVerification />} />
          <Route path="/client/verification-complete" element={<VerificationComplete />} />
          <Route path="/client/verification-rejected" element={<VerificationRejected />} />
          <Route path="/client/user-dashboard" element={<UserDashboard />} />

          <Route path="/client">
            <Route path="" element={}>
              <Route path="payment-return" element={<PaymentReturn />} />
              <Route path="dashboard" element={<ClientDashboard />} />
              <Route path="financial" element={<ClientFinancial />} />
              <Route path="network" element={<ClientNetwork />} />
              <Route path="profile" element={<ClientProfile />} />
              <Route path="banking" element={<ClientBanking />} />
              <Route path="security-password" element={<ClientSecurityPassword />} />
              <Route path="products" element={<ClientProducts />} />
              <Route path="notifications" element={<ClientNotifications />} />
              <Route path="esim" element={<ClientEsim />} />
              <Route path="facial-biometry" element={<ClientFacialBiometry />} />
              <Route path="plan-selection" element={<ClientPlanSelection />} />
              <Route path="navigation" element={<ClientNavigation />} />
              <Route path="inventory-reports" element={<InventoryReports />} />
            </Route>
          </Route>

          <Route path="/admin/login" />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route path="" element={<RoleBasedRoute allowedRoles={["admin"]} />}>
              <Route path="plans/add-edit" element={<AdminPlanAddEdit />} />

              {/* Outras rotas admin com sidebar */}
              <Route path="" element={<DynamicLayout forceRole="admin" />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="clients" element={<AdminClients />} />
                <Route path="plans" element={<AdminPlans />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="finance" element={<AdminFinance />} />
                <Route path="reports" element={<AdminReports />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
