
import React from "react";
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
import { Home } from "lucide-react";
import { LucideIcon } from "lucide-react";

const renderIcon = (Icon: LucideIcon | string, className?: string) => {
  if (typeof Icon === 'string') return null;
  return <Icon className={className || "h-4 w-4 mr-2"} />;
};

interface DesktopNavigationProps {
  navigationItems: NavigationItem[];
}

export const DesktopNavigation = ({ navigationItems }: DesktopNavigationProps) => {
  // Filter out the home item and only show other items
  const otherItems = navigationItems.filter(item => item.icon !== "home");

  return (
    <div className="justify-start items-center gap-2 lg:flex hidden flex-row pl-0">
      {otherItems.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="p-0 h-auto border-0 shadow-none bg-transparent hover:bg-transparent focus:bg-transparent focus:border-0 focus:outline-none focus:ring-0 flex items-center pl-0 gap-2"
              style={{ pointerEvents: 'auto' }}
            >
              <span 
                className="font-bold text-left text-black text-xl" 
                style={{
                  fontSize: '1.25rem'
                }}
              >
                Menu
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-80 bg-white p-2">
            {otherItems.map((item) => (
              <div key={item.title}>
                {item.href ? (
                  <DropdownMenuItem asChild>
                    <Link to={item.href} className="w-full whitespace-nowrap flex items-center justify-between">
                      <div className="flex items-center">
                        {item.icon && item.icon !== "home" && renderIcon(item.icon)}
                        <span>{item.title}</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem className="font-medium cursor-default whitespace-nowrap flex items-center">
                    {item.title !== "Loja Virtual" && item.title !== "Rede" && (
                      item.icon && renderIcon(item.icon)
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
                            {subItem.icon && renderIcon(subItem.icon)}
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
