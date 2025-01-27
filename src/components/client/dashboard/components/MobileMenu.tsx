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
    <div className="flex w-12 shrink lg:hidden items-end justify-end">
      <Button 
        variant="ghost" 
        onClick={() => setOpen(!isOpen)}
        className={`hover:bg-[#5f0889] hover:text-white ${isOpen ? "bg-[#5f0889] hover:bg-[#5f0889]/90 text-white" : ""}`}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>
      {isOpen && (
        <div className="absolute top-16 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 container gap-8">
          {navigationItems.map((item) => (
            <div key={item.title}>
              <div className="flex flex-col gap-2">
                {item.href ? (
                  <Link
                    to={item.href}
                    className="flex justify-between items-center"
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
                          className="flex justify-between items-center"
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
          <LogoutButton onLogout={onLogout} className="w-full justify-start" />
        </div>
      )}
    </div>
  );
};