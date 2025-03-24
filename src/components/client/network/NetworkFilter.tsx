
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { FixNetworkButton } from "./FixNetworkButton";

interface NetworkFilterProps {
  selectedLevel: string;
  onLevelChange: (level: string) => void;
}

export const NetworkFilter = ({ selectedLevel, onLevelChange }: NetworkFilterProps) => {
  const { data: profile } = useProfile();
  
  return (
    <Card className="shadow-md bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-center text-lg font-semibold">Filtro de Níveis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          variant={selectedLevel === "all" ? "default" : "outline"}
          onClick={() => onLevelChange("all")}
          className="w-full justify-start"
        >
          Todos os Níveis
        </Button>
        
        <Button
          variant={selectedLevel === "1" ? "default" : "outline"}
          onClick={() => onLevelChange("1")}
          className="w-full justify-start"
        >
          1º Nível
        </Button>
        
        <Button
          variant={selectedLevel === "2" ? "default" : "outline"}
          onClick={() => onLevelChange("2")}
          className="w-full justify-start"
        >
          2º Nível
        </Button>
        
        <Button
          variant={selectedLevel === "3" ? "default" : "outline"}
          onClick={() => onLevelChange("3")}
          className="w-full justify-start"
        >
          3º Nível
        </Button>
        
        <Button
          variant={selectedLevel === "4" ? "default" : "outline"}
          onClick={() => onLevelChange("4")}
          className="w-full justify-start"
        >
          4º Nível
        </Button>

        <div className="pt-3 border-t border-gray-200">
          {profile?.id && <FixNetworkButton userId={profile.id} />}
        </div>
      </CardContent>
    </Card>
  );
};
