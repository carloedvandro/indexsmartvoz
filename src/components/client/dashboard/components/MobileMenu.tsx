
import React from 'react';
import { Link } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";
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
      <div key={item.title} className="mb-1">
        <div className="flex flex-col gap-0.5">
          {item.href ? (
            <Link
              to={item.href}
              className="flex items-center gap-1 hover:text-primary active:bg-transparent focus:bg-transparent focus:border-0 focus:outline-none focus:ring-0 whitespace-nowrap ml-0"
            >
              {item.icon === "home" && (
                <div className="flex items-center">
                  <span className="text-base font-bold text-lg pl-0">Dashboard</span>
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
                <div className="flex flex-col gap-0.5 mt-1">
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
    <div className="flex lg:hidden ml-auto items-center h-full">
      <Button 
        variant="ghost" 
        onClick={() => setOpen(!isOpen)}
        className="hover:bg-transparent active:bg-transparent focus:bg-transparent focus:border-0 focus:outline-none focus:ring-0 data-[state=open]:bg-transparent my-auto mobile-menu-button ml-4"
      >
        {isOpen ? (
          <X className="w-12 h-12 font-bold text-black" />
        ) : (
          <img 
            src="/lovable-uploads/3e4b60b1-5415-4fe8-be6c-5f334313a216.png" 
            alt="Menu" 
            className="w-24 h-24"
          />
        )}
      </Button>
      {isOpen && (
        <div className="fixed top-20 left-0 right-0 flex flex-col w-[370px] mx-auto bg-white shadow-lg py-2 container mobile-menu-container gap-2 z-50 rounded-b-lg">
          <div className="flex flex-col gap-2">
            {renderItems(navigationItems)}
          </div>
          <div className="mt-2 pt-4 pb-2 px-2">
            <LogoutButton onLogout={onLogout} className="w-full flex justify-center" />
          </div>
        </div>
      )}
    </div>
  );
}
