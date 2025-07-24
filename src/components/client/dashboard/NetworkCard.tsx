import { motion } from "framer-motion";
import { Users } from "lucide-react";

interface NetworkCardProps {
  networkStats: {
    level1Count: number;
    level2Count: number;
    level3Count: number;
    level4Count: number;
  };
  onClick: () => void;
}

export const NetworkCard = ({
  networkStats,
  onClick
}: NetworkCardProps) => {
  const totalMembers = (networkStats?.level1Count || 0) + (networkStats?.level2Count || 0) + (networkStats?.level3Count || 0) + (networkStats?.level4Count || 0);
  
  const niveis = [
    {
      titulo: "Nível 1",
      quantidade: networkStats?.level1Count || 0,
      tipo: "Indicados Diretos",
      corTexto: "text-white",
      corFundo: "bg-gradient-to-br from-yellow-400 to-red-500",
      borda: "border-yellow-300"
    },
    {
      titulo: "Nível 2",
      quantidade: networkStats?.level2Count || 0,
      tipo: "Indicados Indiretos",
      corTexto: "text-white",
      corFundo: "bg-gradient-to-br from-green-400 to-lime-600",
      borda: "border-lime-300"
    },
    {
      titulo: "Nível 3",
      quantidade: networkStats?.level3Count || 0,
      tipo: "Indicados Indiretos",
      corTexto: "text-white",
      corFundo: "bg-gradient-to-br from-blue-400 to-cyan-600",
      borda: "border-cyan-300"
    },
    {
      titulo: "Nível 4",
      quantidade: networkStats?.level4Count || 0,
      tipo: "Indicados Indiretos",
      corTexto: "text-white",
      corFundo: "bg-gradient-to-br from-pink-400 to-fuchsia-600",
      borda: "border-fuchsia-300"
    }
  ];

  return (
    <div onClick={onClick} className="h-full cursor-pointer hover:opacity-95 transition-opacity">
      <div className="bg-black bg-opacity-80 rounded-xl shadow-inner p-6 w-full max-w-5xl mx-auto border border-gray-700">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Users className="text-yellow-400 w-6 h-6" />
          <h2 className="text-xl font-extrabold text-white drop-shadow">Minha Rede</h2>
        </div>
        <p className="text-center text-gray-300 text-base mb-6">Total de Indicados: {totalMembers}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {niveis.map((nivel, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative p-6 rounded-2xl shadow-2xl ${nivel.corFundo} ${nivel.borda} border-4 overflow-hidden`}
            >
              <div className="absolute -top-4 -left-4 bg-black text-yellow-300 rounded-full border border-yellow-400 w-10 h-10 flex items-center justify-center font-bold text-sm shadow-md">
                {index + 1}°
              </div>
              <h3 className={`text-lg font-extrabold mb-1 ${nivel.corTexto}`}>{nivel.titulo}</h3>
              <p className={`text-5xl font-black drop-shadow-lg ${nivel.corTexto}`}>{nivel.quantidade}</p>
              <p className={`text-sm mt-1 ${nivel.corTexto}`}>{nivel.tipo}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};