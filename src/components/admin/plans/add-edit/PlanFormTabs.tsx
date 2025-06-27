
import { usePlanForm } from "./PlanFormProvider";
import { BasicInfoTab } from "./tabs/BasicInfoTab";
import { CashbackLevelsTab } from "./tabs/CashbackLevelsTab";
import { BenefitsTab } from "./tabs/BenefitsTab";

export function PlanFormTabs() {
  const { activeTab } = usePlanForm();

  switch (activeTab) {
    case 'informacoes':
      return <BasicInfoTab />;
    case 'niveis':
      return <CashbackLevelsTab />;
    case 'beneficios':
      return <BenefitsTab />;
    default:
      return <BasicInfoTab />;
  }
}
