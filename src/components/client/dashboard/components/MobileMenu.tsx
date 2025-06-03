
import React from 'react';
import { Link } from "react-router-dom";
import { X, CircleEllipsis } from "lucide-react";
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
              className="flex items-center justify-between gap-1 hover:text-primary active:bg-transparent focus:bg-transparent focus:border-0 focus:outline-none focus:ring-0 whitespace-nowrap px-2"
            >
              {item.icon === "home" && (
                <div className="flex items-center">
                  <span className="text-base font-bold text-lg">Início</span>
                </div>
              )}
              {!item.iconOnly && item.icon !== "home" && (
                <>
                  <span className="text-base">{item.title}</span>
                  <div className="dots-animation">
                    <CircleEllipsis className="h-4 w-4" />
                  </div>
                </>
              )}
            </Link>
          ) : (
            <>
              <div className="flex items-center justify-between px-2">
                <p className="text-base font-medium">{item.title}</p>
                {item.title !== "Loja Virtual" && item.title !== "Rede" && (
                  <div className="dots-animation">
                    <CircleEllipsis className="h-4 w-4" />
                  </div>
                )}
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
        className="hover:bg-transparent active:bg-transparent focus:bg-transparent focus:border-0 focus:outline-none focus:ring-0 data-[state=open]:bg-transparent my-auto mobile-menu-button ml-4 relative -top-[11px] right-[-7px]"
      >
        {isOpen ? (
          <X className="w-10 h-10 font-bold text-black" />
        ) : (
          <div className="flex flex-col justify-center items-center w-[20px] h-[16px]">
            <div className="w-full h-[6px] bg-black rounded-full mb-1"></div>
            <div className="w-full h-[6px] bg-black rounded-full mb-1"></div>
            <div className="w-full h-[6px] bg-black rounded-full"></div>
          </div>
        )}
      </Button>
      {isOpen && (
        <div className="fixed top-16 left-0 right-0 flex flex-col w-[420px] mx-auto bg-white shadow-lg py-2 container mobile-menu-container gap-2 z-50 rounded-b-lg">
          <div className="flex flex-col gap-2">
            {renderItems(navigationItems)}
          </div>
          <div className="mt-2 pt-4 pb-2 ">
            <LogoutButton onLogout={onLogout}  />
          </div>
        </div>
      )}
    </div>
  );
}
