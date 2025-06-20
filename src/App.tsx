
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DynamicLayout } from "@/components/layouts/DynamicLayout";
import Index from "@/pages/Index";

// Client Pages
import ClientLogin from "@/pages/client/login";
import ClientRegister from "@/pages/client/register";
import ClientDashboard from "@/pages/client/dashboard";
import ClientProfile from "@/pages/client/profile";
import ClientFinancial from "@/pages/client/financial";
import ClientNetwork from "@/pages/client/network";
import ClientStore from "@/pages/client/store";
import ClientNotifications from "@/pages/client/notifications";
import ClientResetPassword from "@/pages/client/reset-password";
import ClientUpdatePassword from "@/pages/client/update-password";
import ClientNavigation from "@/pages/client/navigation";

// Profile Sub-pages
import ClientProfileBanking from "@/pages/client/profile/banking";
import ClientProfileChangePassword from "@/pages/client/profile/change-password";
import ClientProfileConfigurations from "@/pages/client/profile/configurations";
import ClientProfileSecurityPassword from "@/pages/client/profile/security-password";
import ClientProfileTerms from "@/pages/client/profile/terms";
import ClientProfileTwoFactor from "@/pages/client/profile/two-factor";

// Admin Pages
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminUsers from "@/pages/admin/users";
import AdminClients from "@/pages/admin/clients";
import AdminFinance from "@/pages/admin/finance";
import AdminOrders from "@/pages/admin/orders";
import AdminPlans from "@/pages/admin/plans";
import AdminNetwork from "@/pages/admin/network";
import AdminReports from "@/pages/admin/reports";

// Site Pages
import CompanySite from "@/pages/CompanySite";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {/* Root */}
            <Route path="/" element={<Index />} />

            {/* Client Authentication Routes - NO LAYOUT */}
            <Route path="/client/login" element={<ClientLogin />} />
            <Route path="/client/register" element={<ClientRegister />} />
            <Route path="/client/reset-password" element={<ClientResetPassword />} />
            <Route path="/client/update-password" element={<ClientUpdatePassword />} />
            <Route path="/client/navigation" element={<ClientNavigation />} />
            <Route path="/client/notifications" element={<ClientNotifications />} />
            <Route path="/client/network" element={<ClientNetwork />} />

            {/* Client Protected Routes - WITH LAYOUT */}
            <Route path="/client/dashboard" element={<DynamicLayout><ClientDashboard /></DynamicLayout>} />
            <Route path="/client/profile" element={<DynamicLayout><ClientProfile /></DynamicLayout>} />
            <Route path="/client/financial" element={<DynamicLayout><ClientFinancial /></DynamicLayout>} />
            <Route path="/client/store" element={<DynamicLayout><ClientStore /></DynamicLayout>} />

            {/* Profile Sub-routes */}
            <Route path="/client/profile/banking" element={<DynamicLayout><ClientProfileBanking /></DynamicLayout>} />
            <Route path="/client/profile/change-password" element={<DynamicLayout><ClientProfileChangePassword /></DynamicLayout>} />
            <Route path="/client/profile/configurations" element={<DynamicLayout><ClientProfileConfigurations /></DynamicLayout>} />
            <Route path="/client/profile/security-password" element={<DynamicLayout><ClientProfileSecurityPassword /></DynamicLayout>} />
            <Route path="/client/profile/terms" element={<DynamicLayout><ClientProfileTerms /></DynamicLayout>} />
            <Route path="/client/profile/two-factor" element={<DynamicLayout><ClientProfileTwoFactor /></DynamicLayout>} />

            {/* Admin Authentication Route - NO LAYOUT */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Protected Routes - WITH LAYOUT */}
            <Route path="/admin/dashboard" element={<DynamicLayout><AdminDashboard /></DynamicLayout>} />
            <Route path="/admin/users" element={<DynamicLayout><AdminUsers /></DynamicLayout>} />
            <Route path="/admin/clients" element={<DynamicLayout><AdminClients /></DynamicLayout>} />
            <Route path="/admin/finance" element={<DynamicLayout><AdminFinance /></DynamicLayout>} />
            <Route path="/admin/orders" element={<DynamicLayout><AdminOrders /></DynamicLayout>} />
            <Route path="/admin/plans" element={<DynamicLayout><AdminPlans /></DynamicLayout>} />
            <Route path="/admin/network" element={<DynamicLayout><AdminNetwork /></DynamicLayout>} />
            <Route path="/admin/reports" element={<DynamicLayout><AdminReports /></DynamicLayout>} />

            {/* Site Routes */}
            <Route path="/site" element={<CompanySite />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
