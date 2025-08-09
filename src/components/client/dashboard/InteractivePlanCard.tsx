import React, { useState, useEffect } from 'react';
import { formatCurrency } from "@/utils/format";
import { motion } from 'framer-motion';
import { Orb3D } from '@/components/ui/3d-orb';
import { GradientText } from '@/components/ui/gradient-text';
import { Volume2, VolumeX } from 'lucide-react';
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
const plans: Plan[] = [{
  gb: 100,
  price: 99.99,
  commissionLevels: [{
    level: 1,
    title: "1º Nível",
    indications: 5,
    commission: 20.00,
    monthlyValue: 100.00
  }, {
    level: 2,
    title: "2º Nível",
    indications: 25,
    commission: 5.00,
    monthlyValue: 125.00
  }, {
    level: 3,
    title: "3º Nível",
    indications: 125,
    commission: 5.00,
    monthlyValue: 625.00
  }, {
    level: 4,
    title: "4º Nível",
    indications: 625,
    commission: 5.00,
    monthlyValue: 3125.00
  }]
}, {
  gb: 120,
  price: 119.99,
  commissionLevels: [{
    level: 1,
    title: "1º Nível",
    indications: 5,
    commission: 25.00,
    monthlyValue: 125.00
  }, {
    level: 2,
    title: "2º Nível",
    indications: 25,
    commission: 5.00,
    monthlyValue: 125.00
  }, {
    level: 3,
    title: "3º Nível",
    indications: 125,
    commission: 5.00,
    monthlyValue: 625.00
  }, {
    level: 4,
    title: "4º Nível",
    indications: 625,
    commission: 5.00,
    monthlyValue: 3125.00
  }]
}, {
  gb: 140,
  price: 139.99,
  commissionLevels: [{
    level: 1,
    title: "1º Nível",
    indications: 5,
    commission: 30.00,
    monthlyValue: 150.00
  }, {
    level: 2,
    title: "2º Nível",
    indications: 25,
    commission: 5.00,
    monthlyValue: 125.00
  }, {
    level: 3,
    title: "3º Nível",
    indications: 125,
    commission: 5.00,
    monthlyValue: 625.00
  }, {
    level: 4,
    title: "4º Nível",
    indications: 625,
    commission: 5.00,
    monthlyValue: 3125.00
  }]
}];

