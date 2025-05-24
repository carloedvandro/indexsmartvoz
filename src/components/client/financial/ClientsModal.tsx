
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, Mail, Phone } from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  subscription: string;
  charges: string;
}

interface ClientsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  clients: Client[];
}

export function ClientsModal({ isOpen, onOpenChange, title, clients }: ClientsModalProps) {
  const formatCurrencyBR = (value: string) => {
    return value;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Procurar por nome, email, CPF ou CNPJ"
                className="px-4 py-2 border border-gray-300 rounded-lg flex-1 min-w-[300px]"
              />
              <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2">
                <span>🔍</span>
              </button>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 text-blue-600">
                <span>📊</span>
                Filtros
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 text-blue-600">
                <span>📥</span>
                Exportar Dados
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border">
            <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 font-semibold text-gray-700 border-b">
              <div>Cliente</div>
              <div>Empresa</div>
              <div>Assinaturas recebidas</div>
              <div>Cobranças recebidas</div>
            </div>
            
            {clients.map((client) => (
              <div key={client.id} className="grid grid-cols-4 gap-4 p-4 border-b hover:bg-gray-50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">{client.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={14} />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={14} />
                    <span>{client.phone}</span>
                  </div>
                </div>
                
                <div className="text-gray-600">—</div>
                
                <div className="font-medium text-gray-900">
                  {formatCurrencyBR(client.subscription)}
                </div>
                
                <div className="font-medium text-gray-900">
                  {formatCurrencyBR(client.charges)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
