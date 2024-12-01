import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/integrations/supabase/types";

type Profile = Tables<"profiles">;

interface ProfileCardProps {
  profile: Profile & { 
    sponsor?: { 
      id: string;
      full_name: string | null;
      email: string;
    } | null;
  };
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações Pessoais</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Nome:</span>{" "}
            {profile?.full_name || "Não informado"}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {profile?.email || "Não informado"}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span className="capitalize">{profile?.status || "Pendente"}</span>
          </p>
          <p>
            <span className="font-semibold">Patrocinador:</span>{" "}
            {profile?.sponsor?.full_name || "Não possui"}
          </p>
          {profile?.custom_id && (
            <p>
              <span className="font-semibold">ID Personalizado:</span>{" "}
              {profile.custom_id}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};