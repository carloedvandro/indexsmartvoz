import { useState } from "react";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "./components/Logo";
import { LogoutButton } from "./components/LogoutButton";
import { MobileMenu } from "./components/MobileMenu";
import { NavigationItem } from "./types";

export function DashboardHeader() {
  const { toast } = useToast();
  const [isOpen, setOpen] = useState(false);

  const navigationItems: NavigationItem[] = [
    {
      title: "Dashboard",
      href: "/client/dashboard",
    },
    {
      title: "Loja",
      description: "Gerencie sua loja virtual",
      items: [
        {
          title: "Minha Loja",
          href: "/client/store",
        }
      ],
    },
    {
      title: "Rede",
      description: "Gerencie sua rede de afiliados",
      items: [
        {
          title: "Visualizar Rede",
          href: "/client/network",
        },
        {
          title: "Planos",
          href: "/client/upgrade",
        }
      ],
    },
  ];

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
      <div className="container relative mx-auto min-h-16 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
        <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
          <NavigationMenu className="flex justify-start items-start">
            <NavigationMenuList className="flex justify-start gap-4 flex-row">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <NavigationMenuLink asChild>
                      <Button variant="ghost" asChild>
                        <Link to={item.href}>{item.title}</Link>
                      </Button>
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="font-medium text-sm">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="!w-[450px] p-4 bg-white">
                        <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                          <div className="flex flex-col h-full justify-between">
                            <div className="flex flex-col">
                              <p className="text-base">{item.title}</p>
                              <p className="text-muted-foreground text-sm">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col text-sm h-full justify-end">
                            {item.items?.map((subItem) => (
                              <NavigationMenuLink asChild key={subItem.title}>
                                <Link
                                  to={subItem.href}
                                  className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                                >
                                  <span>{subItem.title}</span>
                                  <MoveRight className="w-4 h-4 text-muted-foreground" />
                                </Link>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex lg:justify-center -ml-4">
          <Logo />
        </div>
        <div className="flex items-center justify-end gap-2">
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