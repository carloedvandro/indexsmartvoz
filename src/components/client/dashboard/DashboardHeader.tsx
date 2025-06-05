import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LogoutButton } from "./components/LogoutButton";
import { MobileMenu } from "./components/MobileMenu";
import { DesktopNavigation } from "./navigation/DesktopNavigation";
import { navigationItems } from "./navigation/NavigationItems";
import "@/styles/logo.css";
export function DashboardHeader() {
  const {
    toast
  } = useToast();
  const [isOpen, setOpen] = useState(false);
  const handleLogout = async () => {
    try {
      for (const key of Object.keys(localStorage)) {
        if (key.startsWith('sb-')) {
          localStorage.removeItem(key);
        }
      }
      const {
        error
      } = await supabase.auth.signOut();
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
  return;
}