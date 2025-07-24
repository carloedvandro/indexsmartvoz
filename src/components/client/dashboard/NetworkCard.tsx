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
  const niveis = [{
    titulo: "Nível 1",
    quantidade: networkStats?.level1Count || 0,
    tipo: "Indicados Diretos",
    corTexto: "text-black",
    corFundo: "bg-gradient-to-br from-yellow-100 to-yellow-300",
    borda: "border-yellow-300"
  }, {
    titulo: "Nível 2",
    quantidade: networkStats?.level2Count || 0,
    tipo: "Indicados Indiretos",
    corTexto: "text-black",
    corFundo: "bg-gradient-to-br from-lime-100 to-green-300",
    borda: "border-lime-300"
  }, {
    titulo: "Nível 3",
    quantidade: networkStats?.level3Count || 0,
    tipo: "Indicados Indiretos",
    corTexto: "text-black",
    corFundo: "bg-gradient-to-br from-cyan-100 to-blue-300",
    borda: "border-cyan-300"
  }, {
    titulo: "Nível 4",
    quantidade: networkStats?.level4Count || 0,
    tipo: "Indicados Indiretos",
    corTexto: "text-black",
    corFundo: "bg-gradient-to-br from-pink-100 to-fuchsia-300",
    borda: "border-fuchsia-300"
  }];
  return <div onClick={onClick} className="h-full cursor-pointer hover:opacity-95 transition-opacity">
      <div className="bg-transparent rounded-xl p-6 w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Users className="text-yellow-400 w-6 h-6" />
          <h2 className="text-xl font-extrabold text-white drop-shadow">Minha Rede</h2>
        </div>
        <p className="text-center text-white font-semibold text-base mb-6 animate-pulse">Total de Indicados: {totalMembers}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {niveis.map((nivel, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: index * 0.2
        }} className={`relative p-6 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.35)] ${nivel.corFundo} ${nivel.borda} border-[6px] overflow-hidden backdrop-blur-[2px]`}>
              <div className="absolute inset-0 rounded-2xl border-4 border-white/30 pointer-events-none"></div>
              <h3 className={`text-lg font-extrabold mb-1 relative z-10 ${nivel.corTexto}`}>{nivel.titulo}</h3>
              <p className={`text-5xl font-black drop-shadow-lg relative z-10 ${nivel.corTexto}`}>{nivel.quantidade}</p>
              <p className={`text-sm mt-1 relative z-10 ${nivel.corTexto}`}>{nivel.tipo}</p>
            </motion.div>)}
        </div>
      </div>
    </div>;
};