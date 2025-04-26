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

// Helper function to render dynamic icons
const renderIcon = (Icon: LucideIcon | string, className?: string) => {
  if (typeof Icon === 'string') return null;
  return <Icon className={className || "h-4 w-4 mr-2"} />;
};

// Custom Home Icon Component
const CustomHomeIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 1000 1000" 
    fill="currentColor"
    className={className}
  >
    <path d="M800 450v450H600V600H400v300H200V450L500 150l300 300zm50-40L500 60 150 410v540h200V550h300v400h200V410z"/>
    <path d="M500 250c-27.6 0-50 22.4-50 50s22.4 50 50 50 50-22.4 50-50-22.4-50-50-50z"/>
  </svg>
);

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
              className="p-0 h-auto border-0 shadow-none bg-transparent hover:bg-transparent focus:bg-transparent focus:border-0 focus:outline-none focus:ring-0 flex items-center pl-0 gap-2 ml-[-30px]"
              style={{ pointerEvents: 'auto' }}
            >
              <CustomHomeIcon className="h-[10px] w-[10px] text-gray-600 -ml-[30px]" />
              <span 
                className="font-bold text-left text-gray-600 -ml-[20px] pl-[20px] mt-[2px]" 
                style={{
                  fontSize: '1rem'
                }}
              >
                Home
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-80 bg-white p-2">
            {homeItem.href && (
              <>
                <DropdownMenuItem asChild>
                  <Link to={homeItem.href} className="flex items-center gap-2 cursor-pointer focus:outline-none focus:border-0 w-full py-3 bg-white rounded-md border border-gray-100">
                    <CustomHomeIcon className="h-[10px] w-[10px] text-gray-600" />
                    <span className="font-bold self-center text-gray-600 text-lg pl-[20px] mt-[2px]">Home</span>
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
