
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format";

interface BillingSectionProps {
  amount: number;
  dueDate: string;
  status: string;
  onPayNow: () => void;
  onViewBills: () => void;
}

export const BillingSection = ({ amount, dueDate, status, onPayNow, onViewBills }: BillingSectionProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-green-600">Fatura {status}</p>
          <p className="text-sm text-gray-500">Vence em {dueDate}</p>
        </div>
        <p className="text-xl font-semibold">{formatCurrency(amount)}</p>
      </div>
      <div className="flex justify-between">
        <Button 
          className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
          onClick={onPayNow}
        >
          Pagar agora
        </Button>
        <Button 
          variant="link" 
          className="text-[#8425af]"
          onClick={onViewBills}
        >
          Ver faturas
        </Button>
      </div>
    </div>
  );
};
