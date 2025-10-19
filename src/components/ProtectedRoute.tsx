import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSession } from "@/hooks/useSession";
import { LoadingState } from "@/components/client/dashboard/LoadingState";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { getSession, isLoading } = useSession();

  return children ? <>{children}</> : <Outlet />;
};
