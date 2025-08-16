
import { ProfileAddress, CreateProfileAddress, UpdateProfileAddress } from "@/types/database";
import { useCrudOperations } from "./useCrudOperations";

export const useProfileAddresses = () => {
  return useCrudOperations<ProfileAddress, CreateProfileAddress, UpdateProfileAddress>({
    tableName: 'profile_addresses',
    queryKey: 'profileAddresses',
    profileField: 'profile_id',
  });
};
