
import { ReactNode } from "react";
import { AdminLayout } from "./AdminLayout";
import { ClientLayout } from "./ClientLayout";
import { useUserRole, UserRole } from "@/hooks/useUserRole";
import { LoadingState } from "@/components/client/dashboard/LoadingState";

interface DynamicLayoutProps {
  children?: ReactNode;
  forceRole?: UserRole;
}

export const DynamicLayout = ({ children, forceRole }: DynamicLayoutProps) => {
  const { role, loading, error } = useUserRole();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Erro</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const activeRole = forceRole || role;

  switch (activeRole) {
    case 'admin':
      return <AdminLayout>{children}</AdminLayout>;
    case 'client':
      return <ClientLayout>{children}</ClientLayout>;
    default:
      // Fallback para usuários sem role definido
      return <ClientLayout>{children}</ClientLayout>;
  }
};
