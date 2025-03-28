
import { ProfileWithSponsor } from "@/types/profile";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "./useSession";
import { fetchProfile } from "@/services/profileService";

export const useProfile = () => {
  const { getSession } = useSession();

  return useQuery<ProfileWithSponsor | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      const session = await getSession();
      if (!session?.user) return null;
      
      return fetchProfile(session.user.id);
    },
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: true,
  });
};
