import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  // Placeholder image from Unsplash
  const profileImage = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7";
  const { data: networkStats } = useNetworkStats(profile?.id);

  // Calculate total network size
  const totalNetworkSize = networkStats ? 
    networkStats.level1Count + networkStats.level2Count + networkStats.level3Count + networkStats.level4Count : 
    0;

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={profileImage} alt={profile?.full_name || "Profile"} />
          <AvatarFallback>
            <Users className="h-8 w-8" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-xl">{profile?.full_name || "Não informado"}</CardTitle>
          <span className="text-sm text-muted-foreground break-all">{profile?.email || "Não informado"}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-sm font-semibold text-muted-foreground">Plano Atual</span>
              <p className="text-sm">160-GB</p>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-semibold text-muted-foreground">Pontos</span>
              <p className="text-sm">0</p>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-semibold text-muted-foreground">Equipe</span>
              <p className="text-sm">{totalNetworkSize}</p>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-semibold text-muted-foreground">Status</span>
              <p className="text-sm capitalize">{profile?.status || "Pendente"}</p>
            </div>
          </div>
          
          <div className="pt-2 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1">
              <span className="text-sm font-semibold">Patrocinador:</span>
              <span className="text-sm">
                {profile?.sponsor?.full_name || "Não possui"}
                {profile?.sponsor?.custom_id && ` (ID: ${profile.sponsor.custom_id})`}
              </span>
            </div>
            {profile?.custom_id && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                <span className="text-sm font-semibold">ID Personalizado:</span>
                <span className="text-sm">{profile.custom_id}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};