
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface UsersHeaderProps {
  onLogout: () => void;
}

export function UsersHeader({ onLogout }: UsersHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold">Usuários</h1>
        <p className="text-muted-foreground">
          Gerencie os usuários do sistema
        </p>
      </div>
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Button variant="outline" onClick={onLogout}>
          Sair
        </Button>
      </div>
    </div>
  );
}
