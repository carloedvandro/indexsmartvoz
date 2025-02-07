
import { UserFormTabs } from "../UserFormTabs";
import { PasswordManagement } from "./PasswordManagement";

interface UserFormFieldsProps {
  register: any;
  setValue: any;
  watch: any;
  user: any;
  initialPassword: string;
  setInitialPassword: (password: string) => void;
}

export function UserFormFields({
  register,
  setValue,
  watch,
  user,
  initialPassword,
  setInitialPassword
}: UserFormFieldsProps) {
  const readOnly = !!user?.id;

  return (
    <div className="space-y-4">
      <UserFormTabs 
        register={register} 
        setValue={setValue} 
        watch={watch}
        readOnly={readOnly}
      />
      {user?.id && (
        <PasswordManagement
          user={user}
          initialPassword={initialPassword}
          setInitialPassword={setInitialPassword}
        />
      )}
    </div>
  );
}
