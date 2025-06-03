
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ProfileWithSponsor } from "@/types/profile";
import { useBankingForm } from "./hooks/useBankingForm";
import { BankingFormHeader } from "./components/BankingFormHeader";
import { BankSelectField } from "./components/BankSelectField";
import { AccountTypeField } from "./components/AccountTypeField";
import { AgencyFields } from "./components/AgencyFields";
import { AccountFields } from "./components/AccountFields";
import { PersonalInfoFields } from "./components/PersonalInfoFields";

interface BankingFormProps {
  profile: ProfileWithSponsor;
}

export function BankingForm({ profile }: BankingFormProps) {
  const { form, isSubmitting, onSubmit } = useBankingForm(profile);

  return (
    <div className="max-w-sm mx-auto px-4 py-6 mt-[5px]">
      <BankingFormHeader />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <BankSelectField control={form.control} />
            <AccountTypeField control={form.control} />
          </div>

          <AgencyFields control={form.control} />
          <AccountFields control={form.control} />
          <PersonalInfoFields control={form.control} />

          <div className="pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white h-12 text-base font-medium"
            >
              {isSubmitting ? "Salvando..." : "Salvar alterações"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
