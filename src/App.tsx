
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
import AdminDashboard from "./pages/admin/dashboard";
import AdminUsers from "./pages/admin/users";
import AdminPlans from "./pages/admin/plans";
import AdminReports from "./pages/admin/reports";
import AdminOrders from "./pages/admin/orders";
import Store from "./pages/Store";
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
          
          {/* Protected routes for authenticated users */}
          <Route path="/client/facial-biometry" element={
            <ProtectedRoute>
              <ClientFacialBiometry />
            </ProtectedRoute>
          } />
          
          <Route path="/client/plan-selection" element={
            <ProtectedRoute>
              <ClientPlanSelection />
            </ProtectedRoute>
          } />
          
          <Route path="/client/products" element={
            <ProtectedRoute>
              <ClientProducts />
            </ProtectedRoute>
          } />
          
          <Route path="/client/checkout" element={
            <ProtectedRoute>
              <ClientCheckout />
            </ProtectedRoute>
          } />
          
          <Route path="/client/chip-activation" element={
            <ProtectedRoute>
              <ClientChipActivation />
            </ProtectedRoute>
          } />

          {/* Client dashboard routes */}
          <Route path="/client/dashboard" element={
            <ProtectedRoute>
              <DynamicLayout forceRole="client">
                <ClientDashboard />
              </DynamicLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/client/network" element={
            <ProtectedRoute>
              <DynamicLayout forceRole="client">
                <ClientNetwork />
              </DynamicLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/client/financial" element={
            <ProtectedRoute>
              <DynamicLayout forceRole="client">
                <ClientFinancial />
              </DynamicLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/client/profile" element={
            <ProtectedRoute>
              <DynamicLayout forceRole="client">
                <ClientProfile />
              </DynamicLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/client/esim" element={
            <ProtectedRoute>
              <DynamicLayout forceRole="client">
                <ClientEsim />
              </DynamicLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/client/notifications" element={
            <ProtectedRoute>
              <DynamicLayout forceRole="client">
                <ClientNotifications />
              </DynamicLayout>
            </ProtectedRoute>
          } />

          {/* Admin routes */}
          <Route path="/admin/dashboard" element={
            <RoleBasedRoute allowedRoles={["admin"]}>
              <DynamicLayout forceRole="admin">
                <AdminDashboard />
              </DynamicLayout>
            </RoleBasedRoute>
          } />
          
          <Route path="/admin/users" element={
            <RoleBasedRoute allowedRoles={["admin"]}>
              <DynamicLayout forceRole="admin">
                <AdminUsers />
              </DynamicLayout>
            </RoleBasedRoute>
          } />
          
          <Route path="/admin/plans" element={
            <RoleBasedRoute allowedRoles={["admin"]}>
              <DynamicLayout forceRole="admin">
                <AdminPlans />
              </DynamicLayout>
            </RoleBasedRoute>
          } />
          
          <Route path="/admin/reports" element={
            <RoleBasedRoute allowedRoles={["admin"]}>
              <DynamicLayout forceRole="admin">
                <AdminReports />
              </DynamicLayout>
            </RoleBasedRoute>
          } />
          
          <Route path="/admin/orders" element={
            <RoleBasedRoute allowedRoles={["admin"]}>
              <DynamicLayout forceRole="admin">
                <AdminOrders />
              </DynamicLayout>
            </RoleBasedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
