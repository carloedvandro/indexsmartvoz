import { motion } from "framer-motion";
import { Share2 } from "lucide-react";

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
      corFundo: "bg-gradient-to-br from-orange-400 to-orange-600",
      borda: "border-orange-500"
    },
    {
      titulo: "Nível 2",
      quantidade: networkStats?.level2Count || 0,
      tipo: "Indicados Indiretos",
      corTexto: "text-white",
      corFundo: "bg-gradient-to-br from-purple-400 to-purple-600",
      borda: "border-purple-500"
    },
    {
      titulo: "Nível 3",
      quantidade: networkStats?.level3Count || 0,
      tipo: "Indicados Indiretos",
      corTexto: "text-white",
      corFundo: "bg-gradient-to-br from-blue-400 to-blue-600",
      borda: "border-blue-500"
    },
    {
      titulo: "Nível 4",
      quantidade: networkStats?.level4Count || 0,
      tipo: "Indicados Indiretos",
      corTexto: "text-white",
      corFundo: "bg-gradient-to-br from-pink-400 to-pink-600",
      borda: "border-pink-500"
    }
  ];

  return (
    <div onClick={onClick} className="h-full cursor-pointer hover:opacity-95 transition-opacity">
      <div className="bg-transparent rounded-xl p-6 w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Share2 className="text-amber-400 w-6 h-6" />
          <h2 className="text-xl font-extrabold text-gray-800 drop-shadow">Minha Rede</h2>
        </div>
        <p className="text-center text-gray-500 text-base mb-6">Total de Indicados: {totalMembers}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
             style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
          {niveis.map((nivel, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative p-6 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.35)] ${nivel.corFundo} ${nivel.borda} border-[6px] overflow-hidden backdrop-blur-[2px]`}
            >
              <div className="absolute -inset-px rounded-2xl border-4 border-white border-opacity-30 animate-pulse"></div>
              <h3 className={`text-lg font-extrabold mb-1 relative z-10 ${nivel.corTexto}`}>{nivel.titulo}</h3>
              <p className={`text-5xl font-black drop-shadow-lg relative z-10 ${nivel.corTexto}`}>{nivel.quantidade}</p>
              <p className={`text-sm mt-1 relative z-10 ${nivel.corTexto}`}>{nivel.tipo}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};