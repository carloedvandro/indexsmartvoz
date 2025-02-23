
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Carousel3D = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "/lovable-uploads/2135596e-e14c-4f27-88eb-69f97ec9ec7e.png",
    // Adicione mais URLs de imagens aqui se necessário
  ];

  const cards = [
    { rotation: -30, z: -100 },
    { rotation: 0, z: 0 },
    { rotation: 30, z: -100 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-gradient-to-b from-blue-950 to-black p-10">
      {/* Efeito de luz neon central */}
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute h-full w-full rounded-full bg-blue-500 opacity-20 blur-xl" />
        <div className="absolute h-1 w-40 bg-blue-500 left-0 top-1/2 -translate-y-1/2">
          <div className="absolute h-full w-full bg-blue-500 blur-md" />
        </div>
      </div>

      {/* Container do carrossel */}
      <div className="relative h-full w-full perspective-1000">
        <div className="relative h-full w-full transform-style-3d">
          {cards.map((card, index) => {
            const adjustedIndex = (currentIndex + index) % cards.length;
            return (
              <motion.div
                key={index}
                className="absolute left-1/2 top-1/2 h-[500px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-[40px] bg-white/10 backdrop-blur-md"
                initial={false}
                animate={{
                  rotateY: `${card.rotation}deg`,
                  z: card.z,
                  opacity: adjustedIndex === 1 ? 1 : 0.6,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                }}
              >
                {/* Borda brilhante */}
                <div className="absolute inset-0 rounded-[40px] border border-blue-500/30" />
                
                {/* Luzes de acento */}
                <div className="absolute -top-2 left-1/2 h-4 w-1 -translate-x-1/2 bg-blue-500 blur-sm" />
                <div className="absolute -bottom-2 left-1/2 h-4 w-1 -translate-x-1/2 bg-blue-500 blur-sm" />
                
                {/* Conteúdo do card */}
                <div className="flex h-full w-full items-center justify-center text-white">
                  <span className="text-2xl font-light">Card {index + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
