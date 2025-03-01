
import React from 'react';
import { Link } from "react-router-dom";
import { MoveRight, X, Menu, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoutButton } from './LogoutButton';
import { NavigationItem } from '../types';

interface MobileMenuProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  navigationItems: NavigationItem[];
  onLogout: () => void;
}

export const MobileMenu = ({ isOpen, setOpen, navigationItems, onLogout }: MobileMenuProps) => {
  const renderItems = (items: NavigationItem[], level = 0) => {
    return items.map((item) => (
      <div key={item.title}>
        <div className="flex flex-col gap-1">
          {item.href ? (
            <Link
              to={item.href}
              className="flex items-center gap-1 hover:text-primary active:bg-transparent focus:bg-transparent whitespace-nowrap"
            >
              {item.icon === "home" && (
                <div className="bg-[#403E43] p-1 rounded flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
              )}
              {!item.iconOnly && <span className="text-base">{item.title}</span>}
              <MoveRight className="w-3.5 h-3.5 stroke-1 text-muted-foreground" />
            </Link>
          ) : (
            <>
              <p className="text-base font-medium">{item.title}</p>
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
    <div className="flex lg:hidden items-center">
      {/* Home icon with mobile menu toggle */}
      <div className="flex items-center mr-2">
        <Link to="/client/dashboard" className="flex items-center">
          <div className="bg-[#403E43] p-1 rounded flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
        </Link>
        <Button 
          variant="ghost" 
          onClick={() => setOpen(!isOpen)}
          className="p-1 hover:text-primary hover:bg-transparent active:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent"
        >
          {isOpen ? <X className="w-5 h-5" /> : <MoveRight className="w-5 h-5" />}
        </Button>
      </div>
      
      {isOpen && (
        <div className="fixed top-16 left-0 right-0 border-t flex flex-col w-full bg-white shadow-lg py-3 container gap-4 z-50">
          {renderItems(navigationItems)}
          <div>
            <LogoutButton onLogout={onLogout} className="w-full p-0 justify-start hover:bg-transparent active:bg-transparent focus:bg-transparent" />
          </div>
        </div>
      )}
    </div>
  );
};
