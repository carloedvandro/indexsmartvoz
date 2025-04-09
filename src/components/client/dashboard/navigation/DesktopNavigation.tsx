
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger, 
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { NavigationItem } from "../types";
import { ArrowRight, Home } from "lucide-react";

interface DesktopNavigationProps {
  navigationItems: NavigationItem[];
}

export const DesktopNavigation = ({ navigationItems }: DesktopNavigationProps) => {
  const homeItem = navigationItems.find(item => item.icon === "home");
  const otherItems = navigationItems.filter(item => item.icon !== "home");

  return (
    <div className="justify-start items-center gap-2 lg:flex hidden flex-row pl-0">
      {homeItem && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="p-0 h-auto border-0 shadow-none bg-[#0a3845] hover:bg-[#0a3845] text-[#1eaedb] flex items-center gap-2 pl-4 pr-4 py-3 rounded-none"
              style={{ pointerEvents: 'auto' }}
            >
              <Home className="h-5 w-5" />
              <span 
                className="font-medium text-left" 
                style={{ pointerEvents: 'none' }}
              >
                Início
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-80 bg-white p-2">
            {homeItem.href && (
              <>
                <DropdownMenuItem asChild>
                  <Link to={homeItem.href} className="flex items-center gap-2 cursor-pointer focus:outline-none focus:border-0 w-full py-3 bg-white rounded-md border border-gray-100">
                    <Home className="h-5 w-5 text-[#1eaedb]" />
                    <span className="font-medium text-gray-800">Início</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            
            {otherItems.map((item) => (
              <div key={item.title}>
                {item.href ? (
                  <DropdownMenuItem asChild>
                    <Link to={item.href} className="w-full whitespace-nowrap flex items-center justify-between">
                      <div className="flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        <span>{item.title}</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem className="font-medium cursor-default whitespace-nowrap flex items-center">
                    {/* No arrow for "Loja Virtual" and "Rede" */}
                    {item.title !== "Loja Virtual" && item.title !== "Rede" && (
                      <ArrowRight className="h-4 w-4 mr-2" />
                    )}
                    <span>{item.title}</span>
                  </DropdownMenuItem>
                )}
                
                {item.items && (
                  <div className="ml-0 mt-1 space-y-1">
                    {item.items.map((subItem) => (
                      <DropdownMenuItem key={subItem.title} asChild>
                        <Link 
                          to={subItem.href || "#"} 
                          className="w-full text-sm py-1 whitespace-nowrap flex items-center"
                        >
                          <div className="flex items-center">
                            <ArrowRight className="h-4 w-4 mr-2" />
                            <span>{subItem.title}</span>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
