
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface PageHeaderProps {
  onAddClick: () => void;
  onLogout: () => void;
}

export function PageHeader({ onAddClick, onLogout }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold">Linhas Telefônicas</h1>
        <p className="text-muted-foreground">
          Gerencie as linhas telefônicas e seus consumos
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button onClick={onAddClick}>
          Adicionar Linha
        </Button>
        <SidebarTrigger />
        <Button variant="outline" onClick={onLogout}>
          Sair
        </Button>
      </div>
    </div>
  );
}
