
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
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="network" element={<AdminNetwork />} />
          <Route path="plans" element={<AdminPlans />} />
          <Route path="phone-lines" element={<AdminPhoneLines />} />
        </Route>
        <Route path="/client/login" element={<ClientLogin />} />
        <Route path="/client/register" element={<ClientRegister />} />
        <Route path="/client" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<ClientDashboard />} />
          <Route path="products" element={<ClientProducts />} />
          <Route path="network" element={<ClientNetwork />} />
          <Route path="store" element={<ClientStore />} />
        </Route>
        <Route path="/store/:storeUrl" element={<PublicStore />} />
      </Routes>
      <Toaster />
      <SonnerToaster />
    </BrowserRouter>
  );
}

export default App;
