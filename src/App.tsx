
import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./App.css";
import { useTranslation } from "react-i18next";

// Lazy loading para melhorar performance
const Dashboard = lazy(() => import("./pages/client/dashboard"));
const EarningsForecast = lazy(() => import("./pages/client/earnings-forecast"));
const Network = lazy(() => import("./pages/client/network"));
const FinancialDetails = lazy(() => import("./pages/client/financial-details"));
const Financial = lazy(() => import("./pages/client/financial"));
const Store = lazy(() => import("./pages/client/store"));
const Products = lazy(() => import("./pages/client/products"));
const ESim = lazy(() => import("./pages/client/esim"));
const ChipActivation = lazy(() => import("./pages/client/chip-activation"));
const Login = lazy(() => import("./pages/client/login"));
const Register = lazy(() => import("./pages/client/register"));
const ResetPassword = lazy(() => import("./pages/client/reset-password"));
const Events = lazy(() => import("./pages/client/events"));
const Courses = lazy(() => import("./pages/client/courses"));
const News = lazy(() => import("./pages/client/news"));
const Upgrade = lazy(() => import("./pages/client/upgrade"));
const PublicStore = lazy(() => import("./pages/public/store"));
const UpdatePassword = lazy(() => import("./pages/client/update-password"));

// Admin Routes
const AdminLogin = lazy(() => import("./pages/admin/login"));
const AdminDashboard = lazy(() => import("./pages/admin/dashboard"));
const AdminUsers = lazy(() => import("./pages/admin/users"));
const AdminNetwork = lazy(() => import("./pages/admin/network"));
const AdminPlans = lazy(() => import("./pages/admin/plans"));

function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Rota pública principal */}
          <Route path="/" element={<Login />} />

          {/* Rotas públicas */}
          <Route path="/client/login" element={<Login />} />
          <Route path="/client/register" element={<Register />} />
          <Route path="/client/reset-password" element={<ResetPassword />} />
          <Route path="/client/update-password" element={<UpdatePassword />} />
          <Route path="/store/:username" element={<PublicStore />} />

          {/* Rotas protegidas do cliente */}
          <Route element={<ProtectedRoute type="client" />}>
            <Route path="/client/dashboard" element={<Dashboard />} />
            <Route path="/client/earnings-forecast" element={<EarningsForecast />} />
            <Route path="/client/network" element={<Network />} />
            <Route path="/client/financial" element={<Financial />} />
            <Route path="/client/financial/details" element={<FinancialDetails />} />
            <Route path="/client/store" element={<Store />} />
            <Route path="/client/products" element={<Products />} />
            <Route path="/client/esim" element={<ESim />} />
            <Route path="/client/chip-activation" element={<ChipActivation />} />
            <Route path="/client/events" element={<Events />} />
            <Route path="/client/courses" element={<Courses />} />
            <Route path="/client/news" element={<News />} />
            <Route path="/client/upgrade" element={<Upgrade />} />
          </Route>

          {/* Rotas de administração */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute type="admin" />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/network" element={<AdminNetwork />} />
            <Route path="/admin/plans" element={<AdminPlans />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
}

export default App;
