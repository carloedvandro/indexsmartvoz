
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { formatCurrency } from "@/utils/format";
import { CombinedBarPieChart } from "../charts/CombinedBarPieChart";

export function SalesDetailsCard() {
  const isMobile = useIsMobile();
  
  const pieData = [
    { 
      name: "100GB", 
      fullName: "Plano Smartvoz 100GB + Minutos ilimitados", 
      value: 300, 
      price: 119.99,
      totalAmount: 300 * 119.99,
      color: "#33C3F0" 
    },
    { 
      name: "120GB", 
      fullName: "Plano Smartvoz 120GB + Minutos ilimitados", 
      value: 250, 
      price: 129.99,
      totalAmount: 250 * 129.99,
      color: "#4ade80" 
    },
    { 
      name: "150GB", 
      fullName: "Plano Smartvoz 150GB + Minutos ilimitados", 
      value: 180, 
      price: 149.99,
      totalAmount: 180 * 149.99,
      color: "#8425af" 
    },
    { 
      name: "200GB", 
      fullName: "Plano Smartvoz 200GB + Minutos ilimitados", 
      value: 120, 
      price: 169.99,
      totalAmount: 120 * 169.99,
      color: "#3b82f6" 
    }
  ];

  const totalSalesAmount = pieData.reduce((acc, plan) => {
    const planTotal = Number((plan.value * plan.price).toFixed(2));
    return acc + planTotal;
  }, 0);

  return (
    <div className={`pl-0 ${isMobile ? "h-auto pb-4" : "h-[650px]"}`}>
      <div className="flex items-start mb-4 ml-[9px]">
        <h3 className="text-lg font-bold text-black pt-[4px]">Detalhe das Vendas</h3>
      </div>
      
      <div className="flex flex-col items-center">
        <CombinedBarPieChart data={pieData} />
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Total de Vendas</p>
          <p className="text-xl font-bold">{formatCurrency(totalSalesAmount)}</p>
        </div>
      </div>
    </div>
  );
}
