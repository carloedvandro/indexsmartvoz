
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
      className={cn("text-foreground hover:text-primary hover:bg-transparent active:bg-transparent focus:bg-transparent gap-2 p-0", className)}
    >
      <div className="mb-3 flex items-center gap-2">
        <LogOut className="w-4 h-4" />
        <span>Sair</span>
      </div>
    </Button>
  );
}
