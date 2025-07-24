
import { motion } from 'framer-motion';

export const NetworkStatsGrid = () => {
  const niveis = [
    { numero: "1º", cor: "from-orange-500 to-pink-500" },
    { numero: "2º", cor: "from-purple-500 to-indigo-500" },
    { numero: "3º", cor: "from-blue-500 to-cyan-500" },
    { numero: "4º", cor: "from-pink-500 to-red-500" },
  ];

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      {niveis.map((nivel, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className={`relative w-32 h-20 rounded-2xl bg-white shadow-xl flex items-center justify-center overflow-hidden`}
        >
          <div
            className={`absolute left-0 top-0 h-full w-2 rounded-l-2xl bg-gradient-to-b ${nivel.cor}`}
          />
          <span className="text-3xl font-extrabold text-gray-800 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)]">
            {nivel.numero}
          </span>
        </motion.div>
      ))}
    </div>
  );
};
