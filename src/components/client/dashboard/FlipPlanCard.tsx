import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { usePlans } from "@/hooks/usePlans";
import "@/styles/components/flip-card.css";

interface PlanData {
  gb: number;
  price: number;
  commissions: Array<{
    level: number;
    quantity: number;
    value: number;
    total: number;
  }>;
}

const plansData: PlanData[] = [
  {
    gb: 100,
    price: 104.99,
    commissions: [
      { level: 1, quantity: 5, value: 20, total: 100 },
      { level: 2, quantity: 25, value: 5, total: 125 },
      { level: 3, quantity: 125, value: 5, total: 625 },
      { level: 4, quantity: 625, value: 5, total: 3125 }
    ]
  },
  {
    gb: 120,
    price: 124.99,
    commissions: [
      { level: 1, quantity: 5, value: 25, total: 125 },
      { level: 2, quantity: 25, value: 7, total: 175 },
      { level: 3, quantity: 125, value: 6, total: 750 },
      { level: 4, quantity: 625, value: 6, total: 3750 }
    ]
  },
  {
    gb: 140,
    price: 144.99,
    commissions: [
      { level: 1, quantity: 5, value: 30, total: 150 },
      { level: 2, quantity: 25, value: 10, total: 250 },
      { level: 3, quantity: 125, value: 7, total: 875 },
      { level: 4, quantity: 625, value: 7, total: 4375 }
    ]
  }
];

const consumptionData = [
  { service: "WhatsApp", consumption: "Ilimitado", icon: "📱" },
  { service: "Instagram", consumption: "Ilimitado", icon: "📷" },
  { service: "Facebook", consumption: "Ilimitado", icon: "👥" },
  { service: "YouTube", consumption: "15GB", icon: "📺" },
  { service: "Netflix", consumption: "10GB", icon: "🎬" },
  { service: "Spotify", consumption: "Ilimitado", icon: "🎵" }
];

export function FlipPlanCard() {
  const [currentCard, setCurrentCard] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = 280 + 20; // width + gap
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
    setCurrentCard(index);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const cardWidth = 280 + 20;
      const scrollLeft = scrollRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentCard(newIndex);
    }
  };

  return (
    <div className="w-full mb-8 px-5">
      <div className="container-planos">
        <div 
          className="plano-slide-container"
          ref={scrollRef}
          onScroll={handleScroll}
        >
          <div className="plano-cards-wrapper">
            {plansData.map((plan, index) => (
              <div key={index} className="card-flip">
                <div className="card-inner">
                  <div className="card-front plano-card">
                    <h4>ASSINATURA<br/>SEM FIDELIDADE</h4>
                    <h1>{plan.gb}</h1>
                    <small>GB</small>
                    <div className="extras">
                      Ligações e SMS ilimitados<br/>
                      para qualquer operadora do Brasil.
                    </div>
                    <small>Por {formatCurrency(plan.price)} /mês</small>
                  </div>
                  <div className="card-back">
                    <h3>Comissões</h3>
                    <ul>
                      {plan.commissions.map((commission) => (
                        <li key={commission.level}>
                          {commission.level}º Nível: {commission.quantity}x {formatCurrency(commission.value)} = {formatCurrency(commission.total)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="dots-wrapper">
            {plansData.map((_, index) => (
              <div 
                key={index}
                className={`dot ${index === currentCard ? 'active' : ''}`}
                onClick={() => scrollToCard(index)}
              />
            ))}
          </div>
        </div>

        <div className="niveis-box" id="niveisBox">
          <h3>Estrutura de Níveis</h3>
          <div className="niveis-grid">
            {plansData[currentCard]?.commissions.map((commission) => (
              <div key={commission.level} className="nivel-item">
                <div className="nivel-number">{commission.level}º</div>
                <div className="nivel-info">
                  <span>{commission.quantity} pessoas</span>
                  <strong>{formatCurrency(commission.total)}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="consumo-box">
          <h2>Consumo Inteligente</h2>
          <div id="consumoTabela" className="consumo-grid">
            {consumptionData.map((item, index) => (
              <div key={index} className="consumo-item">
                <span className="consumo-icon">{item.icon}</span>
                <div className="consumo-info">
                  <span className="consumo-service">{item.service}</span>
                  <span className="consumo-value">{item.consumption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}