
import React from "react";
import { Button } from "@/components/ui/button";

type EasyPlanType = {
  id: string;
  name: string;
  gb: string;
  price: number;
  cashback: number;
  couponCode: string;
};

interface EasyPlanCardProps {
  plan: EasyPlanType;
  onSelect: (plan: EasyPlanType) => void;
}

export function EasyPlanCard({ plan, onSelect }: EasyPlanCardProps) {
  return (
    <div className="easy-plan-card h-full w-[270px] flex flex-col">
      <div className="flex-grow p-5">
        <div className="text-sm opacity-90">
          Plano 100% digital.<br/>
          Fácil e flexível.<br/>
          Com Gigas que não expiram.
        </div>
        
        <div className="mt-4 mb-2">
          <div className="text-lg font-semibold">Oferta Prime</div>
          <div className="flex items-baseline">
            <div className="text-6xl font-bold">{plan.gb}</div>
            <div className="ml-1 text-lg">GIGAS</div>
          </div>
          <div className="flex items-center gap-2 my-2">
            <div className="text-lg font-medium">+</div>
            <div className="easy-plan-cashback">
              R${plan.cashback.toFixed(2).replace(".", ",")} CASHBACK
            </div>
          </div>
        </div>
        
        <div className="easy-plan-price">
          R${plan.price.toFixed(2).replace(".", ",")}/mês
        </div>
      </div>
      
      <div className="p-4 pt-2">
        <Button
          onClick={() => onSelect(plan)}
          className="w-full bg-white hover:bg-gray-100 text-pink-600 font-medium"
        >
          Selecionar
        </Button>
        <div className="text-xs text-center w-full mt-2">
          Use o cupom e aproveite: {plan.couponCode}
        </div>
      </div>
    </div>
  );
}
