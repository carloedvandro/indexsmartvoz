
import { useIsMobile } from "@/hooks/use-mobile";

interface PriceSummaryProps {
  linePrice: number;
  totalPrice: number;
}

export function PriceSummary({ linePrice, totalPrice }: PriceSummaryProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full" style={{ maxWidth: isMobile ? "96%" : "100%" }}>
      <div className="p-2 bg-purple-50 rounded-lg">
        <div className="flex justify-between items-center font-medium">
          <span>Total mensal:</span>
          <span>R$ {totalPrice.toFixed(2)}/mês</span>
        </div>
      </div>
    </div>
  );
}
