import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavigationItem } from "../types";
import { NavigationContent } from "./NavigationContent";

interface DesktopNavigationProps {
  navigationItems: NavigationItem[];
}

export const DesktopNavigation = ({ navigationItems }: DesktopNavigationProps) => {
  return (
    <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
      <NavigationMenu className="flex justify-start items-start">
        <NavigationMenuList className="flex justify-start gap-4 flex-row">
          {navigationItems.map((item) => (
            <NavigationMenuItem key={item.title}>
              {item.href ? (
                <NavigationMenuLink asChild>
                  <Button variant="link" className="text-foreground hover:text-primary" asChild>
                    <Link to={item.href}>{item.title}</Link>
                  </Button>
                </NavigationMenuLink>
              ) : (
                <>
                  <NavigationMenuTrigger className="font-medium text-sm bg-transparent hover:bg-transparent hover:text-primary data-[state=open]:bg-transparent">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!w-[400px] p-4 bg-white">
                    <NavigationContent item={item} />
                  </NavigationMenuContent>
                </>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};