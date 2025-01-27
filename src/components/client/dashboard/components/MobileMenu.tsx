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
  return (
    <div className="flex lg:hidden">
      <Button 
        variant="ghost" 
        onClick={() => setOpen(!isOpen)}
        className="hover:text-primary"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>
      {isOpen && (
        <div className="fixed top-16 left-0 right-0 border-t flex flex-col w-full bg-white shadow-lg py-4 container gap-8 z-50">
          {navigationItems.map((item) => (
            <div key={item.title} className="pl-2">
              <div className="flex flex-col gap-2">
                {item.href ? (
                  <Link
                    to={item.href}
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <span className="text-lg">{item.title}</span>
                    <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                  </Link>
                ) : (
                  <>
                    <p className="text-lg">{item.title}</p>
                    {item.items &&
                      item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          to={subItem.href}
                          className="flex items-center gap-2 pl-4 hover:text-primary"
                        >
                          <span className="text-muted-foreground">
                            {subItem.title}
                          </span>
                          <MoveRight className="w-4 h-4 stroke-1" />
                        </Link>
                      ))}
                  </>
                )}
              </div>
            </div>
          ))}
          <div className="pl-2">
            <LogoutButton onLogout={onLogout} className="w-full p-0 justify-start" />
          </div>
        </div>
      )}
    </div>
  );
}