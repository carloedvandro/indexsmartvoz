import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function DashboardHeader() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/client/login");
  };

  return (
    <header className="bg-white shadow">
      <div className="w-full mx-auto py-2 flex justify-between items-center px-2">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <span>Sair</span>
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}