import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import ClientLogin from "@/pages/client/login";
import ClientDashboard from "@/pages/client/dashboard";
import ClientRegister from "@/pages/client/register";
import ClientResetPassword from "@/pages/client/reset-password";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLogin />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/client/login",
    element: <ClientLogin />,
  },
  {
    path: "/client/register",
    element: <ClientRegister />,
  },
  {
    path: "/client/dashboard",
    element: (
      <ProtectedRoute>
        <ClientDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/client/reset-password",
    element: <ClientResetPassword />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;