
import { ProfileWithSponsor } from "@/types/profile";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "./useSession";
import { fetchProfileNew } from "@/services/profileServiceNew";

export const useProfileNew = () => {
  const { getSession } = useSession();

  return useQuery<ProfileWithSponsor | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      const session = await getSession();
      if (!session?.user) return null;
      
      return fetchProfileNew(session.user.id);
    },
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: true,
  });
};