// Animation component for numbers
function AnimatedNumber({
  value,
  delay = 0
}: {
  value: number;
  delay?: number;
}) {
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
  const [isPlaying, setIsPlaying] = useState(false);

  const changePlan = (direction: number) => {
    setCurrentPlan(prev => {
      const newIndex = prev + direction;
      if (newIndex < 0) return plans.length - 1;
      if (newIndex >= plans.length) return 0;
      return newIndex;
    });
  };

  const generateNarrationText = (plan: Plan) => {
    const firstLevel = plan.commissionLevels[0];
    const otherLevels = plan.commissionLevels.slice(1);
    
    if (plan.gb === 100) {
      return "No plano de 100GB, você paga R$99,99 e ganha R$20,00 no primeiro nível e R$5,00 do segundo ao quarto nível.";
    } else if (plan.gb === 120) {
      return "No plano de 120GB, o valor é R$119,99 com ganho de R$25,00 no primeiro nível e R$5,00 do segundo ao quarto nível.";
    } else if (plan.gb === 140) {
      return "No plano de 140GB, você paga R$139,99 e recebe R$30,00 no primeiro nível e R$5,00 do segundo ao quarto nível.";
    }
    
    return `No plano de ${plan.gb}GB, você paga ${formatCurrency(plan.price)} e ganha ${formatCurrency(firstLevel.commission)} no primeiro nível e ${formatCurrency(otherLevels[0].commission)} do segundo ao quarto nível.`;
  };

  const playNarration = () => {
    if ('speechSynthesis' in window) {
      // Para a narração atual se estiver tocando
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      const text = generateNarrationText(plan);
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configurações da voz
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9; // Velocidade um pouco mais lenta
      utterance.pitch = 1;
      utterance.volume = 1;

      // Event listeners
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-Speech não é suportado neste navegador');
    }
  };
  const calculateTotal = (commissionLevels: CommissionLevel[]) => {
    return commissionLevels.reduce((total, level) => total + level.monthlyValue, 0);
  };
  const plan = plans[currentPlan];
  const totalClients = plan.commissionLevels.reduce((total, level) => total + level.indications, 0);
  const totalValue = calculateTotal(plan.commissionLevels);
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }} className="max-w-7xl mx-auto">
      {/* Layout with Plan Card on Left and Levels on Right */}
      <div className="flex flex-col lg:flex-row gap-10 mb-10">
        {/* Left Side - Static Plan Card */}
        <div className="lg:w-1/3 flex justify-center">
          <div className="-bottom-1/2 ">
              <motion.div key={`card-${currentPlan}`} initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.4
          }} className="bg-purple-800 text-white max-w-sm w-full shadow-2xl rounded-3xl p-6 space-y-4 relative overflow-hidden">
                {/* 3D Orb Background Effect */}
                <div className="absolute top-4 right-4 opacity-30">
                  <Orb3D size={80} color="#ffffff" intensity={0.6} speed={0.005} />
                </div>
                <div className="absolute bottom-4 left-4 opacity-20">
                  <Orb3D size={60} color="#ff00ff" intensity={0.4} speed={0.008} />
                </div>
                
                <h2 className="text-center text-lg font-semibold tracking-wide text-white">
                  ASSINATURA<br />
                  <span>SEM FIDELIDADE</span>
                </h2>

                <div className="bg-purple-600 rounded-xl text-center py-4 text-4xl font-extrabold shadow-inner">
                  {plan.gb}<span className="text-purple-300 text-2xl font-medium">GB</span>
                </div>

                <p className="text-center text-sm mt-2">
                  Você ganha por indicação
                </p>

                <p className="text-center text-white text-sm">
                  Ligações e SMS ilimitados para qualquer operadora do Brasil.
                </p>

                <div className="bg-purple-500 rounded-lg py-3 text-center text-xl font-bold text-white">
                  Por {formatCurrency(plan.price)} <span className="text-sm font-normal">/mês</span>
                </div>

                <div className="bg-purple-700 rounded-xl mt-4 p-4 space-y-2">
                  {plan.commissionLevels.map((level, index) => (
                    <p key={level.level} className="text-sm font-semibold text-yellow-300">
                      Nível {level.level}: <span className="text-white font-normal">{formatCurrency(level.commission)}</span>
                    </p>
                  ))}
                </div>
                
                {/* Audio Narration Button */}
                <div className="flex justify-center mt-4">
                  <button
                    onClick={playNarration}
                    className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-white/10 text-white rounded-lg transition-all duration-300 border border-white/30 shadow-[0_6px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 hover:shadow-[0_8px_0_rgba(255,255,255,0.25)] active:translate-y-0 active:shadow-[0_2px_0_rgba(255,255,255,0.2)]"
                    disabled={!('speechSynthesis' in window)}
                  >
                    {isPlaying ? (
                      <>
                        <VolumeX size={20} />
                        <span className="text-sm font-medium">Parar áudio</span>
                      </>
                    ) : (
                      <>
                        <Volume2 size={20} />
                        <span className="text-sm font-medium">Ouvir plano</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
              
              {/* Navigation Buttons */}
              <div className="nav-buttons" style={{ marginTop: '40px' }}>
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
          <motion.div key={`levels-${currentPlan}`} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.3
        }} className="space-y-4">
            {plan.commissionLevels.map((level, index) => {
            const borderColors = ['#ff6b35',
            // Laranja - 1º nível
            '#a855f7',
            // Roxo - 2º nível  
            '#3b82f6',
            // Azul - 3º nível
            '#ec4899' // Rosa/Magenta - 4º nível
            ];
            return <div key={level.level} style={{
              borderLeft: `8px solid ${borderColors[index]}`
            }} className="rounded-2xl p-3 pl-4">
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
                </div>;
          })}
          </motion.div>
        </div>
      </div>

      {/* Consumption Table Box */}
      <motion.div key={`table-${currentPlan}`} initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.3,
      delay: 0.1
    }} className="-bottom-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800" style={{fontSize: 'calc(1.25rem + 1px)'}}>Consumo inteligente</h2>
        
        {/* Desktop Cards Layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-5 gap-4 mb-4">
            {/* Header Cards */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-4 px-4 rounded-2xl font-bold">
              Nível
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-4 px-4 rounded-2xl font-bold">
              Clientes
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-4 px-4 rounded-2xl font-bold">
              Usuário
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-4 px-4 rounded-2xl font-bold">
              Por Nível
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-4 px-4 rounded-2xl font-bold">
              Acumulado
            </div>
          </div>

          {/* Data Rows */}
          {plan.commissionLevels.map((level, index) => {
            const borderColors = ['#FF5E3A', '#A45EFF', '#3B9CFF', '#E94FC6'];
            return (
              <div key={level.level} className="grid grid-cols-5 gap-4 mb-4">
                <div 
                  className="bg-white text-center py-6 px-4 rounded-2xl font-bold border-l-8 flex items-center justify-center shadow-sm text-lg"
                  style={{ borderLeftColor: borderColors[index] }}
                >
                  {level.level}º
                </div>
                <div className="bg-white text-center py-6 px-4 rounded-2xl flex items-center justify-center shadow-sm text-lg font-medium">
                  {level.indications}
                </div>
                <div className="bg-white text-center py-4 px-4 rounded-2xl flex flex-col items-center justify-center shadow-sm">
                  <div className="font-bold text-lg">R${level.commission.toFixed(2)}</div>
                  <div className="text-gray-600 text-sm">Por indicado</div>
                </div>
                <div className="bg-white text-center py-6 px-4 rounded-2xl flex items-center justify-center shadow-sm text-lg font-medium">
                  R${level.commission.toFixed(2)}
                </div>
                <div className="bg-white text-center py-6 px-4 rounded-2xl flex items-center justify-center shadow-sm text-lg font-medium">
                  R${level.monthlyValue.toFixed(2)}
                </div>
              </div>
            );
          })}

          {/* Total Row */}
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-purple-100 text-center py-6 px-4 rounded-2xl font-bold flex items-center justify-center text-lg">
              Total
            </div>
            <div className="bg-purple-100 text-center py-6 px-4 rounded-2xl font-bold flex items-center justify-center text-lg">
              {totalClients}
            </div>
            <div className="bg-purple-100 text-center py-6 px-4 rounded-2xl font-bold flex items-center justify-center text-lg">
              R$35,00
            </div>
            <div className="bg-purple-100 text-center py-6 px-4 rounded-2xl font-bold flex items-center justify-center text-lg">
              R$35,00
            </div>
            <div className="bg-purple-100 text-center py-6 px-4 rounded-2xl font-bold flex items-center justify-center text-lg">
              R${totalValue.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="block md:hidden space-y-2 w-full overflow-x-hidden px-0">
          {/* Header Cards */}
          <div className="grid grid-cols-5 gap-1 min-w-0">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-2 px-1 rounded-lg text-xs font-bold">
              Nível
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-2 px-1 rounded-lg text-xs font-bold">
              Clientes
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-2 px-1 rounded-lg text-xs font-bold">
              Usuário
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-2 px-1 rounded-lg text-xs font-bold">
              Por Nível
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-2 px-1 rounded-lg text-xs font-bold">
              Acumulado
            </div>
          </div>

          {/* Data Rows */}
          {plan.commissionLevels.map((level, index) => {
            const borderColors = ['#FF5E3A', '#A45EFF', '#3B9CFF', '#E94FC6'];
            return (
              <div key={level.level} className="grid grid-cols-5 gap-1">
                <div 
                  className="bg-white text-center py-3 px-1 rounded-lg text-xs font-bold border-l-4 flex items-center justify-center"
                  style={{ borderLeftColor: borderColors[index] }}
                >
                  {level.level}º
                </div>
                <div className="bg-white text-center py-3 px-1 rounded-lg text-xs flex items-center justify-center">
                  {level.indications}
                </div>
                <div className="bg-white text-center py-1 px-1 rounded-lg text-xs flex flex-col items-center justify-center">
                  <div className="font-bold text-xs">R${level.commission.toFixed(2)}</div>
                  <div className="text-gray-600 text-xs leading-tight">Por indicado</div>
                </div>
                <div className="bg-white text-center py-3 px-1 rounded-lg text-xs flex items-center justify-center">
                  R${level.commission.toFixed(2)}
                </div>
                <div className="bg-white text-center py-3 px-1 rounded-lg text-xs flex items-center justify-center">
                  R${level.monthlyValue.toFixed(2)}
                </div>
              </div>
            );
          })}

          {/* Total Row */}
          <div className="grid grid-cols-5 gap-1">
            <div className="bg-purple-100 text-center py-3 px-1 rounded-lg text-xs font-bold flex items-center justify-center">
              Total
            </div>
            <div className="bg-purple-100 text-center py-3 px-1 rounded-lg text-xs font-bold flex items-center justify-center">
              {totalClients}
            </div>
            <div className="bg-purple-100 text-center py-3 px-1 rounded-lg text-xs font-bold flex items-center justify-center">
              R$35,00
            </div>
            <div className="bg-purple-100 text-center py-3 px-1 rounded-lg text-xs font-bold flex items-center justify-center">
              R$35,00
            </div>
            <div className="bg-purple-100 text-center py-3 px-1 rounded-lg text-xs font-bold flex items-center justify-center">
              R${totalValue.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="footer-box">
          <p className="footer-label">
            <span className="block md:inline">Valor total a receber na recorrência</span>
            <span className="valor block md:inline"> R${totalValue.toLocaleString('pt-BR', {
              minimumFractionDigits: 2
            })}</span>
          </p>
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
          max-width: 460px;
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
          border-radius: 0.7rem;
          padding: 0.7rem 1rem;
          font-size: 0.95rem;
          margin-top: 1rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
          text-align: left;
          box-shadow: inset 1px 1px 2px rgba(255,255,255,0.2), inset -1px -1px 2px rgba(0,0,0,0.2);
        }

        .comissoes p {
          margin: 0.3rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
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
          max-width: 1900px;
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
          padding: 1rem 3rem;
          border-radius: 1rem;
          background: linear-gradient(90deg, #d1c4e9, #ede7f6);
          box-shadow: inset 2px 2px 6px rgba(255,255,255,0.5), inset -2px -2px 6px rgba(0,0,0,0.05);
          text-align: center;
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
          animation: glow-pulse 3s infinite ease-in-out;
        }

        .footer-label {
          letter-spacing: -1.5px;
        }

        .footer-label .valor {
          font-weight: bold;
          color: #4a148c;
          text-shadow: 1px 1px 1px rgba(255,255,255,0.6);
        }

        /* Mobile text break for footer */
        @media screen and (max-width: 768px) {
          .footer-label {
            white-space: nowrap;
          }
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

        /* Responsive Table Styles */
        .responsive-table-container {
          overflow-x: auto;
          max-width: 100%;
          margin: 2rem auto;
        }

        .responsive-table {
          border-collapse: collapse;
          width: 100%;
          min-width: 650px;
          background-color: #f7f7fc;
          font-family: sans-serif;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }

        .responsive-table th {
          background: linear-gradient(90deg, #a34ddc, #c84ad6);
          color: white;
          padding: 14px 10px;
          font-weight: bold;
          text-align: center;
          font-size: 1rem;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        }

        .responsive-table th:first-child {
          border-top-left-radius: 12px;
        }

        .responsive-table th:last-child {
          border-top-right-radius: 12px;
        }

        .responsive-table td {
          text-align: center;
          padding: 12px 10px;
          background-color: white;
          border-bottom: 1px solid #eee;
          font-size: 0.95rem;
          color: #333;
        }

        .responsive-table tr:last-child td:first-child {
          border-bottom-left-radius: 12px;
        }

        .responsive-table tr:last-child td:last-child {
          border-bottom-right-radius: 12px;
        }

        .nivel-col {
          border-left: 5px solid;
          font-weight: bold;
          position: relative;
        }

        .total-row td {
          background-color: #ede7ff !important;
          font-weight: bold;
          color: #333;
        }

        .nivel-1 { border-left-color: #FF5E3A; }
        .nivel-2 { border-left-color: #A45EFF; }
        .nivel-3 { border-left-color: #3B9CFF; }
        .nivel-4 { border-left-color: #E94FC6; }

        .responsive-table tr:hover td {
          background-color: #f8f9ff;
          transition: background-color 0.2s ease;
        }

        .total-row:hover td {
          background-color: #e6dcff !important;
        }

        @media screen and (max-width: 768px) {
          .responsive-table-container {
            margin: 1rem auto;
          }
          
          .responsive-table {
            min-width: unset;
            font-size: 14px;
            display: block;
            overflow-x: auto;
            white-space: nowrap;
          }

          .responsive-table thead {
            display: block;
          }

          .responsive-table tbody {
            display: block;
          }

          .responsive-table tr {
            display: table;
            width: 100%;
            table-layout: fixed;
          }

          .responsive-table td, .responsive-table th {
            padding: 8px 4px;
            font-size: 12px;
          }

          .responsive-table td br {
            display: none;
          }

          .responsive-table td span.text-sm {
            display: none;
          }
        }
      `}</style>
    </motion.div>;
}