import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "./components/Logo";
import { LogoutButton } from "./components/LogoutButton";
import { MobileMenu } from "./components/MobileMenu";
import { DesktopNavigation } from "./navigation/DesktopNavigation";
import { navigationItems } from "./navigation/NavigationItems";

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
    <header className="w-full bg-background border-b relative">
      <div className="absolute inset-0 animate-rainbow bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] opacity-10" />
      <div className="container relative mx-auto min-h-16 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
        <DesktopNavigation navigationItems={navigationItems} />
        <div className="flex lg:justify-center">
          <Logo />
        </div>
        <div className="flex items-center justify-end gap-2 ml-auto">
          <LogoutButton onLogout={handleLogout} className="hidden md:inline-flex" />
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