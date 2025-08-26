import DDDSeletionFlow from "@/components/client/register/flow/DDDSeletionFlow";
import PlanSelectionFlow from "@/components/client/register/flow/PlanSeletionFlow";
import RegisterUserFlow from "@/components/client/register/flow/RegisterUserFlow";
import RegiterFlowHeader from "@/components/client/register/flow/RegiterFlowHeader";
import { RegisterFormContainer } from "@/components/client/register/RegisterFormContainer";
import { useFlowRegisterUser } from "@/hooks/useFlowRegisterUser";

export default function RegisterFlow() {
  const { currentFlow, flowData, navigateToFlow } = useFlowRegisterUser();

  const renderCurrentFlow = () => {
    switch (currentFlow) {
      case "plan-selection":
        return (
          <PlanSelectionFlow
            onComplete={(data) => navigateToFlow("ddd-selection", data)}
            onBack={() => navigateToFlow("plan-selection")}
          />
        );

      case "ddd-selection":
        return (
          <DDDSeletionFlow
            flowData={flowData}
            onComplete={(data) => navigateToFlow("register-user", data)}
            onBack={() => navigateToFlow("plan-selection")}
          />
        );
      case "register-user":
        return (
          <RegisterUserFlow
            onComplete={(data) => navigateToFlow("confirmation", data)}
            onBack={() => navigateToFlow("ddd-selection")}
          />
        );
    }
  };

  return (
    <div>
      <RegiterFlowHeader />
      <div>{renderCurrentFlow()}</div>
    </div>
  );
}
