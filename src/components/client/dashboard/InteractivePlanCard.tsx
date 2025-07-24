import React, { useState, useCallback } from 'react';
import { formatCurrency } from "@/utils/format";
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from "@/components/ui/carousel";

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
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.children[index] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: "smooth", inline: "center" });
        setCurrentPlan(index);
      }
    }
  };

  const handleScroll = React.useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const cardWidth = 300; // approximate card width with gap
    const activeIndex = Math.round(scrollLeft / cardWidth);
    
    if (activeIndex !== currentPlan && activeIndex >= 0 && activeIndex < plans.length) {
      setCurrentPlan(activeIndex);
    }
  }, [currentPlan]);

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const calculateTotal = (commissionLevels: CommissionLevel[]) => {
    return commissionLevels.reduce((total, level) => total + level.monthlyValue, 0);
  };

  const getCardGradient = (planIndex: number) => {
    const colors = ['#6b00b6', '#9c27b0', '#7b1fa2'];
    return `linear-gradient(145deg, ${colors[planIndex]}, #ae4fff)`;
  };

  const plan = plans[currentPlan];

  return (
    <div className="w-screen max-w-full mx-auto font-['Segoe_UI',sans-serif] p-0 overflow-x-hidden box-border">
      {/* Plan Cards Slider */}
      <div className="overflow-x-auto scroll-smooth mb-5 relative w-screen px-2 box-border" style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
        <div 
          ref={scrollContainerRef}
          className="flex gap-5 w-max px-2 box-border"
          style={{ scrollSnapAlign: 'center' }}
        >
          {plans.map((planItem, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="min-w-[280px] h-[420px] text-white p-6 text-center flex flex-col justify-start items-center relative overflow-hidden cursor-pointer"
              style={{
                background: 'linear-gradient(145deg, #7400c8, #ae4fff)',
                borderRadius: '40px 40px 80px 80px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.35)',
                scrollSnapAlign: 'center'
              }}
              onClick={() => scrollToCard(index)}
            >
              {/* Rotating light effect */}
              <div 
                className="absolute -top-10 -left-10 w-[150%] h-[150%] z-0"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.15), transparent 60%)',
                  animation: 'rotateLight 10s linear infinite'
                }}
              />
              
              <div className="relative z-10 flex flex-col items-center">
                <h4 className="font-bold text-sm tracking-wider mt-3 mb-3">
                  ASSINATURA<br/>
                  <span className="text-base">SEM FIDELIDADE</span>
                </h4>
                
                <h1 className="text-6xl my-3 font-bold">
                  {planItem.gb}
                </h1>
                <div className="text-lg opacity-80">GB</div>
                
                <div className="text-sm mt-3 text-gray-200 px-2">
                  Ligações e SMS ilimitados para qualquer operadora do Brasil.
                </div>
                
                <small className="text-base mt-4 block">
                  Por <strong>{formatCurrency(planItem.price)}</strong><br/>/mês
                </small>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Dots Indicators */}
        <div className="flex justify-center gap-2 mt-3 pointer-events-auto">
          {plans.map((_, index) => (
            <div
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentPlan ? 'bg-purple-700' : 'bg-gray-400'
              }`}
              onClick={() => scrollToCard(index)}
            />
          ))}
        </div>
      </div>

      {/* Commission Levels Box */}
      <motion.div 
        key={`levels-${currentPlan}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-wrap justify-between my-8 gap-2.5 px-5 w-screen box-border"
      >
        {plan.commissionLevels.map((level, index) => (
          <div
            key={level.level}
            className="w-[48%] p-5 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #fff, #f5f2fc)',
              borderLeft: '8px solid #9c27b0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}
          >
            <h3 className="text-purple-700 text-xl font-semibold mb-2.5">
              {level.title}
            </h3>
            
            <p className="my-1 font-medium">
              {level.indications} indicações
            </p>
            <p className="my-1 font-medium">
              <strong>{formatCurrency(level.commission)}</strong> por indicado
            </p>
            
            <p className="my-1 font-bold text-purple-700 text-lg">
              Total: {formatCurrency(level.monthlyValue)}/mês
            </p>
          </div>
        ))}
      </motion.div>

      {/* Consumption Table Box */}
      <motion.div 
        key={`table-${currentPlan}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white p-6 rounded-2xl mt-5 max-w-full box-border"
        style={{
          boxShadow: '0 6px 16px rgba(0,0,0,0.09)'
        }}
      >
        <h2 className="text-purple-700 text-xl font-semibold mb-4">
          Consumo Inteligente
        </h2>
        
        <table className="w-full border-collapse mt-2.5">
          <thead>
            <tr>
              <th className="border-b border-gray-300 p-3 text-center text-sm bg-purple-50 text-gray-800">Nível</th>
              <th className="border-b border-gray-300 p-3 text-center text-sm bg-purple-50 text-gray-800">Clientes</th>
              <th className="border-b border-gray-300 p-3 text-center text-sm bg-purple-50 text-gray-800">Valor por Indicado</th>
              <th className="border-b border-gray-300 p-3 text-center text-sm bg-purple-50 text-gray-800">Total no Nível</th>
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
      </motion.div>

      {/* Global style for rotating light animation */}
      <style>{`
        @keyframes rotateLight {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}