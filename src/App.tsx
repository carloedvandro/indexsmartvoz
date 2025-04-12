
import * as React from 'react';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Index from '@/pages/Index';
import SiteModel from '@/pages/SiteModel';
import ClientDashboard from '@/pages/client/dashboard';
import ClientLogin from '@/pages/client/login';
import ClientRegister from '@/pages/client/register';
import ClientFacialBiometry from '@/pages/client/facial-biometry';
import ClientNetwork from '@/pages/client/network';
import ClientStore from '@/pages/client/store';
import ClientEvents from '@/pages/client/events';
import ClientCourses from '@/pages/client/courses';
import ClientNews from '@/pages/client/news';
import ClientUpgrade from '@/pages/client/upgrade';
import ClientChipActivation from '@/pages/client/chip-activation';
import ClientProducts from '@/pages/client/products';
import ClientESIM from '@/pages/client/esim';
import ClientFinancial from '@/pages/client/financial';
import ClientFinancialDetails from '@/pages/client/financial-details';
import ClientEarningsForecast from '@/pages/client/earnings-forecast';
import ClientInventoryReports from '@/pages/client/inventory-reports';
import AdminDashboard from '@/pages/admin/dashboard';
import AdminLogin from '@/pages/admin/login';
import AdminNetwork from '@/pages/admin/network';
import AdminPlans from '@/pages/admin/plans';
import AdminUsers from '@/pages/admin/users';
import PublicStore from '@/pages/public/store';
import ResetPassword from '@/pages/client/reset-password';
import UpdatePassword from '@/pages/client/update-password';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/site-model" element={<SiteModel />} />
      <Route path="/client/login" element={<ClientLogin />} />
      <Route path="/client/register" element={<ClientRegister />} />
      <Route path="/client/facial-biometry" element={<ClientFacialBiometry />} />
      <Route path="/client/reset-password" element={<ResetPassword />} />
      <Route path="/client/update-password" element={<UpdatePassword />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/store/:storeUrl" element={<PublicStore />} />

      {/* Protected Client Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/client/network" element={<ClientNetwork />} />
        <Route path="/client/store" element={<ClientStore />} />
        <Route path="/client/events" element={<ClientEvents />} />
        <Route path="/client/courses" element={<ClientCourses />} />
        <Route path="/client/news" element={<ClientNews />} />
        <Route path="/client/upgrade" element={<ClientUpgrade />} />
        <Route path="/client/chip-activation" element={<ClientChipActivation />} />
        <Route path="/client/products" element={<ClientProducts />} />
        <Route path="/client/esim" element={<ClientESIM />} />
        <Route path="/client/financial" element={<ClientFinancial />} />
        <Route path="/client/financial/details" element={<ClientFinancialDetails />} />
        <Route path="/client/earnings-forecast" element={<ClientEarningsForecast />} />
        <Route path="/client/inventory-reports" element={<ClientInventoryReports />} />
      </Route>

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/network" element={<AdminNetwork />} />
        <Route path="/admin/plans" element={<AdminPlans />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
      <Toaster />
    </React.StrictMode>
  );
};

export default App;
