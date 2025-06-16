
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format";

type Line = {
  id: number;
  internet: string;
  type: string;
  ddd: string;
  price: number;
};

interface OrderReviewStepProps {
  selectedLines: Line[];
}

export function OrderReviewStep({
  selectedLines
}: OrderReviewStepProps) {
  // Get plan name based on selected internet GB
  const getPlanName = (internet: string) => {
    switch (internet) {
      case "2GB":
        return "Teste a Tegg";
      case "7GB":
        return "BASIC";
      case "13GB":
        return "START";
      case "21GB":
        return "GOLD";
      case "44GB":
        return "PLUS";
      default:
        return "Plano Smartvoz";
    }
  };

  return (
    <div className="space-y-6 max-w-[340px] mx-auto w-full" style={{ paddingTop: '90px' }}>
      <div className="w-full flex justify-center mb-4">
        
      </div>
      
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-bold text-[#8425af]">Confirme seu pedido</h2>
      </div>

      <div className="space-y-4">
        {selectedLines.map(line => (
          <div key={line.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">
                  {getPlanName(line.internet)}
                </span>
                <span className="ml-2">{line.internet} + Minutos {line.internet === "2GB" ? "100" : "ilimitados"}</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              <p>DDD: {line.ddd}</p>
            </div>
          </div>
        ))}

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex justify-between items-center font-medium">
            <span>Total mensal:</span>
            <span>{formatCurrency(selectedLines.reduce((acc, line) => acc + line.price, 0))}/mês</span>
          </div>
        </div>
      </div>
    </div>
  );
}
