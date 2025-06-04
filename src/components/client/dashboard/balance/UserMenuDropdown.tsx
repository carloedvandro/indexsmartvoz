
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/useProfile";
import { UserAvatar } from "./UserAvatar";

export function UserMenuDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: profile } = useProfile();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/client/login");
      toast({
        title: "Logout realizado com sucesso",
        description: "Você foi desconectado da sua conta.",
      });
    } catch (error) {
      toast({
        title: "Erro ao fazer logout",
        description: "Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    { label: "Meu Perfil", href: "/client/profile" },
    { label: "Configurações", href: "/client/profile/configurations" },
    { label: "Alterar Senha", href: "/client/profile/change-password" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <UserAvatar 
          profileImage={profile?.profile_image} 
          fullName={profile?.full_name}
          isActive={profile?.status === 'active'}
          size="sm"
        />
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-900">
            {profile?.full_name || "Usuário"}
          </p>
          <p className="text-xs text-gray-500">
            {profile?.email || ""}
          </p>
        </div>
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
            <div className="py-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Sair
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
