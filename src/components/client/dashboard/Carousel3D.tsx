
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const cards = [
  {
    id: 1,
    title: "Conectividade Total",
    content: "Sempre conectado com o mundo",
  },
  {
    id: 2,
    title: "Tecnologia Avançada",
    content: "O futuro ao seu alcance hoje",
  },
  {
    id: 3,
    title: "Soluções Inteligentes",
    content: "Inovando cada experiência",
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
      {/* Efeitos de fundo dinâmicos */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
      <motion.div 
        initial={{ scale: 1 }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px]"
      />
      
      {/* Grade de luz dinâmica */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(66, 153, 225, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(66, 153, 225, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px'
      }} />

      <div className="relative w-full h-full flex items-center justify-center perspective-1000">
        {cards.map((card, index) => {
          const offset = ((index - currentIndex) % cards.length);
          const rotate = offset * 120; // Aumentado para 120 graus para formar um triângulo
          const translateZ = Math.abs(offset) * -200;
          const rotateX = offset === 0 ? 0 : 30; // Inclinar cards não ativos

          return (
            <motion.div
              key={card.id}
              animate={{
                rotateY: rotate,
                rotateX,
                translateZ,
                opacity: Math.abs(offset) > 1 ? 0 : 1,
              }}
              transition={{
                duration: 0.8,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="absolute w-[400px] h-[500px] rounded-[3rem] bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden transform-gpu"
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1000px) rotateY(${rotate}deg) rotateX(${rotateX}deg) translateZ(${translateZ}px)`,
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" // Forma de diamante
              }}
            >
              {/* Efeito de reflexo holográfico */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent h-full opacity-50 mix-blend-overlay" />
              
              {/* Linha de brilho animada */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-[2px] bg-blue-400/30 blur-[2px]"
                animate={{
                  top: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Conteúdo com efeito de profundidade */}
              <div className="relative z-10 h-full flex flex-col justify-between p-10">
                <div className="space-y-4">
                  <h3 
                    className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"
                    style={{
                      textShadow: "0 0 20px rgba(59, 130, 246, 0.2)"
                    }}
                  >
                    {card.title}
                  </h3>
                  <div className="h-[1px] w-1/3 bg-gradient-to-r from-blue-500/50 to-transparent" />
                </div>
                <div>
                  <p className="text-xl text-blue-200/90 font-light leading-relaxed">
                    {card.content}
                  </p>
                  <motion.div 
                    className="mt-6 inline-block"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="px-6 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400/90 text-sm backdrop-blur-sm">
                      Saiba mais
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Efeitos de luz nos cantos */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 blur-[50px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 blur-[50px] rounded-full" />
              
              {/* Padrão de grade sutil */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
