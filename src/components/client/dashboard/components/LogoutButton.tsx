import React from 'react';
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogoutButtonProps {
  onLogout: () => void;
  className?: string;
}

export const LogoutButton = ({ onLogout, className = "" }: LogoutButtonProps) => {
  return (
    <Button 
      variant="ghost" 
      onClick={onLogout} 
      className={`gap-2 group ${className}`}
    >
      <LogOut className="w-4 h-4 bg-gradient-to-r from-[#5f0889] to-[#9b87f5] bg-clip-text text-transparent transition-all duration-300 group-hover:translate-x-1" />
      <span>Sair</span>
    </Button>
  );
};