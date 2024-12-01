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
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle>Minha Rede</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-600">Nível 1</p>
            <p className="text-2xl font-bold text-blue-700">{networkStats?.level1Count || 0}</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-600">Nível 2</p>
            <p className="text-2xl font-bold text-green-700">{networkStats?.level2Count || 0}</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-600">Nível 3</p>
            <p className="text-2xl font-bold text-purple-700">{networkStats?.level3Count || 0}</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <p className="text-sm text-orange-600">Nível 4</p>
            <p className="text-2xl font-bold text-orange-700">{networkStats?.level4Count || 0}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};