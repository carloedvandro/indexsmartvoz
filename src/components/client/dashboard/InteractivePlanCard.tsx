import React, { useState } from 'react';
import { formatCurrency } from "@/utils/format";
import { motion } from 'framer-motion';

interface Plan {
  gb: number;
  price: number;
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
    commissionLevels: [
      { level: 1, title: "1º Nível", indications: 5, commission: 20.00, monthlyValue: 100.00 },
      { level: 2, title: "2º Nível", indications: 25, commission: 5.00, monthlyValue: 125.00 },
      { level: 3, title: "3º Nível", indications: 125, commission: 5.00, monthlyValue: 625.00 },
      { level: 4, title: "4º Nível", indications: 625, commission: 5.00, monthlyValue: 3125.00 }
    ]
  },
  {
    gb: 120,
    price: 124.99,
    commissionLevels: [
      { level: 1, title: "1º Nível", indications: 5, commission: 25.00, monthlyValue: 125.00 },
      { level: 2, title: "2º Nível", indications: 25, commission: 5.00, monthlyValue: 125.00 },
      { level: 3, title: "3º Nível", indications: 125, commission: 5.00, monthlyValue: 625.00 },
      { level: 4, title: "4º Nível", indications: 625, commission: 5.00, monthlyValue: 3125.00 }
    ]
  },
  {
    gb: 140,
    price: 144.99,
    commissionLevels: [
      { level: 1, title: "1º Nível", indications: 5, commission: 30.00, monthlyValue: 150.00 },
      { level: 2, title: "2º Nível", indications: 25, commission: 5.00, monthlyValue: 125.00 },
      { level: 3, title: "3º Nível", indications: 125, commission: 5.00, monthlyValue: 625.00 },
      { level: 4, title: "4º Nível", indications: 625, commission: 5.00, monthlyValue: 3125.00 }
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      {/* Layout with Plan Card on Left and Levels on Right */}
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        {/* Left Side - Static Plan Card */}
        <div className="lg:w-1/3 flex justify-center">
          <div className="card-container">
              <motion.div 
                key={`card-${currentPlan}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="plano-card"
              >
                <div className="label-topo">
                  ASSINATURA<br/>
                  <span>SEM FIDELIDADE</span>
                </div>
                
                <div className="giga-bloco">
                  <div className="giga-numero">
                    {plan.gb}<span className="giga-unidade">GB</span>
                  </div>
                </div>
                
                <div className="beneficios">
                  <p>Ligações e SMS ilimitados</p>
                  <p>para qualquer operadora do Brasil.</p>
                </div>
                
                <div className="preco-box">
                  <span className="preco-label">Por</span>
                  <span className="preco-destaque">{formatCurrency(plan.price)}</span>
                  <span className="preco-mes">/mês</span>
                </div>
              </motion.div>
              
              {/* Navigation Buttons */}
              <div className="nav-buttons">
                <button onClick={() => changePlan(-1)}>
                  ← Anterior
                </button>
                <button onClick={() => changePlan(1)}>
                  Próximo →
                </button>
              </div>
          </div>
        </div>

        {/* Right Side - Commission Levels */}
        <div className="lg:w-2/3">
          <motion.div 
            key={`levels-${currentPlan}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {plan.commissionLevels.map((level, index) => (
              <div
                key={level.level}
                className="bg-white rounded-2xl p-5 pl-6"
                style={{
                  background: 'linear-gradient(135deg, #fff, #f5f2fc)',
                  borderLeft: '8px solid #9c27b0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
              >
                <h3 className="text-primary font-bold text-xl mb-3">
                  {level.title}
                </h3>
                
                <p className="my-1 font-normal text-gray-600">
                  {level.indications} indicações{" "}
                  <strong className="text-gray-900">
                    {formatCurrency(level.commission)}
                  </strong> por indicado
                </p>
                
                <p className="my-1 font-bold text-primary text-lg">
                  Total: {formatCurrency(level.monthlyValue)}/mês
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Consumption Table Box */}
      <motion.div 
        key={`table-${currentPlan}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white p-6 rounded-2xl mb-10"
        style={{
          boxShadow: '0 6px 16px rgba(0,0,0,0.09)'
        }}
      >
        <h2 className="text-primary font-bold text-xl mb-4">
          Consumo Inteligente
        </h2>
        
        <div className="overflow-x-auto mt-3">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-purple-50">
                <th className="border-b border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">Nível</th>
                <th className="border-b border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">Clientes</th>
                <th className="border-b border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">Valor por Indicado</th>
                <th className="border-b border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">Total no Nível</th>
              </tr>
            </thead>
            <tbody>
              {plan.commissionLevels.map((level) => (
                <tr key={level.level}>
                  <td className="border-b border-gray-300 p-3 text-center text-sm">{level.title}</td>
                  <td className="border-b border-gray-300 p-3 text-center text-sm">{level.indications}</td>
                  <td className="border-b border-gray-300 p-3 text-center text-sm">{formatCurrency(level.commission)}</td>
                  <td className="border-b border-gray-300 p-3 text-center text-sm">{formatCurrency(level.monthlyValue)}</td>
                </tr>
              ))}
              <tr>
                <td className="border-b border-gray-300 p-3 text-center text-sm font-bold" colSpan={3}>
                  <strong>Total</strong>
                </td>
                <td className="border-b border-gray-300 p-3 text-center text-sm font-bold">
                  <strong>{formatCurrency(calculateTotal(plan.commissionLevels))}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Global Styles for Plan Card */}
      <style>{`
        .card-container {
          max-width: 100vw;
          overflow: hidden;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          justify-content: center;
        }

        .plano-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(to bottom right, #6600ff, #cc00cc);
          color: white;
          border-radius: 2rem;
          box-shadow:
            0 10px 20px rgba(0, 0, 0, 0.4),
            inset 4px 4px 10px rgba(255, 255, 255, 0.1),
            inset -4px -4px 10px rgba(0, 0, 0, 0.2);
          padding: 2.5rem 2rem;
          text-align: center;
          width: 480px;
          max-width: 100%;
          font-family: 'Segoe UI', sans-serif;
          position: relative;
        }

        .label-topo {
          font-weight: 700;
          font-size: 1.2rem;
          text-transform: uppercase;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
          margin-bottom: 1.5rem;
          letter-spacing: 0.5px;
          line-height: 1.5rem;
        }

        .label-topo span {
          font-size: 1rem;
          display: block;
          opacity: 0.9;
        }

        .giga-bloco {
          background: rgba(255,255,255,0.1);
          border-radius: 1rem;
          padding: 1rem 2rem;
          box-shadow: 0 0 0 4px rgba(255,255,255,0.05), 0 8px 16px rgba(0,0,0,0.3);
          margin: 1.5rem auto;
        }

        .giga-numero {
          font-size: 5rem;
          font-weight: 800;
          color: #fff;
          text-shadow: 2px 2px 6px rgba(0,0,0,0.5);
        }

        .giga-unidade {
          font-size: 2rem;
          margin-left: 0.4rem;
          vertical-align: middle;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
          font-weight: 500;
        }

        .beneficios {
          font-size: 1rem;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
          margin-bottom: 2rem;
          line-height: 1.4rem;
        }

        .preco-box {
          background: #ffffff22;
          border-radius: 0.7rem;
          padding: 0.8rem 1.2rem;
          box-shadow: inset 1px 1px 2px rgba(255,255,255,0.2), inset -1px -1px 2px rgba(0,0,0,0.2);
          text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
        }

        .preco-label {
          font-size: 1rem;
          margin-right: 0.2rem;
        }

        .preco-destaque {
          font-size: 1.6rem;
          font-weight: 700;
        }

        .preco-mes {
          font-size: 1rem;
          opacity: 0.85;
          margin-left: 0.2rem;
        }

        .nav-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .nav-buttons button {
          padding: 0.5rem 1rem;
          background: #6c3fc4;
          color: #fff;
          border: none;
          border-radius: 1rem;
          cursor: pointer;
          font-weight: bold;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          transition: background 0.3s;
        }

        .nav-buttons button:hover {
          background: #884dd1;
        }
      `}</style>
    </motion.div>
  );
}