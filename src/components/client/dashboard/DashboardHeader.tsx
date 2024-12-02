import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/client/login");
  };

  return (
    <header className="bg-white shadow">
      <div className="w-full mx-auto px-1 sm:px-4 lg:max-w-5xl xl:max-w-6xl py-2 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm transition-colors"
        >
          Sair
        </button>
      </div>
    </header>
  );
}