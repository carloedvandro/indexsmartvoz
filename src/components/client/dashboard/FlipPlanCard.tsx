import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { formatCurrency } from '@/utils/format';

interface Plan {
  id: number;
  gb: number;
  price: number;
  commissions: {
    level: number;
    amount: number;
    quantity: number;
    total: number;
  }[];
}

const plans: Plan[] = [
  {
    id: 1,
    gb: 100,
    price: 104.99,
    commissions: [
      { level: 1, amount: 20, quantity: 5, total: 100 },
      { level: 2, amount: 5, quantity: 25, total: 125 },
      { level: 3, amount: 5, quantity: 125, total: 625 },
      { level: 4, amount: 5, quantity: 625, total: 3125 }
    ]
  },
  {
    id: 2,
    gb: 120,
    price: 124.99,
    commissions: [
      { level: 1, amount: 25, quantity: 5, total: 125 },
      { level: 2, amount: 8, quantity: 25, total: 200 },
      { level: 3, amount: 8, quantity: 125, total: 1000 },
      { level: 4, amount: 8, quantity: 625, total: 5000 }
    ]
  },
  {
    id: 3,
    gb: 140,
    price: 144.99,
    commissions: [
      { level: 1, amount: 30, quantity: 5, total: 150 },
      { level: 2, amount: 10, quantity: 25, total: 250 },
      { level: 3, amount: 10, quantity: 125, total: 1250 },
      { level: 4, amount: 10, quantity: 625, total: 6250 }
    ]
  }
];

export function FlipPlanCard() {
  const { data: profile } = useProfile();
  const [activeCard, setActiveCard] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = 300; // 280px width + 20px gap
      const newActiveCard = Math.round(scrollLeft / cardWidth);
      setActiveCard(Math.min(newActiveCard, plans.length - 1));
    }
  };

  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = 300;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setActiveCard(index);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const totalCommissions = plans[activeCard].commissions.reduce((sum, comm) => sum + comm.total, 0);

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 font-sans">
      {/* Topbar */}
      <div className="flex items-center justify-between p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="flex flex-col">
          <span className="text-sm text-slate-600 dark:text-slate-400">Saldo em conta</span>
          <strong className="text-lg text-slate-900 dark:text-slate-100">R$ 269,18</strong>
        </div>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            <span className="text-purple-600 dark:text-purple-400">SMART</span>
            <span className="text-slate-900 dark:text-slate-100">VOZ</span>
          </h1>
        </div>
        
        <Button variant="outline" size="sm" className="gap-2">
          <LogOut className="w-4 h-4" />
          Sair
        </Button>
      </div>

      {/* Container de Planos */}
      <div className="w-full p-4">
        {/* Cards Slider */}
        <div className="relative mb-6">
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                className="flex-shrink-0 w-[280px] h-[420px] snap-center group"
                style={{ perspective: '1000px' }}
              >
                <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                  {/* Card Front */}
                  <div className="absolute inset-0 backface-hidden rounded-t-[40px] rounded-b-[80px] bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white shadow-2xl p-6 flex flex-col justify-center items-center">
                    <h4 className="text-center text-sm font-semibold mb-4 leading-tight">
                      ASSINATURA<br />SEM FIDELIDADE
                    </h4>
                    
                    <div className="flex items-baseline mb-2">
                      <h1 className="text-6xl font-black">{plan.gb}</h1>
                      <small className="text-lg ml-2 font-medium">GB</small>
                    </div>
                    
                    <div className="text-center text-sm mb-6 leading-relaxed opacity-90">
                      Ligações e SMS ilimitados<br />
                      para qualquer operadora do Brasil.
                    </div>
                    
                    <small className="text-base font-medium">
                      Por {formatCurrency(plan.price)} /mês
                    </small>
                  </div>

                  {/* Card Back */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-t-[40px] rounded-b-[80px] bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-2xl p-6 flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-6 text-center">Comissões</h3>
                    <ul className="space-y-3 text-sm">
                      {plan.commissions.map((comm) => (
                        <li key={comm.level} className="flex justify-between">
                          <span>{comm.level}º Nível:</span>
                          <span className="font-semibold">
                            {comm.quantity}x {formatCurrency(comm.amount)} = {formatCurrency(comm.total)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-700">
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>{formatCurrency(totalCommissions)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-4">
            {plans.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  activeCard === index
                    ? 'bg-purple-600 dark:bg-purple-400'
                    : 'bg-slate-300 dark:bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Níveis Box */}
        <div className="mb-6 p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-slate-100">
            Estrutura de Comissões - Plano {plans[activeCard].gb}GB
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {plans[activeCard].commissions.map((comm) => (
              <div key={comm.level} className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{comm.level}º</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Nível</div>
                <div className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-2">
                  {formatCurrency(comm.total)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consumo Box */}
        <div className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-slate-100">Consumo Inteligente</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
              <div className="text-sm text-slate-600 dark:text-slate-400">Dados Utilizados</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">45GB</div>
              <div className="text-xs text-slate-500 dark:text-slate-500">de {plans[activeCard].gb}GB</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
              <div className="text-sm text-slate-600 dark:text-slate-400">Ligações</div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">128min</div>
              <div className="text-xs text-slate-500 dark:text-slate-500">este mês</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl">
              <div className="text-sm text-slate-600 dark:text-slate-400">SMS Enviados</div>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">42</div>
              <div className="text-xs text-slate-500 dark:text-slate-500">este mês</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}