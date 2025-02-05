
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "./esim-steps/StepIndicator";
import { ActivationTypeStep } from "./esim-steps/ActivationTypeStep";
import { SystemTypeStep } from "./esim-steps/SystemTypeStep";
import { ImeiStep } from "./esim-steps/ImeiStep";
import { EidStep } from "./esim-steps/EidStep";

interface EsimActivationFlowProps {
  onComplete: (imei: string, eid: string) => void;
}

export function EsimActivationFlow({ onComplete }: EsimActivationFlowProps) {
  const [step, setStep] = useState(1);
  const [activationType, setActivationType] = useState<'self' | 'other'>('self');
  const [systemType, setSystemType] = useState<'android' | 'ios'>('android');
  const [imei, setImei] = useState("");
  const [eid, setEid] = useState("");

  const handleContinue = () => {
    if (step === 4) {
      onComplete(imei, eid);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="w-full max-w-[380px] mx-auto space-y-6">
      <StepIndicator step={step} />

      {step === 1 && (
        <ActivationTypeStep 
          activationType={activationType}
          onTypeChange={(value) => setActivationType(value)}
        />
      )}

      {step === 2 && (
        <SystemTypeStep 
          systemType={systemType}
          onSystemTypeChange={(value) => setSystemType(value)}
        />
      )}

      {step === 3 && (
        <ImeiStep 
          imei={imei}
          onImeiChange={setImei}
        />
      )}

      {step === 4 && (
        <EidStep 
          eid={eid}
          onEidChange={setEid}
        />
      )}

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={() => setStep(Math.max(1, step - 1))}
          className="border-[#8425af] text-[#8425af] hover:bg-[#8425af] hover:text-white"
        >
          Voltar
        </Button>

        <Button
          onClick={handleContinue}
          className="bg-[#8425af] hover:bg-[#6c1e8f] text-white"
          disabled={
            (step === 3 && !imei) ||
            (step === 4 && !eid)
          }
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
