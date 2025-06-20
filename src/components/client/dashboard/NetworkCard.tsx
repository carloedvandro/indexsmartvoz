import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNetworkStats } from "@/hooks/useNetworkStats";
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
        <div className="grid grid-cols-1 gap-4">
          <div className="p-4 bg-red-50 rounded-lg text-center">
            <p className="text-sm text-red-600 font-medium">Nível 1</p>
            <p className="text-2xl font-bold text-red-700">{networkStats?.level1Count || 0}</p>
            <p className="text-xs text-red-600">Indicados Diretos</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <p className="text-sm text-green-600 font-medium">Nível 2</p>
            <p className="text-2xl font-bold text-green-700">{networkStats?.level2Count || 0}</p>
            <p className="text-xs text-green-600">Indicados Indiretos</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg text-center">
            <p className="text-sm text-purple-600 font-medium">Nível 3</p>
            <p className="text-2xl font-bold text-purple-700">{networkStats?.level3Count || 0}</p>
            <p className="text-xs text-purple-600">Indicados Indiretos</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg text-center">
            <p className="text-sm text-orange-600 font-medium">Nível 4</p>
            <p className="text-2xl font-bold text-orange-700">{networkStats?.level4Count || 0}</p>
            <p className="text-xs text-orange-600">Indicados Indiretos</p>
          </div>
        </div>
      </div>
    </div>;
};