import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MoveRight, X, LogOut } from "lucide-react";
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

export function DashboardHeader() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setOpen] = useState(false);

  const navigationItems = [
    {
      title: "Dashboard",
      href: "/client/dashboard",
      description: "",
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
                      <NavigationMenuContent className="!w-[450px] p-4">
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
          <p className="font-black text-3xl bg-gradient-to-r from-color-1 via-color-2 to-color-3 bg-clip-text text-transparent [text-shadow:_2px_2px_2px_rgb(0_0_0_/_20%)] animate-rainbow bg-[length:200%_auto]">
            Smartvoz
          </p>
        </div>
        <div className="flex justify-end w-full gap-4">
          <Button 
            variant="ghost" 
            onClick={handleLogout} 
            className={`hidden md:inline-flex gap-2 hover:bg-[#5f0889] hover:text-white group ${isOpen ? "bg-[#5f0889] hover:bg-[#5f0889]/90 text-white" : ""}`}
          >
            <LogOut className="w-4 h-4 bg-gradient-to-r from-[#5f0889] to-[#9b87f5] bg-clip-text text-transparent transition-all duration-300 group-hover:translate-x-1" />
            <span>Sair</span>
          </Button>
        </div>
        <div className="flex w-12 shrink lg:hidden items-end justify-end">
          <Button 
            variant="ghost" 
            onClick={() => setOpen(!isOpen)}
            className={`hover:bg-[#5f0889] hover:text-white ${isOpen ? "bg-[#5f0889] hover:bg-[#5f0889]/90 text-white" : ""}`}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          {isOpen && (
            <div className="absolute top-16 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 container gap-8">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <div className="flex flex-col gap-2">
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="flex justify-between items-center"
                      >
                        <span className="text-lg">{item.title}</span>
                        <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                      </Link>
                    ) : (
                      <>
                        <p className="text-lg">{item.title}</p>
                        {item.items &&
                          item.items.map((subItem) => (
                            <Link
                              key={subItem.title}
                              to={subItem.href}
                              className="flex justify-between items-center"
                            >
                              <span className="text-muted-foreground">
                                {subItem.title}
                              </span>
                              <MoveRight className="w-4 h-4 stroke-1" />
                            </Link>
                          ))}
                      </>
                    )}
                  </div>
                </div>
              ))}
              <Button 
                variant="ghost" 
                onClick={handleLogout} 
                className="w-full justify-start gap-2 hover:bg-[#5f0889] hover:text-white group"
              >
                <LogOut className="w-4 h-4 bg-gradient-to-r from-[#5f0889] to-[#9b87f5] bg-clip-text text-transparent transition-all duration-300 group-hover:translate-x-1" />
                <span>Sair</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}