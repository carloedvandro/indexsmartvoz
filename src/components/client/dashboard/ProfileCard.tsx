import { Card, CardContent } from "@/components/ui/card";
import { ProfileAvatar } from "./profile/ProfileAvatar";
import { ProfileStats } from "./profile/ProfileStats";
import { StoreUrlEditor } from "./profile/StoreUrlEditor";
import { Tables } from "@/integrations/supabase/types";

interface ProfileCardProps {
  profile: Tables<"profiles">;
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <Card className="h-full">
      <CardContent className="flex flex-col items-center space-y-4 pt-12">
        <div className="flex flex-col items-center space-y-0.5 py-12 px-0">
          <ProfileAvatar
            profileImage={profile?.facial_validation_image || "/placeholder.svg"}
            fullName={profile?.full_name}
            isActive={profile?.status === "active"}
          />
          <h3 className="text-lg font-semibold">{profile?.full_name || "Sem nome"}</h3>
          <p className="text-sm text-muted-foreground">{profile?.email}</p>
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800 capitalize">
            {profile?.status || "Pendente"}
          </span>
        </div>
        <ProfileStats profileId={profile?.id} />
        <StoreUrlEditor profileId={profile?.id} initialStoreUrl={profile?.store_url || ""} />
      </CardContent>
    </Card>
  );
};