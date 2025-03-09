
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { StatsCard } from "@/components/ui/stats-card";

interface NetworkCardProps {
  networkStats: {
    level1Count: number;
    level2Count: number;
    level3Count: number;
    level4Count: number;
  };
  onClick: () => void;
}

export const NetworkCard = ({ networkStats, onClick }: NetworkCardProps) => {
  const totalMembers = 
    (networkStats?.level1Count || 0) + 
    (networkStats?.level2Count || 0) + 
    (networkStats?.level3Count || 0) + 
    (networkStats?.level4Count || 0);

  return (
    <Card 
      className="h-full cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <CardHeader className="pb-2 space-y-0 py-4">
        <CardTitle className="text-center flex items-center justify-center gap-2">
          <Users className="h-5 w-5" />
          Minha Rede
        </CardTitle>
        <p className="text-center text-muted-foreground text-sm">
          Total de Indicados: {totalMembers}
        </p>
      </CardHeader>
      <CardContent className="py-4">
        <div className="grid grid-cols-2 gap-4">
          <StatsCard 
            title="Nível 1" 
            value={networkStats?.level1Count || 0} 
            className="bg-white"
            color="#00ca7d"
          />
          <StatsCard 
            title="Nível 2" 
            value={networkStats?.level2Count || 0} 
            className="bg-white"
            color="#00ca7d"
          />
          <StatsCard 
            title="Nível 3" 
            value={networkStats?.level3Count || 0} 
            className="bg-white"
            color="#00ca7d"
          />
          <StatsCard 
            title="Nível 4" 
            value={networkStats?.level4Count || 0} 
            className="bg-white"
            color="#00ca7d"
          />
        </div>
      </CardContent>
    </Card>
  );
};
