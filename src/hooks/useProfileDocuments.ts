
import { ProfileDocument, CreateProfileDocument, UpdateProfileDocument } from "@/types/database";
import { useCrudOperations } from "./useCrudOperations";

export const useProfileDocuments = () => {
  return useCrudOperations<ProfileDocument, CreateProfileDocument, UpdateProfileDocument>({
    tableName: 'profile_document',
    queryKey: 'profileDocuments',
    profileField: 'profile_id',
  });
};
