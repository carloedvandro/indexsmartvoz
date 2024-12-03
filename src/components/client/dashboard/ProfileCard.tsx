import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tables } from "@/integrations/supabase/types";
import { Users, UserCheck, UserX, Link as LinkIcon } from "lucide-react";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { updateProfile } from "@/components/admin/UserFormUtils";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

type Profile = Tables<"profiles">;

interface ProfileCardProps {
  profile: Profile & { 
    sponsor?: { 
      id: string;
      full_name: string | null;
      email: string;
      custom_id: string | null;
    } | null;
  };
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [storeUrl, setStoreUrl] = useState(profile?.store_url || '');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const profileImage = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7";
  const { data: networkStats } = useNetworkStats(profile?.id);
  const isActive = profile?.status === 'active';

  const totalNetworkSize = networkStats ? 
    networkStats.level1Count + networkStats.level2Count + networkStats.level3Count + networkStats.level4Count : 
    0;

  const StatusIcon = isActive ? UserCheck : UserX;

  const handleSaveStoreUrl = async () => {
    try {
      setIsLoading(true);
      await updateProfile(profile.id, { ...profile, store_url: storeUrl });
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
      setIsEditing(false);
      toast({
        title: "URL atualizada",
        description: "A URL da sua loja foi atualizada com sucesso!",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar",
        description: error.message || "Ocorreu um erro ao atualizar a URL da loja",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-col items-center space-y-0.5 py-4 px-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="relative">
                <Avatar className={`h-16 w-16 border-2 ${isActive ? 'border-green-500' : 'border-red-500'}`}>
                  <AvatarImage src={profileImage} alt={profile?.full_name || "Profile"} />
                  <AvatarFallback>
                    <Users className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <StatusIcon 
                  className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-white p-0.5 ${
                    isActive ? 'text-green-500' : 'text-red-500'
                  }`}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isActive ? 'Ativo' : 'Pendente'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="text-center">
          <h3 className="text-xl font-semibold">{profile?.full_name || "Não informado"}</h3>
          <p className="text-sm text-muted-foreground break-all">{profile?.email || "Não informado"}</p>
          <Badge 
            className="mt-2" 
            variant={isActive ? "default" : "destructive"}
          >
            {profile?.status === 'active' ? 'Ativo' : 'Pendente'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="py-4 px-0">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Plano Atual</p>
              <p className="font-medium">Gratuito</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Pontos</p>
              <p className="font-medium">0</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Equipe</p>
              <p className="font-medium">{totalNetworkSize}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="font-medium capitalize">{profile?.status || "Pendente"}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Patrocinador</p>
              <p className="font-medium">
                {profile?.sponsor?.full_name || "Não possui"}
                {profile?.sponsor?.custom_id && ` (ID: ${profile.sponsor.custom_id})`}
              </p>
            </div>
            {profile?.custom_id && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">ID Personalizado</p>
                <p className="font-medium">{profile.custom_id}</p>
              </div>
            )}
            <div className="px-4">
              <p className="text-sm text-muted-foreground mb-2 text-center">URL da Loja</p>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Input
                      value={storeUrl}
                      onChange={(e) => setStoreUrl(e.target.value)}
                      placeholder="minha-loja"
                      className="flex-1"
                    />
                    <Button 
                      size="sm" 
                      onClick={handleSaveStoreUrl}
                      disabled={isLoading}
                    >
                      Salvar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => {
                        setStoreUrl(profile?.store_url || '');
                        setIsEditing(false);
                      }}
                      disabled={isLoading}
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex-1 flex items-center justify-center gap-2">
                      <LinkIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        {profile?.store_url || "Não configurado"}
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setIsEditing(true)}
                    >
                      Editar
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};