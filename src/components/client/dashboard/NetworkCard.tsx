import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { motion } from "framer-motion";
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
  return <div onClick={onClick} className="h-full cursor-pointer hover:opacity-95 transition-opacity">
      <div className="pb-2 space-y-0 py-2 bg-transparent pt-5">
        <div className="text-center flex items-center justify-center gap-2">
          <img src="/lovable-uploads/45e4529e-207c-4c72-bcc0-c0466235e892.png" alt="Rede" className="h-6 w-6 object-contain" style={{
          filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.1))"
        }} />
          <span className="text-lg font-medium">Minha Rede</span>
        </div>
        <p className="text-center text-muted-foreground text-base mt-1">
          Total de Indicados: {totalMembers}
        </p>
      </div>
      <div className="py-2 bg-transparent pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0 * 0.2
        }} className="relative rounded-lg px-4 py-4 border-2 border-yellow-200 bg-gradient-to-br from-yellow-100 to-yellow-50 shadow-xl overflow-hidden hover:scale-[1.03] transition-transform duration-500">
            <div className="absolute inset-0 rounded-lg border border-white/40 pointer-events-none z-0" />
            <div className="relative z-10">
              <h3 className="text-left text-lg font-bold text-black drop-shadow-md mb-2">Nível 1</h3>
              <p className="text-left text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-black to-neutral-600 drop-shadow-[2px_3px_3px_rgba(0,0,0,0.3)]">
                {networkStats?.level1Count || 0}
              </p>
              <p className="text-left text-sm font-medium text-black/70 mt-2">Indicados Diretos</p>
            </div>
          </motion.div>
          
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 1 * 0.2
        }} className="relative rounded-lg px-6 py-4 border-2 border-lime-200 bg-gradient-to-br from-lime-100 to-green-50 shadow-xl overflow-hidden hover:scale-[1.03] transition-transform duration-500">
            <div className="absolute inset-0 rounded-lg border border-white/40 pointer-events-none z-0" />
            <div className="relative z-10">
              <h3 className="text-left text-lg font-bold text-black drop-shadow-md mb-2">Nível 2</h3>
              <p className="text-left text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-black to-neutral-600 drop-shadow-[2px_3px_3px_rgba(0,0,0,0.3)]">
                {networkStats?.level2Count || 0}
              </p>
              <p className="text-left text-sm font-medium text-black/70 mt-2">Indicados Indiretos</p>
            </div>
          </motion.div>
          
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 2 * 0.2
        }} className="relative rounded-lg px-6 py-4 border-2 border-sky-200 bg-gradient-to-br from-sky-100 to-blue-50 shadow-xl overflow-hidden hover:scale-[1.03] transition-transform duration-500">
            <div className="absolute inset-0 rounded-lg border border-white/40 pointer-events-none z-0" />
            <div className="relative z-10">
              <h3 className="text-left text-lg font-bold text-black drop-shadow-md mb-2">Nível 3</h3>
              <p className="text-left text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-black to-neutral-600 drop-shadow-[2px_3px_3px_rgba(0,0,0,0.3)]">
                {networkStats?.level3Count || 0}
              </p>
              <p className="text-left text-sm font-medium text-black/70 mt-2">Indicados Indiretos</p>
            </div>
          </motion.div>
          
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 3 * 0.2
        }} className="relative rounded-lg px-6 py-4 border-2 border-pink-200 bg-gradient-to-br from-pink-100 to-pink-50 shadow-xl overflow-hidden hover:scale-[1.03] transition-transform duration-500">
            <div className="absolute inset-0 rounded-lg border border-white/40 pointer-events-none z-0" />
            <div className="relative z-10">
              <h3 className="text-left text-lg font-bold text-black drop-shadow-md mb-2">Nível 4</h3>
              <p className="text-left text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-black to-neutral-600 drop-shadow-[2px_3px_3px_rgba(0,0,0,0.3)]">
                {networkStats?.level4Count || 0}
              </p>
              <p className="text-left text-sm font-medium text-black/70 mt-2">Indicados Indiretos</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>;
};