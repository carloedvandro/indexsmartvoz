import React, { useState } from 'react';
import { formatCurrency } from "@/utils/format";
import { motion } from 'framer-motion';

interface CommissionLevel {
  level: number;
  title: string;
  indications: number;
  commission: number;
  monthlyValue: number;
}

interface Plan {
  gb: number;
  price: number;
  commissionLevels: CommissionLevel[];
}

interface FlipPlanCardProps {
  plan: Plan;
  isActive?: boolean;
}

export function FlipPlanCard({ plan, isActive = false }: FlipPlanCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div 
      className={`flip-card ${isFlipped ? 'flipped' : ''} ${isActive ? 'active' : ''}`}
      onClick={handleCardClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flip-card-inner">
        {/* Frente do Card - Plano */}
        <div className="flip-card-front">
          <div className="plano-card-content">
            <h4 className="text-sm font-bold tracking-wider mb-3 text-white">
              ASSINATURA<br/>
              <span className="text-base">SEM FIDELIDADE</span>
            </h4>
            
            <h1 className="text-6xl my-3 font-bold text-white">
              {plan.gb}
            </h1>
            <div className="text-lg opacity-80 text-white mb-4">GB</div>
            
            <div className="extras text-white/80 text-sm mb-4 px-2">
              Ligações e SMS ilimitados<br/>
              para qualquer operadora do Brasil.
            </div>
            
            <small className="text-base text-white block">
              Por <strong>{formatCurrency(plan.price)}</strong><br/>/mês
            </small>
          </div>
        </div>

        {/* Verso do Card - Comissões */}
        <div className="flip-card-back">
          <div className="commissao-card-content">
            <h3 className="text-xl font-bold mb-4 text-white">Comissões</h3>
            <ul className="space-y-2 text-white">
              {plan.commissionLevels.map((level) => (
                <li key={level.level} className="text-sm">
                  {level.title}: {level.indications}x {formatCurrency(level.commission)} = {formatCurrency(level.monthlyValue)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}