
import { ProfileBankAccount, CreateProfileBankAccount, UpdateProfileBankAccount } from "@/types/database";
import { useCrudOperations } from "./useCrudOperations";

export const useProfileBankAccounts = () => {
  return useCrudOperations<ProfileBankAccount, CreateProfileBankAccount, UpdateProfileBankAccount>({
    tableName: 'profile_bank_accounts',
    queryKey: 'profileBankAccounts',
    profileField: 'profile_id',
  });
};
