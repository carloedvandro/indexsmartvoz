import React, { useState, useEffect } from 'react';
import { formatCurrency } from "@/utils/format";
import { motion } from 'framer-motion';
import { Orb3D } from '@/components/ui/3d-orb';

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

// Animation component for numbers
function AnimatedNumber({ value, delay = 0 }: { value: number; delay?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const increment = Math.ceil(value / 30);
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          current = value;
          clearInterval(interval);
        }
        setDisplayValue(current);
      }, 20);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  const formatNumber = (num: number) => {
    if (num > 999) {
      return num.toString().padStart(3, '0');
    }
    return num.toString().padStart(2, '0');
  };

  return <span className="numero">{formatNumber(displayValue)}</span>;
}

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
  const totalClients = plan.commissionLevels.reduce((total, level) => total + level.indications, 0);
  const totalValue = calculateTotal(plan.commissionLevels);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      {/* Layout with Plan Card on Left and Levels on Right */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Left Side - Static Plan Card */}
        <div className="lg:w-1/3 flex justify-center">
          <div className="card-container">
              <motion.div 
                key={`card-${currentPlan}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="plano-card relative overflow-hidden"
              >
                {/* 3D Orb Background Effect */}
                <div className="absolute top-4 right-4 opacity-30">
                  <Orb3D size={80} color="#ffffff" intensity={0.6} speed={0.005} />
                </div>
                <div className="absolute bottom-4 left-4 opacity-20">
                  <Orb3D size={60} color="#ff00ff" intensity={0.4} speed={0.008} />
                </div>
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
                
                <div className="comissoes">
                  {plan.commissionLevels.map((level, index) => (
                    <p key={level.level}>
                      <strong>Nível {level.level}:</strong> {formatCurrency(level.commission)}
                    </p>
                  ))}
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
            {plan.commissionLevels.map((level, index) => {
              const borderColors = [
                '#ff6b35', // Laranja - 1º nível
                '#a855f7', // Roxo - 2º nível  
                '#3b82f6', // Azul - 3º nível
                '#ec4899'  // Rosa/Magenta - 4º nível
              ];
              
              return (
                <div
                  key={level.level}
                  className="bg-white rounded-2xl p-5 pl-6"
                  style={{
                    background: 'linear-gradient(135deg, #fff, #f5f2fc)',
                    borderLeft: `8px solid ${borderColors[index]}`,
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
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Consumption Table Box */}
      <motion.div 
        key={`table-${currentPlan}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="tabela-container"
      >
        <h2 className="titulo">Consumo inteligente</h2>
        <div className="tabela-wrapper">
          <div className="tabela-header">
            <div className="col th">Nível</div>
            <div className="col th">Clientes</div>
            <div className="col th">Usuário</div>
            <div className="col th">Por Nível</div>
            <div className="col th">Acumulado</div>
          </div>

          {plan.commissionLevels.map((level, index) => {
            const nivelClass = ['nivel1', 'nivel2', 'nivel3', 'nivel4'][index];
            return (
              <div key={level.level} className={`tabela-row ${nivelClass}`}>
                <div className="col">{level.level}º</div>
                <div className="col">{level.indications}</div>
                <div className="col">
                  <strong>R$<AnimatedNumber value={level.commission} delay={index * 100} />,00</strong><br/>
                  <span>Por indicado</span>
                </div>
                <div className="col">
                  R$<AnimatedNumber value={level.commission} delay={index * 100} />,00
                </div>
                <div className="col">
                  R$<AnimatedNumber value={level.monthlyValue} delay={index * 100} />,00
                </div>
              </div>
            );
          })}

          <div className="tabela-row total">
            <div className="col">Total</div>
            <div className="col">{totalClients}</div>
            <div className="col">
              <strong>R$<AnimatedNumber value={35} delay={400} />,00</strong>
            </div>
            <div className="col">
              R$<AnimatedNumber value={35} delay={400} />,00
            </div>
            <div className="col">
              R$<AnimatedNumber value={totalValue} delay={400} />,00
            </div>
          </div>
        </div>

        <div className="footer-box">
          <p className="footer-label">Valor total a receber na recorrência <span className="valor">R${totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></p>
        </div>
      </motion.div>

      {/* Global Styles for Plan Card */}
      <style>{`
        .card-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .plano-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at top left, #6600ff, #cc00cc);
          color: white;
          border-radius: 2rem;
          box-shadow:
            0 10px 20px rgba(0,0,0,0.4),
            inset 4px 4px 10px rgba(255,255,255,0.1),
            inset -4px -4px 10px rgba(0,0,0,0.2);
          padding: 2.5rem 2rem;
          text-align: center;
          min-height: 420px;
          max-width: 420px;
          width: 100%;
          margin: auto;
          font-family: 'Segoe UI', sans-serif;
          position: relative;
        }

        .label-topo {
          font-weight: 700;
          font-size: 1.1rem;
          text-transform: uppercase;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
          transform: translateZ(6px);
          margin-bottom: 1.5rem;
          letter-spacing: 0.5px;
          line-height: 1.3rem;
        }

        .label-topo span {
          font-size: 0.95rem;
          display: block;
          opacity: 0.9;
        }

        .giga-bloco {
          background: rgba(255,255,255,0.1);
          border-radius: 1rem;
          padding: 1rem 2rem;
          box-shadow: 0 0 0 4px rgba(255,255,255,0.05), 0 8px 16px rgba(0,0,0,0.3);
          margin-bottom: 1.5rem;
        }

        .giga-numero {
          font-size: 5rem;
          font-weight: 800;
          color: #fff;
          text-shadow: 2px 2px 6px rgba(0,0,0,0.5);
        }

        .giga-unidade {
          font-size: 1.7rem;
          margin-left: 0.4rem;
          vertical-align: middle;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
          font-weight: 500;
        }

        .beneficios {
          font-size: 1rem;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
          margin-bottom: 1.8rem;
          line-height: 1.4rem;
        }

        .preco-box {
          background: #ffffff22;
          border-radius: 0.7rem;
          padding: 0.7rem 1rem;
          box-shadow: inset 1px 1px 2px rgba(255,255,255,0.2), inset -1px -1px 2px rgba(0,0,0,0.2);
          text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
        }

        .preco-label {
          font-size: 0.9rem;
          margin-right: 0.2rem;
        }

        .preco-destaque {
          font-size: 1.6rem;
          font-weight: 700;
        }

        .preco-mes {
          font-size: 0.9rem;
          opacity: 0.85;
          margin-left: 0.2rem;
        }

        .comissoes {
          background: #00000022;
          border-radius: 0.8rem;
          padding: 0.8rem 1rem;
          font-size: 0.95rem;
          margin-top: 1rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }

        .comissoes p {
          margin: 0.3rem 0;
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

        .tabela-container {
          max-width: 1400px;
          margin: 2rem auto;
          padding: 1rem;
          font-family: 'Segoe UI', sans-serif;
        }

        .titulo {
          text-align: center;
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          color: #111;
          text-shadow: 1px 1px 0 white;
        }

        .tabela-wrapper {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.5rem;
          border-radius: 1rem;
          padding: 1rem;
        }

        .tabela-header, .tabela-row {
          display: contents;
        }

        .col {
          padding: 1rem;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 3px 8px rgba(0,0,0,0.06);
          text-align: center;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .th {
          background: linear-gradient(45deg, #8a2be2, #da70d6);
          color: white;
          font-weight: 700;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
        }

        .tabela-row:hover .col {
          transform: translateY(-2px);
          transition: transform 0.3s ease;
        }

        .nivel1 .col:first-child { 
          border-left: 6px solid #ff6b35; 
          border-top-left-radius: 16px;
          border-bottom-left-radius: 16px;
        }
        .nivel2 .col:first-child { 
          border-left: 6px solid #a855f7; 
          border-top-left-radius: 16px;
          border-bottom-left-radius: 16px;
        }
        .nivel3 .col:first-child { 
          border-left: 6px solid #3b82f6; 
          border-top-left-radius: 16px;
          border-bottom-left-radius: 16px;
        }
        .nivel4 .col:first-child { 
          border-left: 6px solid #ec4899; 
          border-top-left-radius: 16px;
          border-bottom-left-radius: 16px;
        }
        .total .col {
          background: #ede5ff;
          font-weight: bold;
          color: #222;
        }

        .footer-box {
          margin-top: 2rem;
          padding: 1rem;
          border-radius: 1rem;
          background: linear-gradient(90deg, #d1c4e9, #ede7f6);
          box-shadow: inset 2px 2px 6px rgba(255,255,255,0.5), inset -2px -2px 6px rgba(0,0,0,0.05);
          text-align: center;
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
          animation: glow-pulse 3s infinite ease-in-out;
        }

        .footer-label .valor {
          font-weight: bold;
          color: #4a148c;
          text-shadow: 1px 1px 1px rgba(255,255,255,0.6);
        }

        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: inset 2px 2px 6px rgba(255,255,255,0.4), inset -2px -2px 6px rgba(0,0,0,0.04);
          }
          50% {
            box-shadow: inset 3px 3px 12px rgba(255,255,255,0.8), inset -3px -3px 12px rgba(0,0,0,0.08);
          }
        }

        .numero {
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </motion.div>
  );
}