
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ClientDashboard from "./pages/client/dashboard";
import ClientLogin from "./pages/client/login";
import ClientRegister from "./pages/client/register";
import ClientFacialBiometry from "./pages/client/facial-biometry";
import ClientPlanSelection from "./pages/client/plan-selection";
import ClientProducts from "./pages/client/products";
import ClientCheckout from "./pages/client/checkout";
import ClientChipActivation from "./pages/client/chip-activation";
import ClientNetwork from "./pages/client/network";
import ClientFinancial from "./pages/client/financial";
import ClientProfile from "./pages/client/profile";
import ClientEsim from "./pages/client/esim";
import ClientNotifications from "./pages/client/notifications";
import ClientNavigation from "./pages/client/navigation";
import AdminLogin from "./pages/admin/login";
import AdminDashboard from "./pages/admin/dashboard";
import AdminUsers from "./pages/admin/users";
import AdminPlans from "./pages/admin/plans";
import AdminReports from "./pages/admin/reports";
import AdminOrders from "./pages/admin/orders";
import Store from "./pages/public/store";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RoleBasedRoute } from "@/components/RoleBasedRoute";
import { DynamicLayout } from "@/components/layouts/DynamicLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/store/:storeId" element={<Store />} />
          <Route path="/client/login" element={<ClientLogin />} />
          <Route path="/client/register" element={<ClientRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Protected routes for authenticated users */}
          <Route path="/client/facial-biometry" element={<ProtectedRoute />}>
            <Route index element={<ClientFacialBiometry />} />
          </Route>
          
          <Route path="/client/plan-selection" element={<ProtectedRoute />}>
            <Route index element={<ClientPlanSelection />} />
          </Route>
          
          <Route path="/client/products" element={<ProtectedRoute />}>
            <Route index element={<ClientProducts />} />
          </Route>
          
          <Route path="/client/checkout" element={<ProtectedRoute />}>
            <Route index element={<ClientCheckout />} />
          </Route>
          
          <Route path="/client/chip-activation" element={<ProtectedRoute />}>
            <Route index element={<ClientChipActivation />} />
          </Route>

          {/* Client dashboard routes */}
          <Route path="/client/dashboard" element={<ProtectedRoute />}>
            <Route index element={
              <DynamicLayout forceRole="client">
                <ClientDashboard />
              </DynamicLayout>
            } />
          </Route>
          
          <Route path="/client/navigation" element={<ProtectedRoute />}>
            <Route index element={
              <DynamicLayout forceRole="client">
                <ClientNavigation />
              </DynamicLayout>
            } />
          </Route>
          
          <Route path="/client/network" element={<ProtectedRoute />}>
            <Route index element={
              <DynamicLayout forceRole="client">
                <ClientNetwork />
              </DynamicLayout>
            } />
          </Route>
          
          <Route path="/client/financial" element={<ProtectedRoute />}>
            <Route index element={
              <DynamicLayout forceRole="client">
                <ClientFinancial />
              </DynamicLayout>
            } />
          </Route>
          
          <Route path="/client/profile" element={<ProtectedRoute />}>
            <Route index element={
              <DynamicLayout forceRole="client">
                <ClientProfile />
              </DynamicLayout>
            } />
          </Route>
          
          <Route path="/client/esim" element={<ProtectedRoute />}>
            <Route index element={
              <DynamicLayout forceRole="client">
                <ClientEsim />
              </DynamicLayout>
            } />
          </Route>
          
          <Route path="/client/notifications" element={<ProtectedRoute />}>
            <Route index element={
              <DynamicLayout forceRole="client">
                <ClientNotifications />
              </DynamicLayout>
            } />
          </Route>

          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<RoleBasedRoute allowedRoles={["admin"]} />}>
            <Route index element={
              <DynamicLayout forceRole="admin">
                <AdminDashboard />
              </DynamicLayout>
            } />
          </Route>
          
          <Route path="/admin/users" element={<RoleBasedRoute allowedRoles={["admin"]} />}>
            <Route index element={
              <DynamicLayout forceRole="admin">
                <AdminUsers />
              </DynamicLayout>
            } />
          </Route>
          
          <Route path="/admin/plans" element={<RoleBasedRoute allowedRoles={["admin"]} />}>
            <Route index element={
              <DynamicLayout forceRole="admin">
                <AdminPlans />
              </DynamicLayout>
            } />
          </Route>
          
          <Route path="/admin/reports" element={<RoleBasedRoute allowedRoles={["admin"]} />}>
            <Route index element={
              <DynamicLayout forceRole="admin">
                <AdminReports />
              </DynamicLayout>
            } />
          </Route>
          
          <Route path="/admin/orders" element={<RoleBasedRoute allowedRoles={["admin"]} />}>
            <Route index element={
              <DynamicLayout forceRole="admin">
                <AdminOrders />
              </DynamicLayout>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
