
import { Link } from "react-router-dom";
import { Home, Store, Network, Settings, LogOut } from "lucide-react";
import { Dock, DockCard, DockCardInner, DockDivider } from "@/components/ui/dock";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function NavigationDock() {
  const { toast } = useToast();

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

  const navigationItems = [
    {
      id: "0",
      icon: <Home className="h-6 w-6 text-gray-700" />,
      href: "/client/dashboard",
      label: "Home"
    },
    {
      id: "1", 
      icon: <Store className="h-6 w-6 text-gray-700" />,
      href: "/client/store",
      label: "Loja Virtual"
    },
    {
      id: "2",
      icon: <Network className="h-6 w-6 text-gray-700" />,
      href: "/client/network", 
      label: "Rede"
    },
    {
      id: "3",
      icon: <Settings className="h-6 w-6 text-gray-700" />,
      href: "/client/profile",
      label: "Configurações"
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center">
      <Dock>
        {navigationItems.map((item) => (
          <Link key={item.id} to={item.href}>
            <DockCard id={item.id}>
              <DockCardInner id={item.id}>
                {item.icon}
              </DockCardInner>
            </DockCard>
          </Link>
        ))}
        
        <DockDivider />
        
        <DockCard id="logout" onClick={handleLogout}>
          <DockCardInner id="logout">
            <LogOut className="h-6 w-6 text-red-600" />
          </DockCardInner>
        </DockCard>
      </Dock>
    </div>
  );
}
