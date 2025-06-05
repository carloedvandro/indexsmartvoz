
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight, Home, Store, Users, Settings, LogOut, Package, Smartphone, FileBarChart, Network } from "lucide-react";
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

  const menuItems = [
    {
      id: "home",
      title: "Home",
      icon: Home,
      href: "/client/dashboard",
      type: "single"
    },
    {
      id: "loja-virtual",
      title: "Loja Virtual",
      icon: Store,
      type: "section",
      items: [
        {
          title: "Plano Smartvoz",
          href: "/client/store",
          icon: Smartphone
        },
        {
          title: "Processo de Ativação do SIM Card",
          href: "/client/products",
          icon: Package
        },
        {
          title: "Processo de Ativação do eSIM",
          href: "/client/esim",
          icon: Smartphone
        },
        {
          title: "Relatórios Estoque",
          href: "/client/inventory-reports",
          icon: FileBarChart
        }
      ]
    },
    {
      id: "rede",
      title: "Rede",
      icon: Network,
      type: "section",
      items: [
        {
          title: "Minha Rede",
          href: "/client/network",
          icon: Users
        }
      ]
    },
    {
      id: "configuracoes",
      title: "Configurações",
      icon: Settings,
      type: "section",
      items: [
        {
          title: "Meu Perfil",
          href: "/client/profile",
          icon: Users
        },
        {
          title: "Conta Bancária",
          href: "/client/profile/banking",
          icon: Package
        },
        {
          title: "Termos",
          href: "/client/profile/terms",
          icon: FileBarChart
        },
        {
          title: "Alterar Senha",
          href: "/client/profile/change-password",
          icon: Settings
        },
        {
          title: "Senha de Segurança",
          href: "/client/profile/security-password",
          icon: Settings
        }
      ]
    }
  ];

  return (
    <div className="max-w-md mx-auto rounded-lg overflow-hidden">
      <div className="p-4">
        <h1 className="text-lg font-semibold text-gray-800 mb-6">Menu de Navegação</h1>
        
        <div className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.id}>
              {item.type === "single" ? (
                <Link
                  to={item.href!}
                  className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-md transition-colors group"
                >
                  <item.icon className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() => toggleSection(item.id)}
                    className="flex items-center justify-between w-full px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-md transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        expandedSections.includes(item.id) ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  
                  {expandedSections.includes(item.id) && item.items && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          to={subItem.href}
                          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-md transition-colors"
                        >
                          <subItem.icon className="w-4 h-4 text-gray-400" />
                          <span>{subItem.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Separator line between sections */}
              {item.id !== "configuracoes" && (
                <div className="border-b border-gray-100 my-2"></div>
              )}
            </div>
          ))}
          
          {/* Logout section */}
          <div className="border-t border-gray-200 mt-4 pt-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-md transition-colors group"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sair do Sistema</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
