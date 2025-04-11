
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/format";
import Image from "@/components/ui/image";

interface FinancialCardProps {
  to: string;
  bgColor: string;
  imageSrc: string;
  amount: number;
  label: string;
}

export function FinancialCard({ 
  to, 
  bgColor, 
  imageSrc, 
  amount, 
  label 
}: FinancialCardProps) {
  return (
    <Link 
      to={to}
      className={`${bgColor} rounded-xl p-5 flex items-center justify-between shadow-sm transition-transform hover:scale-[1.01] w-full border border-gray-200`}
    >
      <div className="flex items-center">
        <div className="mr-4 text-primary">
          <Image src={imageSrc} alt="Cifrão" className="w-10 h-10 object-contain" />
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-2xl font-bold text-gray-900">{formatCurrency(amount)}</span>
        <span className="text-sm text-gray-600">{label}</span>
      </div>
    </Link>
  );
}
