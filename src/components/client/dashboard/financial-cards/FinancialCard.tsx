
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { formatCurrency } from "@/utils/format";

interface FinancialCardProps {
  to: string;
  bgColor: string;
  icon: LucideIcon;
  amount: number;
  label: string;
}

export function FinancialCard({ 
  to, 
  bgColor, 
  icon: Icon, 
  amount, 
  label 
}: FinancialCardProps) {
  return (
    <Link 
      to={to}
      className={`${bgColor} rounded-xl p-5 flex items-center justify-between shadow-sm transition-transform hover:scale-[1.01] w-full`}
    >
      <div className="flex items-center">
        <div className="mr-4 text-white">
          <Icon className="w-8 h-8" />
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-2xl font-bold text-white">{formatCurrency(amount)}</span>
        <span className="text-sm text-white">{label}</span>
      </div>
    </Link>
  );
}
