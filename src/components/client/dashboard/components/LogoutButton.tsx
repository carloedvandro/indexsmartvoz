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
      className={cn("text-foreground hover:text-primary", className)}
    >
      <LogOut className="w-4 h-4" />
      <span>Sair</span>
    </Button>
  );
}