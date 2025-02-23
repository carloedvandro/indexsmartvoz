
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const cards = [
  {
    id: 1,
    title: "Conectividade Total",
    content: "Sempre conectado",
  },
  {
    id: 2,
    title: "Tecnologia Avançada",
    content: "O futuro ao seu alcance",
  },
  {
    id: 3,
    title: "Soluções Inteligentes",
    content: "Inovação em cada detalhe",
  },
];

export function Carousel3D() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[500px] w-full bg-[#070B1A] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      
      <div className="relative w-full h-full flex items-center justify-center perspective-1000">
        {cards.map((card, index) => {
          const offset = ((index - currentIndex) % cards.length);
          const rotate = offset * 60; // Aumentado para 60 graus
          const translateZ = Math.abs(offset) * -200; // Aumentado para -200

          return (
            <motion.div
              key={card.id}
              animate={{
                rotateY: rotate,
                translateZ,
                opacity: Math.abs(offset) > 1 ? 0 : 1,
              }}
              transition={{
                duration: 0.8,
                ease: [0.4, 0.0, 0.2, 1], // Easing customizado
              }}
              className="absolute w-[400px] h-[500px] rounded-[3rem] bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden"
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1000px) rotateY(${rotate}deg) translateZ(${translateZ}px)`,
              }}
            >
              {/* Efeito de reflexo superior */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent h-1/2 pointer-events-none" />
              
              {/* Linha de brilho horizontal */}
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-blue-400/30 blur-[2px]" />
              
              {/* Conteúdo */}
              <div className="relative z-10 h-full flex flex-col justify-between p-10">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
                  {card.title}
                </h3>
                <p className="text-lg text-blue-200/90 font-light">
                  {card.content}
                </p>
              </div>

              {/* Efeito de brilho nos cantos */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
