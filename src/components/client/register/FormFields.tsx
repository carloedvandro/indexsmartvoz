
import { UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "./RegisterSchema";
import { PersonalInfoFields } from "./fields/PersonalInfoFields";
import { ContactFields } from "./fields/ContactFields";
import { PasswordFields } from "./fields/PasswordFields";

interface FormFieldsProps {
  form: UseFormReturn<RegisterFormData>;
  disableSponsor?: boolean;
}

export const FormFields = ({ form, disableSponsor }: FormFieldsProps) => {
  return (
    <div className="space-y-4 w-full">
      <PersonalInfoFields form={form} disableSponsor={disableSponsor} />
      
      {/* Contact fields side by side */}
      <ContactFields form={form} />
      
      <PasswordFields form={form} />
    </div>
  );
};
