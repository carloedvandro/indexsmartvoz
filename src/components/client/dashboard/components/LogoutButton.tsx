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
      variant="link" 
      onClick={onLogout} 
      className={`gap-2 group text-[#5f0889] hover:text-[#9b87f5] hover:no-underline ${className}`}
    >
      <LogOut className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1" />
      <span>Sair</span>
    </Button>
  );
};