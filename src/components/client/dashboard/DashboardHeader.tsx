import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-[100%] w-full mx-auto px-4 sm:px-6 lg:max-w-5xl xl:max-w-6xl py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Sair
        </button>
      </div>
    </header>
  );
};