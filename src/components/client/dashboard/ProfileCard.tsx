import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Informações Pessoais</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <span className="text-sm font-semibold">Nome:</span>
            <span className="text-sm">{profile?.full_name || "Não informado"}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <span className="text-sm font-semibold">Email:</span>
            <span className="text-sm break-all">{profile?.email || "Não informado"}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <span className="text-sm font-semibold">Status:</span>
            <span className="text-sm capitalize">{profile?.status || "Pendente"}</span>
          </div>
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
      </CardContent>
    </Card>
  );
};