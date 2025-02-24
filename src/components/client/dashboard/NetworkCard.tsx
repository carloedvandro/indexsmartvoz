
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      </CardContent>
    </Card>
  );
};
