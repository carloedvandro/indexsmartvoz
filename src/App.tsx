import React from 'react';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Index from '@/pages/Index';
import ClientDashboard from '@/pages/client/dashboard';
import ClientLogin from '@/pages/client/login';
import ClientRegister from '@/pages/client/register';
import ClientNetwork from '@/pages/client/network';
import ClientStore from '@/pages/client/store';
import ClientEvents from '@/pages/client/events';
import ClientCourses from '@/pages/client/courses';
import ClientNews from '@/pages/client/news';
import ClientUpgrade from '@/pages/client/upgrade';
import ClientChipActivation from '@/pages/client/chip-activation';
import ClientProducts from '@/pages/client/products';
import AdminDashboard from '@/pages/admin/dashboard';
import AdminLogin from '@/pages/admin/login';
import AdminNetwork from '@/pages/admin/network';
import AdminPlans from '@/pages/admin/plans';
import AdminUsers from '@/pages/admin/users';
import PublicStore from '@/pages/public/store';
import ResetPassword from '@/pages/client/reset-password';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/client/login" element={<ClientLogin />} />
      <Route path="/client/register" element={<ClientRegister />} />
      <Route path="/client/reset-password" element={<ResetPassword />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/store/:storeUrl" element={<PublicStore />} />

      {/* Protected Client Routes */}
      <Route path="/client" element={<ProtectedRoute />}>
        <Route path="dashboard" element={<ClientDashboard />} />
        <Route path="network" element={<ClientNetwork />} />
        <Route path="store" element={<ClientStore />} />
        <Route path="events" element={<ClientEvents />} />
        <Route path="courses" element={<ClientCourses />} />
        <Route path="news" element={<ClientNews />} />
        <Route path="upgrade" element={<ClientUpgrade />} />
        <Route path="chip-activation" element={<ClientChipActivation />} />
        <Route path="products" element={<ClientProducts />} />
      </Route>

      {/* Protected Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="network" element={<AdminNetwork />} />
        <Route path="plans" element={<AdminPlans />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;