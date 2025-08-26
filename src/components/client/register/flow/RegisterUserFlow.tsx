import { FlowProps } from "@/hooks/useFlowRegisterUser";
import { StepFormContainer } from "../StepFormContainer";

export default function RegisterUserFlow({ onBack, onComplete }: FlowProps) {
  const handleSelectPlan = (plan) => {
    onComplete({
      planSeleted: plan,
    });
  };
  return (
    <div className="w-full mx-auto max-w-md">
      <StepFormContainer onBack={onBack} onComplete={onComplete} />
    </div>
  );
}
