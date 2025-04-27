
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "./components/Logo";
import { LogoutButton } from "./components/LogoutButton";
import { MobileMenu } from "./components/MobileMenu";
import { DesktopNavigation } from "./navigation/DesktopNavigation";
import { navigationItems } from "./navigation/NavigationItems";
import "@/styles/logo.css";

export function DashboardHeader() {
  const { toast } = useToast();
  const [isOpen, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
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
          variant: "destructive",
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
        variant: "destructive",
      });
    }
  };

  return (
    <header className="w-full bg-background border-b h-16">
      <div className="container relative mx-auto flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center h-full py-0 px-4 sm:px-6">
        <div className="flex items-center justify-start lg:justify-center order-1 lg:order-2 flex-1 -ml-[90px] lg:ml-0">
          <Logo />
        </div>
        <DesktopNavigation navigationItems={navigationItems} />
        <div className="flex items-center justify-end gap-2 ml-auto order-3 lg:order-3">
          <div className="hidden md:flex justify-center w-full">
            <LogoutButton onLogout={handleLogout} />
          </div>
          <MobileMenu 
            isOpen={isOpen}
            setOpen={setOpen}
            navigationItems={navigationItems}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </header>
  );
}
