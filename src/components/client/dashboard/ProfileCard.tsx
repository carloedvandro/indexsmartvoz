
import { ProfileAvatar } from "./profile/ProfileAvatar";
import { Badge } from "@/components/ui/badge";
import { Tables } from "@/integrations/supabase/types";

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
  if (!profile) {
    return null;
  }

  const profileImage = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7";
  const isActive = profile?.status === 'active';
  
  // Always show the full name from profile.full_name
  const displayName = profile?.full_name || "Nome não informado";

  return (
    <div className="flex flex-col items-center space-y-4 pt-5">
      <ProfileAvatar 
        profileImage={profileImage}
        fullName={displayName}
        isActive={isActive}
      />
      
      <div className="text-center">
        <h3 className="text-xl font-semibold">{displayName}</h3>
        <p className="text-sm text-muted-foreground break-all">{profile?.email || "Não informado"}</p>
        <Badge 
          className="mt-2" 
          variant={isActive ? "default" : "destructive"}
        >
          {profile?.status === 'active' ? 'Ativo' : 'Pendente'}
        </Badge>
      </div>
      
      <div className="w-full space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center -ml-[15px]">
            <p className="text-sm text-muted-foreground">Plano Atual</p>
            <p className="font-medium">Pago</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Equipe</p>
            <p className="font-medium">8</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="font-medium capitalize">Ativo</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Patrocinador</p>
            <p className="font-medium">
              {profile?.sponsor?.full_name || "Não possui"}
              {profile?.sponsor?.custom_id && ` (${profile.sponsor.custom_id})`}
            </p>
          </div>
          {profile?.custom_id && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">ID Personalizado</p>
              <p className="font-medium">Meu ID: {profile.custom_id}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
