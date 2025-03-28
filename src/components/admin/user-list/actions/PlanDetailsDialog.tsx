
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface PlanDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
}

export const PlanDetailsDialog = ({ isOpen, onOpenChange, user }: PlanDetailsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Informações do Plano</DialogTitle>
          <DialogDescription>
            Detalhes do plano do usuário {user?.full_name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-blue-500 text-white p-4 rounded-md">
            <p className="text-center">O status do seu plano é <strong>Ativo</strong>. Aguarde enquanto o status do seu plano muda.</p>
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-medium text-lg">Plano de Associação</h3>
          </div>
          
          <div className="border-b pb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Plano:</span>
              <span className="font-semibold text-green-500">PARCEIRO SMART INTERNET</span>
            </div>
          </div>
          
          <div className="border-b pb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Dados do Plano:</span>
              <span>25 de março de 2025 a 31/12/1969</span>
            </div>
          </div>
          
          <div className="border-b pb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Restantes Dias:</span>
              <span className="text-purple-500">Dias não disponíveis</span>
            </div>
          </div>
          
          <div className="border-b pb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status do Plano:</span>
              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Ativo</Badge>
            </div>
          </div>
          
          <div className="pb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Ativo:</span>
              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Ativo</Badge>
            </div>
          </div>
          
          <div className="flex justify-center pt-2">
            <button className="border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50">
              Comprar Novo Plano
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
