import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function DashboardHeader() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/client/login");
  };

  return (
    <header className="bg-white shadow">
      <div className="w-full mx-auto py-3 flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          <LogOut className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}