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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrentSlide(api.selectedScrollSnap());
  }, [api]);

  React.useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  const calculateTotal = (commissionLevels: CommissionLevel[]) => {
    return commissionLevels.reduce((total, level) => total + level.monthlyValue, 0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      <Carousel 
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {plans.map((plan, planIndex) => (
            <CarouselItem key={plan.gb}>
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl shadow-xl p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left Section - Plan Info */}
                  <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-8 rounded-2xl lg:w-1/3 text-center relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    
                    <div className="relative z-10">
                      <div className="mb-6">
                        <span className="text-sm font-semibold uppercase tracking-wider opacity-90">
                          ASSINATURA<br/>
                          <strong className="text-base">SEM FIDELIDADE</strong>
                        </span>
                      </div>
                      
                      <div className="my-8">
                        <div className="text-6xl font-bold leading-none">
                          {plan.gb}
                        </div>
                        <div className="text-lg opacity-80 mt-1">GB</div>
                      </div>
                      
                      <div className="text-sm leading-relaxed">
                        <div className="opacity-90">Por</div>
                        <div className="text-2xl font-bold my-1">{formatCurrency(plan.price)}</div>
                        <div className="opacity-80">/mês</div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Commission Levels */}
                  <div className="lg:w-2/3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {plan.commissionLevels.map((level, index) => (
                        <motion.div
                          key={level.level}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                          <h3 className="text-primary font-bold text-lg mb-3">
                            {level.title}
                          </h3>
                          
                          <div className="space-y-2 text-sm text-gray-600">
                            <p>
                              {level.indications} indicações<br/>
                              <strong className="text-gray-900">
                                {formatCurrency(level.commission)}
                              </strong> por indicado
                            </p>
                          </div>
                          
                          <div className="mt-4 pt-3 border-t border-gray-100">
                            <div className="font-bold text-gray-900">
                              {formatCurrency(level.monthlyValue)}/mês
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Tabela de Consumo Inteligente */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 bg-white rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold text-primary text-center mb-6">
          Consumo Inteligente
        </h2>
        
        <div className="overflow-x-auto">
          <motion.table 
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full border-collapse"
          >
            <thead>
              <tr className="bg-slate-50">
                <th className="px-4 py-3 text-center border-b border-gray-200 font-semibold text-gray-700">Nível</th>
                <th className="px-4 py-3 text-center border-b border-gray-200 font-semibold text-gray-700">Clientes</th>
                <th className="px-4 py-3 text-center border-b border-gray-200 font-semibold text-gray-700">Valor por Indicado</th>
                <th className="px-4 py-3 text-center border-b border-gray-200 font-semibold text-gray-700">Total no Nível</th>
              </tr>
            </thead>
            <tbody>
              {plans[currentSlide]?.commissionLevels.map((level) => (
                <tr key={level.level} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-center border-b border-gray-100">{level.title}</td>
                  <td className="px-4 py-3 text-center border-b border-gray-100">{level.indications}</td>
                  <td className="px-4 py-3 text-center border-b border-gray-100">{formatCurrency(level.commission)}</td>
                  <td className="px-4 py-3 text-center border-b border-gray-100">{formatCurrency(level.monthlyValue)}</td>
                </tr>
              ))}
              <tr className="bg-slate-100 font-bold">
                <td className="px-4 py-3 text-center border-b border-gray-200">Total</td>
                <td className="px-4 py-3 text-center border-b border-gray-200">780</td>
                <td className="px-4 py-3 text-center border-b border-gray-200">-</td>
                <td className="px-4 py-3 text-center border-b border-gray-200 text-primary font-bold">
                  {formatCurrency(calculateTotal(plans[currentSlide]?.commissionLevels || []))}
                </td>
              </tr>
            </tbody>
          </motion.table>
        </div>
      </motion.div>
    </motion.div>
  );
}