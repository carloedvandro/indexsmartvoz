
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Search, Filter, Download } from "lucide-react";
import { Client } from "@/hooks/useBillingData";

interface BillingDetailsTableProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  clients: Client[];
}

export function BillingDetailsTable({ isOpen, onClose, title, clients }: BillingDetailsTableProps) {
  const formatCurrency = (value: string) => {
    return value;
  };

  const getPaymentMethodDisplay = (status: string) => {
    switch(status) {
      case 'received':
      case 'confirmed':
        return 'Boleto Bancário';
      case 'awaiting':
      case 'overdue':
        return 'Pix';
      default:
        return 'Boleto Bancário';
    }
  };

  const getStatusIcon = (status: string) => {
    return '✓'; // Ícone de check verde
  };

  const getTotalAmount = () => {
    const total = clients.reduce((sum, client) => {
      const value = parseFloat(client.charges.replace(/[R$\s.]/g, '').replace(',', '.'));
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(total);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl max-h-[90vh] overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-600">Cobranças</span>
                <span>›</span>
                <span className="text-sm text-blue-600">Todas</span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <h2 className="text-xl font-medium">Todas</h2>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Procurar por nome ou email do cliente"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter size={18} className="text-blue-600" />
                <span className="text-blue-600">Filtros (8)</span>
                <span className="text-gray-400">▼</span>
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <span className="text-blue-600">⋮</span>
                <span className="text-blue-600">Ações em lote</span>
                <span className="text-gray-400">▼</span>
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <span>+</span>
                <span>Adicionar cobrança</span>
              </button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 overflow-auto max-h-[60vh]">
          <Table>
            <TableHeader className="bg-gray-50 sticky top-0">
              <TableRow>
                <TableHead className="font-semibold text-gray-700 px-6">
                  <div className="flex items-center gap-1">
                    Nome
                    <span className="text-gray-400">⇅</span>
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  <div className="flex items-center gap-1">
                    Valor
                    <span className="text-gray-400">⇅</span>
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">Descrição</TableHead>
                <TableHead className="font-semibold text-gray-700">
                  <div className="flex items-center gap-1">
                    Forma de pagamento
                    <span className="text-gray-400">⇅</span>
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  <div className="flex items-center gap-1">
                    Data de vencimento
                    <span className="text-gray-400">⇅</span>
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client, index) => (
                <TableRow key={client.id} className="hover:bg-gray-50">
                  <TableCell className="px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <User size={16} className="text-gray-400" />
                      <span className="font-medium">{client.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{formatCurrency(client.charges)}</TableCell>
                  <TableCell className="text-gray-600">
                    {index % 2 === 0 ? 'Smartvoz' : 'Descrição não informada'}
                  </TableCell>
                  <TableCell>{getPaymentMethodDisplay(client.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>
                        {new Date(Date.now() + Math.random() * 10 * 24 * 60 * 60 * 1000)
                          .toLocaleDateString('pt-BR')}
                      </span>
                      <span className="text-green-500">{getStatusIcon(client.status)}</span>
                      <span className="text-gray-400">👁</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button className="text-gray-400 hover:text-blue-600">💰</button>
                      <button className="text-gray-400 hover:text-blue-600">🔄</button>
                      <button className="text-gray-400 hover:text-blue-600">✏️</button>
                      <button className="text-gray-400 hover:text-blue-600">🖨️</button>
                      <button className="text-gray-400 hover:text-blue-600">📧</button>
                      <button className="text-gray-400 hover:text-red-600">🗑️</button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        
        <div className="border-t p-4 bg-gray-50">
          <p className="text-sm text-gray-600">
            {clients.length} cobranças no valor total de {getTotalAmount()} das {clients.length} cobranças existentes
          </p>
        </div>
      </Card>
    </div>
  );
}
