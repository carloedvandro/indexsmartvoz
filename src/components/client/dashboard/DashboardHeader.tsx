
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "./components/Logo";
import { LogoutButton } from "./components/LogoutButton";
import { MobileMenu } from "./components/MobileMenu";
import { DesktopNavigation } from "./navigation/DesktopNavigation";
import { navigationItems } from "./navigation/NavigationItems";
import "@/styles/logo.css"; // Ensuring CSS is imported

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
    <header className="w-full bg-background border-b">
      <div className="container relative mx-auto flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center h-20 py-0 px-4 sm:px-6">
        <div className="h-full flex-1 flex lg:justify-center items-center order-2 lg:order-2">
          <Logo />
        </div>
        <DesktopNavigation navigationItems={navigationItems} />
        <div className="flex items-center justify-end gap-2 ml-auto order-3 lg:order-3">
          <LogoutButton onLogout={handleLogout} className="hidden md:flex" />
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
