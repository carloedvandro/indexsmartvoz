
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/format";

interface FinancialCardProps {
  to: string;
  bgColor: string;
  hoverColor: string;
  amount: number;
  label: string;
}

export function FinancialCard({ 
  to, 
  bgColor, 
  hoverColor,
  amount, 
  label
}: FinancialCardProps) {
  return (
    <Link 
      to={to}
      className={`${bgColor} ${hoverColor} rounded-xl px-5 py-6 flex flex-col text-white shadow-sm w-full h-full relative overflow-hidden transition-colors`}
    >
      <div className="flex items-center gap-3 mb-1">
        <span className="text-3xl font-bold">{formatCurrency(amount)}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-lg">{label}</span>
      </div>
    </Link>
  );
}
