
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { formatCurrency } from "@/utils/format";

interface FinancialCardProps {
  to: string;
  bgColor: string;
  hoverColor: string;
  icon: LucideIcon;
  amount: number;
  label: string;
}

export function FinancialCard({ 
  to, 
  bgColor, 
  hoverColor, 
  icon: Icon, 
  amount, 
  label 
}: FinancialCardProps) {
  return (
    <Link 
      to={to}
      className={`${bgColor} rounded-xl shadow-sm p-4 ${hoverColor} transition-colors`}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-center mb-2">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center text-center">
          <span className="text-xl font-bold text-white">{formatCurrency(amount)}</span>
          <span className="text-sm text-white">{label}</span>
        </div>
      </div>
    </Link>
  );
}
