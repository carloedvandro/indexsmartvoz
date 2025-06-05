
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { NavigationCard } from "./NavigationCard";
import { LogoutButton } from "../dashboard/components/LogoutButton";
import { navigationItems } from "../dashboard/navigation/NavigationItems";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function NavigationContent() {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const { toast } = useToast();

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionTitle)
        ? prev.filter(title => title !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  const handleLogout = async () => {
    try {
      // Clear localStorage
      for (const key of Object.keys(localStorage)) {
        if (key.startsWith('sb-')) {
          localStorage.removeItem(key);
        }
      }

      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Erro ao fazer logout:", error);
        toast({
          title: "Erro",
          description: "Não foi possível fazer logout. Tente novamente.",
          variant: "destructive"
        });
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 100));
      window.location.replace("/client/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast({
        title: "Erro",
        description: "Não foi possível fazer logout. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  // Filter out the home item and get other navigation items
  const menuItems = navigationItems.filter(item => item.icon !== "home");

  // Profile menu items for configurations section
  const profileMenuItems = [
    {
      title: "Meu Perfil",
      href: "/client/profile",
    },
    {
      title: "Conta Bancária",
      href: "/client/profile/banking",
    },
    {
      title: "Termos",
      href: "/client/profile/terms",
    },
    {
      title: "Alterar Senha",
      href: "/client/profile/change-password",
    },
    {
      title: "Senha de Segurança",
      href: "/client/profile/security-password",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Menu de Navegação</h1>
        <p className="text-gray-600">Acesse todas as funcionalidades do sistema</p>
      </div>

      {/* Home Card */}
      <NavigationCard>
        <Link
          to="/client/dashboard"
          className="flex items-center gap-4 p-6 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <img
            src="/lovable-uploads/d6d0cfaa-60fb-4950-9674-400bbfc06650.png"
            alt="Home"
            className="h-8 w-auto"
          />
          <span className="text-xl font-semibold text-gray-800">Home</span>
        </Link>
      </NavigationCard>

      {/* Menu Items */}
      {menuItems.map((item) => (
        <NavigationCard key={item.title}>
          <div>
            <div
              className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => item.items && toggleSection(item.title)}
            >
              <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
              {item.items && (
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    expandedSections.includes(item.title) ? 'rotate-180' : ''
                  }`}
                />
              )}
            </div>
            {item.items && expandedSections.includes(item.title) && (
              <div className="px-6 pb-6 space-y-3 bg-gray-50">
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.title}
                    to={subItem.href || "#"}
                    className="flex items-center justify-between p-3 text-gray-700 hover:bg-white hover:text-gray-900 rounded-md transition-colors"
                  >
                    <span className="font-medium">{subItem.title}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </NavigationCard>
      ))}

      {/* Configurações Section */}
      <NavigationCard>
        <div>
          <div
            className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
            onClick={() => toggleSection('Configurações')}
          >
            <h3 className="text-xl font-semibold text-gray-800">Configurações</h3>
            <ChevronDown
              className={`h-5 w-5 text-gray-500 transition-transform ${
                expandedSections.includes('Configurações') ? 'rotate-180' : ''
              }`}
            />
          </div>
          {expandedSections.includes('Configurações') && (
            <div className="px-6 pb-6 space-y-3 bg-gray-50">
              {profileMenuItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="flex items-center justify-between p-3 text-gray-700 hover:bg-white hover:text-gray-900 rounded-md transition-colors"
                >
                  <span className="font-medium">{item.title}</span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </NavigationCard>

      {/* Logout Section */}
      <NavigationCard>
        <div className="p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Sair do Sistema</h3>
          <LogoutButton onLogout={handleLogout} className="mx-auto" />
        </div>
      </NavigationCard>
    </div>
  );
}
