
import { Progress } from "@/components/ui/progress";

interface StepIndicatorProps {
  step: number;
}

export function StepIndicator({ step }: StepIndicatorProps) {
  const progressValue = (step / 4) * 100;

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2">ATIVAÇÃO DE ESIM</h2>
      <div className="flex items-center justify-between mb-2 text-sm">
        <span>Identidade</span>
        <span>Sistema</span>
        <span>IMEI</span>
        <span>EID</span>
      </div>
      <Progress value={progressValue} className="h-2" />
    </div>
  );
}

