
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { FixNetworkButton } from "./FixNetworkButton";
import { RefreshCw, WrenchIcon } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface NetworkFilterProps {
  selectedLevel: string;
  onLevelChange: (level: string) => void;
}

export const NetworkFilter = ({ selectedLevel, onLevelChange }: NetworkFilterProps) => {
  const { data: profile } = useProfile();
  const queryClient = useQueryClient();
  
  const handleFixNetwork = () => {
    if (!profile?.id) {
      toast.error("Perfil não encontrado. Faça login novamente.");
      return;
    }
    
    toast.info("Verificando e corrigindo relações de rede...");
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['networkData', profile.id] });
    }, 500);
  };
  
  const handleRefresh = () => {
    if (profile?.id) {
      queryClient.invalidateQueries({ queryKey: ['networkData', profile.id] });
      toast.success("Atualizando dados da rede...");
    }
  };
  
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

        <div className="pt-3 border-t border-gray-200 space-y-3">
          {profile?.id && (
            <>
              <FixNetworkButton 
                userId={profile.id} 
                className="w-full flex items-center gap-2" 
              />
              
              <Button 
                variant="outline"
                className="w-full flex items-center gap-2"
                onClick={handleRefresh}
              >
                <RefreshCw className="h-4 w-4" />
                Atualizar Rede
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
