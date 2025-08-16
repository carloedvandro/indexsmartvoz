
import { ProfilePayment, CreateProfilePayment, UpdateProfilePayment } from "@/types/database";
import { useCrudOperations } from "./useCrudOperations";

export const useProfilePayments = () => {
  return useCrudOperations<ProfilePayment, CreateProfilePayment, UpdateProfilePayment>({
    tableName: 'profile_payments',
    queryKey: 'profilePayments',
    profileField: 'profile_id',
  });
};
