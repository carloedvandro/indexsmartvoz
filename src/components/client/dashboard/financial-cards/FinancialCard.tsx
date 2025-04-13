
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/format";
import { AreaChart, DollarSign, TrendingUp } from "lucide-react";

interface FinancialCardProps {
  to: string;
  bgColor: string;
  color: string;
  icon: "dollar" | "chart" | "trending";
  amount: number;
  label: string;
}

export function FinancialCard({ 
  to, 
  bgColor, 
  color,
  icon,
  amount, 
  label
}: FinancialCardProps) {
  return (
    <Link 
      to={to}
      className={`${bgColor} ${color} rounded-xl px-5 py-6 flex flex-col shadow-sm w-full h-full relative overflow-hidden`}
    >
      <div className="flex items-center mb-1">
        {icon === "dollar" && <DollarSign className="w-8 h-8 opacity-90" />}
        {icon === "chart" && <AreaChart className="w-8 h-8 opacity-90" />}
        {icon === "trending" && <TrendingUp className="w-8 h-8 opacity-90" />}
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{formatCurrency(amount)}</span>
        <span className="text-base opacity-90">{label}</span>
      </div>
    </Link>
  );
}
