import React, { useState } from 'react';
import { formatCurrency } from "@/utils/format";
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Plan {
  gb: number;
  price: number;
  color: string;
  commissionLevels: CommissionLevel[];
}

interface CommissionLevel {
  level: number;
  title: string;
  indications: number;
  commission: number;
  monthlyValue: number;
}

const plans: Plan[] = [
  {
    gb: 100,
    price: 104.99,
    color: "#6b00b6",
    commissionLevels: [
      { level: 1, title: "1º", indications: 5, commission: 20.00, monthlyValue: 100.00 },
      { level: 2, title: "2º", indications: 25, commission: 5.00, monthlyValue: 125.00 },
      { level: 3, title: "3º", indications: 125, commission: 5.00, monthlyValue: 625.00 },
      { level: 4, title: "4º", indications: 625, commission: 5.00, monthlyValue: 3125.00 }
    ]
  },
  {
    gb: 120,
    price: 124.99,
    color: "#9c27b0",
    commissionLevels: [
      { level: 1, title: "1º", indications: 5, commission: 25.00, monthlyValue: 125.00 },
      { level: 2, title: "2º", indications: 25, commission: 5.00, monthlyValue: 125.00 },
      { level: 3, title: "3º", indications: 125, commission: 5.00, monthlyValue: 625.00 },
      { level: 4, title: "4º", indications: 625, commission: 5.00, monthlyValue: 3125.00 }
    ]
  },
  {
    gb: 140,
    price: 144.99,
    color: "#7b1fa2",
    commissionLevels: [
      { level: 1, title: "1º", indications: 5, commission: 30.00, monthlyValue: 150.00 },
      { level: 2, title: "2º", indications: 25, commission: 5.00, monthlyValue: 125.00 },
      { level: 3, title: "3º", indications: 125, commission: 5.00, monthlyValue: 625.00 },
      { level: 4, title: "4º", indications: 625, commission: 5.00, monthlyValue: 3125.00 }
    ]
  }
];

export function InteractivePlanCard() {
  const [currentPlan, setCurrentPlan] = useState(0);

  const changePlan = (direction: number) => {
    setCurrentPlan(prev => {
      const newIndex = prev + direction;
      if (newIndex < 0) return plans.length - 1;
      if (newIndex >= plans.length) return 0;
      return newIndex;
    });
  };

  const calculateTotal = (commissionLevels: CommissionLevel[]) => {
    return commissionLevels.reduce((total, level) => total + level.monthlyValue, 0);
  };

  const plan = plans[currentPlan];

  return (
    <div className="max-w-4xl mx-auto font-['Segoe_UI',_sans-serif]">
      {/* Plan Card with Navigation */}
      <div className="flex items-center justify-center my-5">
        <button
          onClick={() => changePlan(-1)}
          className="bg-transparent border-none text-2xl cursor-pointer p-2.5 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <motion.div
          key={currentPlan}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-80 h-52 text-white rounded-3xl p-5 text-center transition-all duration-400 mx-4"
          style={{
            background: `linear-gradient(135deg, ${plan.color}, #9c27b0)`
          }}
        >
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-2">
            ASSINATURA SEM FIDELIDADE
          </h4>
          <h1 className="text-4xl font-bold my-4">{plan.gb}GB</h1>
          <small className="text-base">
            Por {formatCurrency(plan.price)} /mês
          </small>
        </motion.div>

        <button
          onClick={() => changePlan(1)}
          className="bg-transparent border-none text-2xl cursor-pointer p-2.5 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Commission Levels Grid */}
      <motion.div 
        key={`levels-${currentPlan}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-wrap justify-between my-5 gap-4"
      >
        {plan.commissionLevels.map((level) => (
          <div
            key={level.level}
            className="w-[48%] bg-white rounded-xl p-4 shadow-[0_4px_10px_rgba(0,0,0,0.05)] mb-4"
          >
            <h3 className="text-primary font-bold text-lg mb-2">
              {level.title} Nível
            </h3>
            <p className="text-gray-600 mb-1">{level.indications} indicações</p>
            <p className="text-gray-800 mb-1">
              <strong>{formatCurrency(level.commission)}</strong> por indicado
            </p>
            <p className="text-gray-800 font-semibold">
              Total: {formatCurrency(level.monthlyValue)}/mês
            </p>
          </div>
        ))}
      </motion.div>

      {/* Smart Consumption Table */}
      <motion.div 
        key={`table-${currentPlan}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white p-5 rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
      >
        <h2 className="text-xl font-bold text-primary text-center mb-4">
          Consumo Inteligente
        </h2>
        
        <table className="w-full border-collapse mt-2">
          <thead>
            <tr>
              <th className="border-b border-gray-300 p-2.5 text-center bg-[#f4f0fa] text-gray-700">
                Nível
              </th>
              <th className="border-b border-gray-300 p-2.5 text-center bg-[#f4f0fa] text-gray-700">
                Clientes
              </th>
              <th className="border-b border-gray-300 p-2.5 text-center bg-[#f4f0fa] text-gray-700">
                Valor por Indicado
              </th>
              <th className="border-b border-gray-300 p-2.5 text-center bg-[#f4f0fa] text-gray-700">
                Total no Nível
              </th>
            </tr>
          </thead>
          <tbody>
            {plan.commissionLevels.map((level) => (
              <tr key={level.level}>
                <td className="border-b border-gray-300 p-2.5 text-center">
                  {level.title}
                </td>
                <td className="border-b border-gray-300 p-2.5 text-center">
                  {level.indications}
                </td>
                <td className="border-b border-gray-300 p-2.5 text-center">
                  {formatCurrency(level.commission)}
                </td>
                <td className="border-b border-gray-300 p-2.5 text-center">
                  {formatCurrency(level.monthlyValue)}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} className="border-b border-gray-300 p-2.5 text-center font-bold">
                Total
              </td>
              <td className="border-b border-gray-300 p-2.5 text-center font-bold">
                {formatCurrency(calculateTotal(plan.commissionLevels))}
              </td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}