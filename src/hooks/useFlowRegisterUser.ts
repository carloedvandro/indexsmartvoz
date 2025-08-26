import { Plan } from "@/types/database";
import { useState } from "react";

type FlowState =
  | "ddd-selection"
  | "plan-selection"
  | "terms-acceptance"
  | "confirmation"
  | "chip-activation"
  | "register-user"
  | "checkout"
  | "success";

interface FlowTransition {
  from: FlowState;
  to: FlowState;
  condition?: () => boolean;
}
type FlowDataType = {
  planSeleted?: Plan;
  ddd: string;
  dueData: number;
};

export interface FlowProps {
  onComplete: (data?: any) => void;
  onBack: () => void;
  flowData?: FlowDataType;
}

const flowTransitions: FlowTransition[] = [
  { from: "plan-selection", to: "ddd-selection" },
  { from: "ddd-selection", to: "confirmation" },
  { from: "confirmation", to: "terms-acceptance" },
  { from: "terms-acceptance", to: "register-user" },
  { from: "register-user", to: "checkout" },
  { from: "checkout", to: "success" },
];

export const useFlowRegisterUser = () => {
  const [currentFlow, setCurrentFlow] = useState<FlowState>("plan-selection");
  const [flowData, setFlowData] = useState<FlowDataType>({} as FlowDataType);
  const navigateToFlow = (flow: FlowState, data?: FlowDataType) => {
    if (data) {
      setFlowData((prev) => ({ ...prev, ...data }));
    }
    setCurrentFlow(flow);
  };

  return { currentFlow, flowData, navigateToFlow };
};
