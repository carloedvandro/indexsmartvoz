import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PublicRoute } from "@/components/auth/PublicRoute";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { ClientLayout } from "@/components/client/ClientLayout";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";
import { ForgotPassword } from "@/pages/auth/ForgotPassword";
import { ResetPassword } from "@/pages/auth/ResetPassword";
import { ClientDashboard } from "@/pages/client/dashboard";
import { AdminDashboard } from "@/pages/admin/dashboard";
import { BiometricValidation } from "@/components/client/biometrics/BiometricValidation";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
        </Route>

        <Route path="/client" element={<ProtectedRoute role="client" />}>
          <Route element={<ClientLayout />}>
            <Route path="dashboard" element={<ClientDashboard />} />
            <Route path="biometric-validation" element={<BiometricValidation />} />
          </Route>
        </Route>

        <Route path="/admin" element={<ProtectedRoute role="admin" />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;