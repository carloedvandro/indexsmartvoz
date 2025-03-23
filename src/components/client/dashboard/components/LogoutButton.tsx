
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LogoutButtonProps {
  onLogout: () => void;
  className?: string;
}

export function LogoutButton({ onLogout, className }: LogoutButtonProps) {
  return (
    <Button
      onClick={onLogout}
      className={cn(
        "bg-purple-600 hover:bg-purple-700 text-white",
        className
      )}
    >
      Sair
    </Button>
  );
}
