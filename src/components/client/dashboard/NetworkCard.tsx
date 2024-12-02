import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow h-full rounded-none"
      onClick={onClick}
    >
      <CardHeader className="pb-0.5 space-y-0 p-2">
        <CardTitle className="text-center">Minha Rede</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="grid grid-cols-2 gap-0.5">
          <div className="p-0.5 bg-red-50 rounded-lg text-center">
            <p className="text-sm text-red-600">Nível 1</p>
            <p className="text-2xl font-bold text-red-700">{networkStats?.level1Count || 0}</p>
          </div>
          <div className="p-0.5 bg-green-50 rounded-lg text-center">
            <p className="text-sm text-green-600">Nível 2</p>
            <p className="text-2xl font-bold text-green-700">{networkStats?.level2Count || 0}</p>
          </div>
          <div className="p-0.5 bg-purple-50 rounded-lg text-center">
            <p className="text-sm text-purple-600">Nível 3</p>
            <p className="text-2xl font-bold text-purple-700">{networkStats?.level3Count || 0}</p>
          </div>
          <div className="p-0.5 bg-orange-50 rounded-lg text-center">
            <p className="text-sm text-orange-600">Nível 4</p>
            <p className="text-2xl font-bold text-orange-700">{networkStats?.level4Count || 0}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};