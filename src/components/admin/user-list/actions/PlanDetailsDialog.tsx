
import { RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PlanDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
}

export const PlanDetailsDialog = ({ isOpen, onOpenChange, user }: PlanDetailsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg md:max-w-xl">
        <DialogHeader className="flex flex-row items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-700 p-1.5 rounded-full">
              <RefreshCw className="h-4 w-4 text-white" />
            </div>
            <DialogTitle className="text-lg">Expiração do Plano</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="space-y-0">
          <div className="bg-cyan-500 text-white p-4 rounded-md mb-4 text-center">
            <p>O status do seu plano é <strong>Ativo</strong>. Aguarde enquanto o status do seu plano muda.</p>
          </div>
          
          <div className="border rounded-md">
            <div className="border-b p-4">
              <h3 className="font-medium text-lg">Plano de Associação</h3>
            </div>
            
            <div className="border-b p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Planta:</span>
                <span className="font-semibold text-green-500">PARCEIRO SMART INTERNET</span>
              </div>
            </div>
            
            <div className="border-b p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Dados do Plano:</span>
                <span>25 de março de 2025 a 31/12/1969</span>
              </div>
            </div>
            
            <div className="border-b p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Restantes Dias:</span>
                <span className="text-purple-500">Dias não disponíveis</span>
              </div>
            </div>
            
            <div className="border-b p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status do Plano:</span>
                <Badge className="bg-cyan-500 hover:bg-cyan-600 text-white border-0">Ativo</Badge>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ativo:</span>
                <Badge className="bg-cyan-500 hover:bg-cyan-600 text-white border-0">Ativo</Badge>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center pt-6 pb-2">
            <Button 
              variant="outline" 
              className="border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Comprar Novo Plano
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
