import React, { useState, useCallback, useEffect } from 'react';
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
  const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false]);
  const [api, setApi] = useState<CarouselApi>();

  const toggleCardFlip = (index: number) => {
    setFlippedCards(prev => 
      prev.map((flipped, i) => i === index ? !flipped : flipped)
    );
  };

  const handleCarouselSelect = useCallback(() => {
    if (!api) return;
    const selectedIndex = api.selectedScrollSnap();
    setCurrentPlan(selectedIndex);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    
    api.on("select", handleCarouselSelect);
    
    return () => {
      api.off("select", handleCarouselSelect);
    };
  }, [api, handleCarouselSelect]);

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
        {/* Left Side - Plan Card */}
        <div className="lg:w-1/3">
          <Carousel 
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full max-w-xs mx-auto overflow-hidden"
          >
            <CarouselContent>
              {plans.map((planItem, index) => (
                <CarouselItem key={index}>
                  <div 
                    className={`card-flip ${flippedCards[index] ? 'flip' : ''}`}
                    onClick={() => toggleCardFlip(index)}
                  >
                    <div className="card-inner">
                      {/* Front Side - Plan Info */}
                      <motion.div 
                        key={`${index}-${currentPlan}-front`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="card-front w-[380px] h-80 relative overflow-hidden rounded-3xl p-6 text-white text-center flex flex-col justify-center mx-auto"
                        style={{
                          background: `linear-gradient(135deg, #6b00b6, #9c27b0)`,
                        }}
                      >
                        <div className="relative z-10">
                          <h4 className="font-bold tracking-wider mb-3 text-sm">
                            ASSINATURA<br/>
                            <span className="text-base">SEM FIDELIDADE</span>
                          </h4>
                          
                          <div className="giga-linha flex items-baseline justify-center gap-1 mt-4 mb-4">
                            <h1 className="text-6xl font-bold text-white">
                              {planItem.gb}
                            </h1>
                            <span className="text-xl text-white font-medium">GB</span>
                          </div>
                          
                          <div className="text-sm mb-4 text-white/90">
                            Ligações e SMS ilimitados<br/>
                            para qualquer operadora do Brasil.
                          </div>
                          
                          <small className="text-base mt-4 block">
                            Por <strong>{formatCurrency(planItem.price)}</strong><br/>/mês
                          </small>
                        </div>
                      </motion.div>

                      {/* Back Side - Commissions */}
                      <div className="card-back w-[380px] h-80 relative overflow-hidden rounded-3xl p-6 text-white text-center flex flex-col justify-center mx-auto"
                        style={{
                          background: `linear-gradient(135deg, #4a1a5c, #6b00b6)`,
                        }}
                      >
                        <h3 className="text-xl font-bold mb-6 text-white">Comissões</h3>
                        <ul className="space-y-3 text-sm">
                          {planItem.commissionLevels.map((level) => (
                            <li key={level.level} className="text-left">
                              {level.title}: {level.indications}x {formatCurrency(level.commission)} = {formatCurrency(level.monthlyValue)}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 pt-4 border-t border-white/20">
                          <strong className="text-lg">
                            Total: {formatCurrency(calculateTotal(planItem.commissionLevels))}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
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

      {/* Global style for card flip animation and scrollbar hiding */}
      <style>{`
        .card-flip {
          width: 380px;
          height: 320px;
          perspective: 1000px;
          cursor: pointer;
          border-radius: 1.5rem;
          box-shadow: inset 2px 2px 6px rgba(255,255,255,0.1), 
                      inset -2px -2px 6px rgba(0,0,0,0.2), 
                      0 10px 20px rgba(0,0,0,0.2);
        }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s;
          transform-style: preserve-3d;
          border-radius: 1.5rem;
          overflow: hidden;
        }

        .card-flip.flip .card-inner {
          transform: rotateY(180deg);
        }

        .card-front, .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 1.5rem;
        }

        .card-back {
          transform: rotateY(180deg);
        }

        @keyframes rotateLight {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Hide scrollbars on mobile */
        @media (max-width: 768px) {
          .embla__viewport {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .embla__viewport::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </motion.div>
  );
}