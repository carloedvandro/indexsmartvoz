
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type EasyPlan = {
  id: string;
  name: string;
  gb: string;
  price: number;
  cashback?: number;
  couponCode?: string;
};

interface EasyPlanCardProps {
  plan: EasyPlan;
  onSelect: (plan: EasyPlan) => void;
}

export function EasyPlanCard({ plan, onSelect }: EasyPlanCardProps) {
  return (
    <div className="plan-card">
      <Card className="easy-plan-card h-full border-none">
        <div className="space-y-4">
          <div>
            <h3 className="easy-plan-title">EASY Mobile</h3>
            <div className="easy-plan-data">
              {plan.gb}<span className="text-base ml-1">GB</span>
            </div>
            <div className="text-sm opacity-80 mt-1">Plano 100% digital</div>
          </div>
          
          {plan.cashback && (
            <div className="relative">
              <span className="absolute -left-4 top-1/2 -translate-y-1/2 text-white text-lg font-bold">+</span>
              <span className="py-1 px-2 bg-white/20 text-white rounded inline-block font-medium text-sm">
                R${plan.cashback.toFixed(2).replace(".", ",")} CASHBACK
              </span>
            </div>
          )}
          
          <div className="easy-plan-price">
            R$ {plan.price.toFixed(2).replace(".", ",")}
            <span className="text-sm opacity-80">/mês</span>
          </div>
          
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Minutos ilimitados</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Chip eSIM ou Físico</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Escolha seu DDD</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Validade: 30 dias</span>
            </div>
          </div>
          
          <button 
            onClick={() => onSelect(plan)}
            className="w-full py-2.5 rounded-md bg-pink-600 hover:bg-pink-700 text-white font-medium transition-all"
          >
            Selecionar
          </button>
          
          {plan.couponCode && (
            <div className="text-xs text-center">
              Use o cupom: {plan.couponCode}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
