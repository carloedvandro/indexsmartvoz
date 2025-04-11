
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/format";
import Image from "@/components/ui/image";
import { motion } from "framer-motion";
import { ParticlesBackground } from "@/components/client/products/ParticlesBackground";
import { useState } from "react";
import { ParticleStyle } from "@/components/client/products/particles/types";

interface FinancialCardProps {
  to: string;
  bgColor: string;
  imageSrc: string;
  amount: number;
  label: string;
  particleStyle?: ParticleStyle;
}

export function FinancialCard({ 
  to, 
  bgColor, 
  imageSrc, 
  amount, 
  label,
  particleStyle
}: FinancialCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 } 
      }}
      className="relative overflow-hidden rounded-xl"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {particleStyle && isHovered && (
        <div className="absolute inset-0 z-0 opacity-70">
          <ParticlesBackground style={particleStyle} />
        </div>
      )}
      <Link 
        to={to}
        className={`${bgColor} rounded-xl p-5 flex items-center justify-between shadow-sm w-full border border-gray-200 relative z-10 h-full`}
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
    </motion.div>
  );
}
