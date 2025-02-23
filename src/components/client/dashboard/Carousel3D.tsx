
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const cards = [
  {
    id: 1,
    title: "Soluções Inteligentes",
    content: "Inovação em cada detalhe",
  },
  {
    id: 2,
    title: "Tecnologia Avançada",
    content: "O futuro ao seu alcance",
  },
  {
    id: 3,
    title: "Conectividade Total",
    content: "Sempre conectado",
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
    <div className="relative h-[400px] w-full bg-gradient-to-b from-blue-950 to-black overflow-hidden">
      {/* Efeito de luz azul */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
      
      <div className="relative w-full h-full flex items-center justify-center perspective-1000">
        {cards.map((card, index) => {
          const offset = ((index - currentIndex) % cards.length);
          const rotate = offset * 45;
          const translateZ = Math.abs(offset) * -100;

          return (
            <motion.div
              key={card.id}
              animate={{
                rotateY: rotate,
                translateZ,
                opacity: Math.abs(offset) > 1 ? 0 : 1,
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              className="absolute w-[300px] h-[400px] rounded-[2rem] bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-6 shadow-xl"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Linha luminosa azul */}
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-blue-500/50 blur-sm" />
              
              <div className="relative z-10 h-full flex flex-col justify-between text-white">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  {card.title}
                </h3>
                <p className="text-blue-200/80">{card.content}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
