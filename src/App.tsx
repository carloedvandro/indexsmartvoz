
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import AdminLogin from "@/pages/admin/login";
import AdminUsers from "@/pages/admin/users";
import AdminNetwork from "@/pages/admin/network";
import AdminPlans from "@/pages/admin/plans";
import AdminPhoneLines from "@/pages/admin/phone-lines";
import ClientLogin from "@/pages/client/login";
import ClientRegister from "@/pages/client/register";
import ClientDashboard from "@/pages/client/dashboard";
import ClientProducts from "@/pages/client/products";
import ClientNetwork from "@/pages/client/network";
import ClientStore from "@/pages/client/store";
import PublicStore from "@/pages/public/store";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import "@/App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/network"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminNetwork />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/plans"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPlans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/phone-lines"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPhoneLines />
            </ProtectedRoute>
          }
        />
        <Route path="/client/login" element={<ClientLogin />} />
        <Route path="/client/register" element={<ClientRegister />} />
        <Route
          path="/client/dashboard"
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <ClientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/products"
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <ClientProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/network"
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <ClientNetwork />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/store"
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <ClientStore />
            </ProtectedRoute>
          }
        />
        <Route path="/store/:storeUrl" element={<PublicStore />} />
      </Routes>
      <Toaster />
      <SonnerToaster />
    </BrowserRouter>
  );
}

export default App;
