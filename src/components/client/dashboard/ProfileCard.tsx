import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tables } from "@/integrations/supabase/types";
import { Users } from "lucide-react";
import { useNetworkStats } from "@/hooks/useNetworkStats";

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
  const profileImage = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7";
  const { data: networkStats } = useNetworkStats(profile?.id);

  const totalNetworkSize = networkStats ? 
    networkStats.level1Count + networkStats.level2Count + networkStats.level3Count + networkStats.level4Count : 
    0;

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-col items-center space-y-0.5 py-4 px-0">
        <Avatar className="h-16 w-16">
          <AvatarImage src={profileImage} alt={profile?.full_name || "Profile"} />
          <AvatarFallback>
            <Users className="h-8 w-8" />
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h3 className="text-xl font-semibold">{profile?.full_name || "Não informado"}</h3>
          <p className="text-sm text-muted-foreground break-all">{profile?.email || "Não informado"}</p>
        </div>
      </CardHeader>
      <CardContent className="py-4 px-0">
        <div className="space-y-1">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Plano Atual</p>
              <p className="font-medium">160-GB</p>
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};