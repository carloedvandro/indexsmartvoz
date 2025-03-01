
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavigationItem } from "../types";
import { NavigationContent } from "./NavigationContent";
import { House } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";

interface DesktopNavigationProps {
  navigationItems: NavigationItem[];
}

export const DesktopNavigation = ({ navigationItems }: DesktopNavigationProps) => {
  const homeItem = navigationItems.find(item => item.icon === "home");
  const otherItems = navigationItems.filter(item => item.icon !== "home");

  return (
    <div className="justify-start items-center gap-2 lg:flex hidden flex-row">
      {homeItem && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="link" 
              className="p-0 h-auto bg-transparent hover:bg-transparent focus:bg-transparent"
            >
              <House className="w-5 h-5 text-primary hover:scale-110 transition-transform" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 bg-white p-2">
            {homeItem.href && (
              <DropdownMenuItem asChild>
                <Link to={homeItem.href} className="flex items-center gap-2 cursor-pointer">
                  <House className="w-4 h-4 text-primary" />
                  <span>Home</span>
                </Link>
              </DropdownMenuItem>
            )}
            
            {otherItems.map((item) => (
              <NavigationMenu key={item.title} className="p-0 w-full">
                <NavigationMenuList className="p-0 w-full flex-col">
                  <NavigationMenuItem className="w-full">
                    {item.href ? (
                      <NavigationMenuTrigger className="w-full justify-start font-medium text-sm bg-transparent hover:bg-transparent hover:text-primary data-[state=open]:bg-transparent data-[state=open]:text-primary active:bg-transparent focus:bg-transparent text-left p-2">
                        {item.title}
                      </NavigationMenuTrigger>
                    ) : (
                      <>
                        <NavigationMenuTrigger className="w-full justify-start font-medium text-sm bg-transparent hover:bg-transparent hover:text-primary data-[state=open]:bg-transparent data-[state=open]:text-primary active:bg-transparent focus:bg-transparent text-left p-2">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="!w-[380px] p-4 bg-white">
                          <NavigationContent item={item} />
                        </NavigationMenuContent>
                      </>
                    )}
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
