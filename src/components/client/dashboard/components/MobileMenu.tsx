
import React from 'react';
import { Link } from "react-router-dom";
import { X, Menu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoutButton } from './LogoutButton';
import { NavigationItem } from '../types';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileMenuProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  navigationItems: NavigationItem[];
  onLogout: () => void;
}

export const MobileMenu = ({ isOpen, setOpen, navigationItems, onLogout }: MobileMenuProps) => {
  const isMobile = useIsMobile();

  const renderItems = (items: NavigationItem[], level = 0) => {
    return items.map((item) => (
      <div key={item.title}>
        <div className="flex flex-col gap-1">
          {item.href ? (
            <Link
              to={item.href}
              className="flex items-center gap-1 hover:text-primary active:bg-transparent focus:bg-transparent focus:border-0 focus:outline-none focus:ring-0 whitespace-nowrap ml-1"
            >
              {item.icon === "home" && (
                <div className="flex items-end gap-1 -ml-2">
                  <img 
                    src="/lovable-uploads/4466d3c0-c9b2-44c7-9f5a-3797eb461412.png" 
                    alt="Home" 
                    className="w-10 h-10 border-0 outline-none focus:outline-none active:outline-none" 
                    style={{outline: 'none'}}
                  />
                  <span className="text-base font-bold pb-[6px]">Home</span>
                </div>
              )}
              {!item.iconOnly && item.icon !== "home" && (
                <div className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  <span className="text-base">{item.title}</span>
                </div>
              )}
            </Link>
          ) : (
            <>
              <div className="flex items-center">
                {/* No arrow for "Loja Virtual" and "Rede" */}
                {item.title !== "Loja Virtual" && item.title !== "Rede" && (
                  <ArrowRight className="h-4 w-4 mr-2" />
                )}
                <p className="text-base font-medium">{item.title}</p>
              </div>
              {item.items && (
                <div className="flex flex-col gap-1">
                  {renderItems(item.items, level + 1)}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="flex lg:hidden ml-auto">
      <Button 
        variant="ghost" 
        onClick={() => setOpen(!isOpen)}
        className="hover:text-primary hover:bg-transparent active:bg-transparent focus:bg-transparent focus:border-0 focus:outline-none focus:ring-0 data-[state=open]:bg-transparent"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>
      {isOpen && (
        <div className="fixed top-16 left-0 right-0 border-t flex flex-col w-full bg-white shadow-lg py-3 container max-w-sm mx-auto gap-4 z-50">
          {renderItems(navigationItems)}
          <div>
            <LogoutButton onLogout={onLogout} className="w-full p-0 justify-start hover:bg-transparent active:bg-transparent focus:bg-transparent" />
          </div>
        </div>
      )}
    </div>
  );
};
