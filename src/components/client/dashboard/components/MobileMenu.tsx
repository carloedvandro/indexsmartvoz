
import React from 'react';
import { Link } from "react-router-dom";
import { MoveRight, X, Menu } from "lucide-react";
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
      <div key={item.title} className={`pl-${level * 4}`}>
        <div className="flex flex-col gap-2">
          {item.href ? (
            <Link
              to={item.href}
              className="flex items-center gap-2 hover:text-primary active:bg-transparent focus:bg-transparent pl-0"
            >
              <span className="text-lg">{item.title}</span>
              <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
            </Link>
          ) : (
            <>
              <p className="text-lg font-medium">{item.title}</p>
              {item.items && (
                <div className="pl-0">
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
        className="hover:text-primary hover:bg-transparent active:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>
      {isOpen && (
        <div className="fixed top-16 left-0 right-0 border-t flex flex-col w-full bg-white shadow-lg py-4 container gap-8 z-50">
          {renderItems(navigationItems)}
          <div className="pl-0">
            <LogoutButton onLogout={onLogout} className="w-full p-0 justify-start hover:bg-transparent active:bg-transparent focus:bg-transparent" />
          </div>
        </div>
      )}
    </div>
  );
};
