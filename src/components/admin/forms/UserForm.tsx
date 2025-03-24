
import { UserFormTabs } from "../UserFormTabs";

interface UserFormProps {
  register: any;
  setValue: any;
  watch: any;
  userId?: string;
  userEmail?: string;
}

export function UserForm({ 
  register, 
  setValue, 
  watch, 
  userId 
}: UserFormProps) {
  const readOnly = !!userId;

  return (
    <UserFormTabs 
      register={register} 
      setValue={setValue} 
      watch={watch} 
      readOnly={readOnly}
    />
  );
}
