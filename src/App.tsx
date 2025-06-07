
import * as React from 'react';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { RoleBasedRoute } from '@/components/RoleBasedRoute';
import { DynamicLayout } from '@/components/layouts/DynamicLayout';

// Public Routes
import Index from '@/pages/Index';
import ClientLogin from '@/pages/client/login';
import ClientRegister from '@/pages/client/register';
import ClientFacialBiometry from '@/pages/client/facial-biometry';
import AdminLogin from '@/pages/admin/login';
import PublicStore from '@/pages/public/store';
import ResetPassword from '@/pages/client/reset-password';
import UpdatePassword from '@/pages/client/update-password';
import ModernSite from '@/pages/ModernSite';
import CompanySite from '@/pages/CompanySite';
import SiteModel from '@/pages/SiteModel';

// Client Pages
import ClientDashboard from '@/pages/client/dashboard';
import ClientProfile from '@/pages/client/profile';
import ClientBanking from '@/pages/client/profile/banking';
import ClientTerms from '@/pages/client/profile/terms';
import ClientChangePassword from '@/pages/client/profile/change-password';
import ClientSecurityPassword from '@/pages/client/profile/security-password';
import ClientTwoFactor from '@/pages/client/profile/two-factor';
import ClientConfigurations from '@/pages/client/profile/configurations';
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
import ClientNotifications from '@/pages/client/notifications';
import ClientNavigation from '@/pages/client/navigation';

// Admin Pages
import AdminDashboard from '@/pages/admin/dashboard';
import AdminNetwork from '@/pages/admin/network';
import AdminUsers from '@/pages/admin/users';
import AdminClients from '@/pages/admin/clients';
import AdminPlans from '@/pages/admin/plans';
import AdminOrders from '@/pages/admin/orders';
import AdminFinance from '@/pages/admin/finance';
import AdminReports from '@/pages/admin/reports';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/client/login" element={<ClientLogin />} />
      <Route path="/client/register" element={<ClientRegister />} />
      <Route path="/client/facial-biometry" element={<ClientFacialBiometry />} />
      <Route path="/client/reset-password" element={<ResetPassword />} />
      <Route path="/client/update-password" element={<UpdatePassword />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      {/* <Route path="/store/:storeUrl" element={<PublicStore />} /> */}
      
      {/* Site Routes */}
      {/* <Route path="/modern-site" element={<ModernSite />} /> */}
      <Route path="/site" element={<CompanySite />} />
      {/* <Route path="/site-model" element={<SiteModel />} /> */}

      {/* Protected Client Routes with Dynamic Layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleBasedRoute allowedRoles={['client']} />}>
          <Route path="/client/dashboard" element={<DynamicLayout forceRole="client"><ClientDashboard /></DynamicLayout>} />
          <Route path="/client/profile" element={<DynamicLayout forceRole="client"><ClientProfile /></DynamicLayout>} />
          <Route path="/client/profile/banking" element={<DynamicLayout forceRole="client"><ClientBanking /></DynamicLayout>} />
          <Route path="/client/profile/terms" element={<DynamicLayout forceRole="client"><ClientTerms /></DynamicLayout>} />
          <Route path="/client/profile/change-password" element={<DynamicLayout forceRole="client"><ClientChangePassword /></DynamicLayout>} />
          <Route path="/client/profile/security-password" element={<DynamicLayout forceRole="client"><ClientSecurityPassword /></DynamicLayout>} />
          <Route path="/client/profile/two-factor" element={<DynamicLayout forceRole="client"><ClientTwoFactor /></DynamicLayout>} />
          <Route path="/client/profile/configurations" element={<DynamicLayout forceRole="client"><ClientConfigurations /></DynamicLayout>} />
          <Route path="/client/network" element={<DynamicLayout forceRole="client"><ClientNetwork /></DynamicLayout>} />
          <Route path="/client/store" element={<DynamicLayout forceRole="client"><ClientStore /></DynamicLayout>} />
          <Route path="/client/events" element={<DynamicLayout forceRole="client"><ClientEvents /></DynamicLayout>} />
          <Route path="/client/courses" element={<DynamicLayout forceRole="client"><ClientCourses /></DynamicLayout>} />
          <Route path="/client/news" element={<DynamicLayout forceRole="client"><ClientNews /></DynamicLayout>} />
          <Route path="/client/upgrade" element={<DynamicLayout forceRole="client"><ClientUpgrade /></DynamicLayout>} />
          <Route path="/client/chip-activation" element={<DynamicLayout forceRole="client"><ClientChipActivation /></DynamicLayout>} />
          <Route path="/client/products" element={<DynamicLayout forceRole="client"><ClientProducts /></DynamicLayout>} />
          <Route path="/client/esim" element={<DynamicLayout forceRole="client"><ClientESIM /></DynamicLayout>} />
          <Route path="/client/financial" element={<DynamicLayout forceRole="client"><ClientFinancial /></DynamicLayout>} />
          <Route path="/client/financial/details" element={<DynamicLayout forceRole="client"><ClientFinancialDetails /></DynamicLayout>} />
          <Route path="/client/earnings-forecast" element={<DynamicLayout forceRole="client"><ClientEarningsForecast /></DynamicLayout>} />
          <Route path="/client/inventory-reports" element={<DynamicLayout forceRole="client"><ClientInventoryReports /></DynamicLayout>} />
          <Route path="/client/notifications" element={<DynamicLayout forceRole="client"><ClientNotifications /></DynamicLayout>} />
          <Route path="/client/navigation" element={<DynamicLayout forceRole="client"><ClientNavigation /></DynamicLayout>} />
        </Route>
      </Route>

      {/* Protected Admin Routes with Dynamic Layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleBasedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<DynamicLayout forceRole="admin"><AdminDashboard /></DynamicLayout>} />
          <Route path="/admin/network" element={<DynamicLayout forceRole="admin"><AdminNetwork /></DynamicLayout>} />
          <Route path="/admin/users" element={<DynamicLayout forceRole="admin"><AdminUsers /></DynamicLayout>} />
          <Route path="/admin/clients" element={<DynamicLayout forceRole="admin"><AdminClients /></DynamicLayout>} />
          <Route path="/admin/plans" element={<DynamicLayout forceRole="admin"><AdminPlans /></DynamicLayout>} />
          <Route path="/admin/orders" element={<DynamicLayout forceRole="admin"><AdminOrders /></DynamicLayout>} />
          <Route path="/admin/finance" element={<DynamicLayout forceRole="admin"><AdminFinance /></DynamicLayout>} />
          <Route path="/admin/reports" element={<DynamicLayout forceRole="admin"><AdminReports /></DynamicLayout>} />
        </Route>
      </Route>
    </Route>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
