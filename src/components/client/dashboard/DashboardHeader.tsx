import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LogOut } from "lucide-react";

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export function DashboardHeader({ title = "Dashboard", subtitle, icon }: DashboardHeaderProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/client/login");
  };

  return (
    <header className="pl-10 pr-5 py-2">
      <div className="bg-white shadow border rounded-lg">
        <div className="max-w-screen-xl mx-auto w-full px-4 flex justify-between items-center py-2">
          <div className="flex items-center gap-2">
            {icon}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
}