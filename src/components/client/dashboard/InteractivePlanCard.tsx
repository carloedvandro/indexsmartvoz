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
    <div style={{ margin: 0, padding: 0, fontFamily: "'Segoe UI', sans-serif", background: '#f7f7fc' }}>
      {/* Topbar */}
      <div className="topbar" style={{
        width: '100vw',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#ffffff',
        borderBottom: '1px solid #e5e5e5',
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        boxSizing: 'border-box'
      }}>
        <div className="saldo">
          <span style={{ fontSize: '14px', color: '#777' }}>Saldo em conta</span>
          <strong style={{ display: 'block', color: '#2e7d32', fontSize: '18px', marginTop: '2px' }}>R$ 269,18</strong>
        </div>
        <div className="logo" style={{ fontSize: '22px', fontWeight: 'bold', color: '#6b00b6' }}>
          SMART<span style={{ color: '#ff4081' }}>VOZ</span>
        </div>
        <div className="user-menu">
          <button className="sair" style={{
            background: '#ff4081',
            border: 'none',
            padding: '8px 16px',
            color: '#fff',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'background 0.3s'
          }}>Sair</button>
        </div>
      </div>

      {/* Container Planos */}
      <div className="container-planos" style={{
        width: '100vw',
        maxWidth: '100%',
        margin: '0 auto',
        fontFamily: "'Segoe UI', sans-serif",
        padding: 0,
        overflowX: 'hidden',
        boxSizing: 'border-box'
      }}>
        {/* Plan Cards Slider */}
        <div className="plano-slide-container" style={{
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          marginBottom: '20px',
          position: 'relative',
          width: '100vw',
          padding: '0 10px',
          boxSizing: 'border-box'
        }}>
          <div 
            ref={scrollContainerRef}
            className="plano-cards-wrapper"
            style={{
              display: 'flex',
              gap: '20px',
              width: 'max-content',
              scrollSnapAlign: 'center',
              padding: '0 10px',
              boxSizing: 'border-box'
            }}
          >
            {plans.map((planItem, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="plano-card"
                style={{
                  minWidth: '280px',
                  height: '420px',
                  background: 'linear-gradient(145deg, #7400c8, #ae4fff)',
                  color: 'white',
                  borderRadius: '40px 40px 80px 80px',
                  padding: '25px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.35)',
                  scrollSnapAlign: 'center',
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onClick={() => scrollToCard(index)}
              >
                {/* Rotating light effect */}
                <div 
                  style={{
                    content: '""',
                    position: 'absolute',
                    top: '-40px',
                    left: '-40px',
                    width: '150%',
                    height: '150%',
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.15), transparent 60%)',
                    animation: 'rotateLight 10s linear infinite',
                    zIndex: 0
                  }}
                />
                
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <h4 style={{ fontWeight: '700', fontSize: '14px', letterSpacing: '1px', marginTop: '10px' }}>
                    ASSINATURA<br/>
                    <span style={{ fontSize: '16px' }}>SEM FIDELIDADE</span>
                  </h4>
                  
                  <h1 style={{ fontSize: '60px', margin: '10px 0' }}>
                    {planItem.gb}
                  </h1>
                  <div style={{ fontSize: '16px', opacity: 0.8 }}>GB</div>
                  
                  <div className="extras" style={{ fontSize: '13px', marginTop: '10px', color: '#ddd' }}>
                    Ligações e SMS ilimitados para qualquer operadora do Brasil.
                  </div>
                  
                  <small style={{ fontSize: '16px', marginTop: '15px', display: 'block' }}>
                    Por <strong>{formatCurrency(planItem.price)}</strong><br/>/mês
                  </small>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots Indicators */}
          <div className="dots-wrapper" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '10px',
            pointerEvents: 'auto'
          }}>
            {plans.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className="dot"
                style={{
                  width: '10px',
                  height: '10px',
                  background: index === currentPlan ? '#6b00b6' : '#ccc',
                  borderRadius: '50%',
                  transition: 'background 0.3s',
                  border: 'none',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </div>

        {/* Commission Levels Box */}
        <div className="niveis-box" style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          margin: '30px 0 10px',
          gap: '10px',
          padding: '0 20px',
          width: '100vw',
          boxSizing: 'border-box'
        }}>
          {plan.commissionLevels.map((level, index) => (
            <div
              key={level.level}
              className="nivel"
              style={{
                width: '48%',
                background: 'linear-gradient(135deg, #fff, #f5f2fc)',
                borderLeft: '8px solid #9c27b0',
                borderRadius: '15px',
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}
            >
              <h3 style={{ color: '#6b00b6', fontSize: '20px', marginBottom: '10px' }}>
                {level.title}
              </h3>
              
              <p style={{ margin: '4px 0', fontWeight: '500' }}>
                {level.indications} indicações
              </p>
              <p style={{ margin: '4px 0', fontWeight: '500' }}>
                <strong>
                  {formatCurrency(level.commission)}
                </strong> por indicado
              </p>
              
              <p style={{ margin: '4px 0', fontWeight: '500' }}>
                Total: {formatCurrency(level.monthlyValue)}/mês
              </p>
            </div>
          ))}
        </div>

        {/* Consumption Table Box */}
        <div className="consumo-box" style={{
          background: '#fff',
          padding: '25px 20px',
          borderRadius: '15px',
          boxShadow: '0 6px 16px rgba(0,0,0,0.09)',
          marginTop: '20px',
          maxWidth: '100vw',
          boxSizing: 'border-box'
        }}>
          <h2 style={{ color: '#6b00b6', fontSize: '22px', marginBottom: '15px' }}>
            Consumo Inteligente
          </h2>
          
          <div style={{ overflowX: 'auto', marginTop: '10px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr style={{ background: '#f4f0fa' }}>
                  <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'center', fontSize: '14px', color: '#333' }}>Nível</th>
                  <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'center', fontSize: '14px', color: '#333' }}>Clientes</th>
                  <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'center', fontSize: '14px', color: '#333' }}>Valor por Indicado</th>
                  <th style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'center', fontSize: '14px', color: '#333' }}>Total no Nível</th>
                </tr>
              </thead>
              <tbody>
                {plan.commissionLevels.map((level) => (
                  <tr key={level.level}>
                    <td style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'center', fontSize: '14px' }}>{level.title}</td>
                    <td style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'center', fontSize: '14px' }}>{level.indications}</td>
                    <td style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'center', fontSize: '14px' }}>{formatCurrency(level.commission)}</td>
                    <td style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'center', fontSize: '14px' }}>{formatCurrency(level.monthlyValue)}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }} colSpan={3}>
                    <strong>Total</strong>
                  </td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
                    <strong>{formatCurrency(calculateTotal(plan.commissionLevels))}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

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