
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/format";
import Image from "@/components/ui/image";
import { ParticlesBackground } from "@/components/client/products/ParticlesBackground";

interface FinancialCardProps {
  to: string;
  bgColor: string;
  imageSrc: string;
  amount: number;
  label: string;
  particleStyle?: "default" | "stars" | "fireflies" | "snow" | "matrix";
}

export function FinancialCard({ 
  to, 
  bgColor, 
  imageSrc, 
  amount, 
  label,
  particleStyle = "default"
}: FinancialCardProps) {
  return (
    <Link 
      to={to}
      className={`${bgColor} rounded-xl p-5 flex items-center justify-between shadow-sm transition-transform hover:scale-[1.01] w-full relative overflow-hidden`}
    >
      <div className="absolute inset-0">
        <ParticlesBackground style={particleStyle} />
      </div>
      <div className="flex items-center relative z-10">
        <div className="mr-4 text-white">
          <Image src={imageSrc} alt="Cifrão" className="w-10 h-10 object-contain" />
        </div>
      </div>
      <div className="flex flex-col items-end relative z-10">
        <span className="text-2xl font-bold text-white">{formatCurrency(amount)}</span>
        <span className="text-sm text-white">{label}</span>
      </div>
    </Link>
  );
}
