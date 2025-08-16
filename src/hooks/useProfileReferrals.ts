
import { ProfileReferral, CreateProfileReferral } from "@/types/database";
import { useCrudOperations } from "./useCrudOperations";

export const useProfileReferrals = () => {
  return useCrudOperations<ProfileReferral, CreateProfileReferral, Partial<ProfileReferral>>({
    tableName: 'profile_referrals',
    queryKey: 'profileReferrals',
    profileField: 'sponsor_profile_id',
  });
};
