
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LogoutButtonProps {
  onLogout: () => void;
  className?: string;
}

export function LogoutButton({ onLogout, className }: LogoutButtonProps) {
  return (
    <Button
      variant="link"
      onClick={onLogout}
      className={cn("text-foreground hover:text-primary hover:bg-transparent active:bg-transparent focus:bg-transparent gap-2 p-0 text-base", className)}
      style={{ transform: 'translateY(20px)' }}
    >
      <LogOut className="w-5 h-5" />
      <span>Sair</span>
    </Button>
  );
}
