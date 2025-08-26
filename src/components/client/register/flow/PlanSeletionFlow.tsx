import { PlansSection } from "@/components/store/PlansSection";
import { FlowProps } from "@/hooks/useFlowRegisterUser";

export default function PlanSelectionFlow({ onComplete }: FlowProps) {
  const handleSelectPlan = (plan) => {
    onComplete({
      planSeleted: plan,
    });
  };

  return <PlansSection onSelectPlan={handleSelectPlan} />;
}
