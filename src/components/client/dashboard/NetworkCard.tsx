
import { NetworkStats } from "@/hooks/useNetworkStats";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { RotatingCube } from "../network/RotatingCube";

interface NetworkCardProps {
  networkStats?: NetworkStats;
  onClick?: () => void;
}

export const NetworkCard = ({ networkStats, onClick }: NetworkCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate("/client/network");
    }
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex items-center gap-2">
          <RotatingCube size={40} />
          <h2 className="text-2xl font-bold">Minha Rede</h2>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Total de Indicados: {networkStats?.totalMembers || 0}
        </p>

        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((level) => {
            const indicateText = level === 1 ? "Diretos" : "Indiretos";
            const levelColor = 
              level === 1 ? "rgb(255, 235, 235)" : 
              level === 2 ? "rgb(235, 255, 235)" :
              level === 3 ? "rgb(245, 235, 255)" :
              "rgb(255, 245, 235)";
            const textColor = 
              level === 1 ? "rgb(239, 68, 68)" : 
              level === 2 ? "rgb(34, 197, 94)" :
              level === 3 ? "rgb(168, 85, 247)" :
              "rgb(249, 115, 22)";

            return (
              <div
                key={level}
                className="p-4 rounded-lg"
                style={{ backgroundColor: levelColor }}
              >
                <h3 className="font-semibold mb-1" style={{ color: textColor }}>
                  Nível {level}
                </h3>
                <p className="text-2xl font-bold mb-1">
                  {networkStats?.[`level${level}Count`] || 0}
                </p>
                <p className="text-sm text-gray-600">
                  Indicados {indicateText}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
