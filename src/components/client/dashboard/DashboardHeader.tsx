import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/client/login");
  };

  return (
    <header className="bg-white shadow">
      <div className="w-full mx-auto px-2 sm:px-4 lg:max-w-5xl xl:max-w-6xl py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
        >
          Sair
        </button>
      </div>
    </header>
  );
};