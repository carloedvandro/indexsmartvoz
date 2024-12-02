import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LogOut } from "lucide-react";

export const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/client/login");
  };

  return (
    <header className="bg-white shadow">
      <div className="w-full mx-auto px-0.5 py-2 flex justify-between items-center">
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
};