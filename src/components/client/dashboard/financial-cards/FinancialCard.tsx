
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/format";
import { AreaChart, DollarSign, TrendingUp } from "lucide-react";

interface FinancialCardProps {
  to: string;
  bgColor: string;
  hoverColor: string;
  icon: "dollar" | "chart" | "trending";
  amount: number;
  label: string;
}

export function FinancialCard({ 
  to, 
  bgColor, 
  hoverColor,
  icon,
  amount, 
  label
}: FinancialCardProps) {
  return (
    <Link 
      to={to}
      className={`${bgColor} ${hoverColor} rounded-xl px-6 py-6 flex flex-col text-white shadow-sm w-full h-full relative overflow-hidden transition-colors`}
    >
      <div className="flex items-center gap-3 mb-1">
        <span className="text-2xl font-bold">{formatCurrency(amount)}</span>
        {icon === "dollar" && <DollarSign className="w-8 h-8 text-white opacity-90" />}
        {icon === "chart" && <AreaChart className="w-8 h-8 text-white opacity-90" />}
        {icon === "trending" && <TrendingUp className="w-8 h-8 text-white opacity-90" />}
      </div>
      <div className="flex flex-col">
        <span className="text-base opacity-90">{label}</span>
      </div>
    </Link>
  );
}
