
import { ProfileAvatar } from "./profile/ProfileAvatar";
import { Badge } from "@/components/ui/badge";
import { Tables } from "@/integrations/supabase/types";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  const [directCount, setDirectCount] = useState(0);
  const [teamCount, setTeamCount] = useState(0);
  
  // Use the hook to get network stats
  const { data: networkStats } = useNetworkStats(profile?.id);
  
  // Fetch direct and team counts
  useEffect(() => {
    if (profile?.id) {
      fetchNetworkCounts(profile.id);
    }
  }, [profile?.id]);
  
  const fetchNetworkCounts = async (userId: string) => {
    try {
      // Get user's network ID
      const { data: networkData } = await supabase
        .from("network")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();
      
      if (networkData?.id) {
        // Get direct count (level 1)
        const { data: directsData, error: directsError } = await supabase
          .from("network")
          .select("count")
          .eq("parent_id", networkData.id)
          .single();
        
        if (!directsError && directsData) {
          // Make sure we're converting to number properly
          const directsCount = typeof directsData.count === 'number' 
            ? directsData.count 
            : parseInt(String(directsData.count), 10);
          
          setDirectCount(isNaN(directsCount) ? 0 : directsCount);
        } else {
          // If count doesn't work, try counting records
          const { data: directMembers, error } = await supabase
            .from("network")
            .select("id")
            .eq("parent_id", networkData.id);
          
          if (!error && directMembers) {
            setDirectCount(directMembers.length);
          }
        }
        
        // Use network stats for total team size
        if (networkStats) {
          const totalTeamSize = (networkStats.level1Count || 0) + 
                               (networkStats.level2Count || 0) +
                               (networkStats.level3Count || 0) +
                               (networkStats.level4Count || 0);
          setTeamCount(totalTeamSize);
        }
      }
    } catch (error) {
      console.error("Error fetching network counts:", error);
    }
  };

  if (!profile) {
    return null;
  }

  const profileImage = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7";
  const isActive = profile?.status === 'active';
  
  // Always show the full name from profile.full_name
  const displayName = profile?.full_name || "Nome não informado";

  return (
    <div className="flex flex-col items-center space-y-4 pt-5">
      <div className="w-full flex justify-center">
        <ProfileAvatar 
          profileImage={profileImage}
          fullName={displayName}
          isActive={isActive}
        />
      </div>
      
      <div className="text-center w-full">
        <h3 className="text-xl font-semibold">{displayName}</h3>
        <p className="text-sm text-[#0500ff] break-all">{profile?.email || "Não informado"}</p>
      </div>
      
      <div className="w-full space-y-4">
        <div className="flex justify-center gap-16">
          <div className="text-center">
            <p className="text-sm text-black">Status</p>
            <p className={`font-bold ${isActive ? 'text-green-500' : 'text-red-500'}`}>
              {isActive ? 'Ativo' : 'Pendente'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-black">Equipe</p>
            <p className="font-bold text-[#0500ff]">{teamCount}</p>
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
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mt-2">
              <img 
                src="/lovable-uploads/45e4529e-207c-4c72-bcc0-c0466235e892.png" 
                alt="Diretos" 
                className="h-5 w-5 object-contain"
              />
              <p className="font-medium">Diretos: {directCount}</p>
            </div>
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
