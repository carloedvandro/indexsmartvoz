
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StepIndicator } from "@/components/client/esim-activation/StepIndicator";
import { IdentityStep } from "@/components/client/esim-activation/IdentityStep";
import { NavigationButtons } from "@/components/client/esim-activation/NavigationButtons";

export default function ClientEsimActivation() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [activationType, setActivationType] = useState<'self' | 'other'>('self');
  const [systemType, setSystemType] = useState<'android' | 'ios'>('android');
  const [imei, setImei] = useState("");
  const [eid, setEid] = useState("");

  const handleContinue = () => {
    if (step === 4) {
      navigate("/client/dashboard");
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(Math.max(1, step - 1));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 pb-16">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Ativação do eSIM</h1>
        </div>

        <Card className="max-w-[400px] mx-auto">
          <CardContent className="pt-6">
            <StepIndicator step={step} />

            {step === 1 && (
              <IdentityStep 
                activationType={activationType}
                setActivationType={setActivationType}
              />
            )}

            <NavigationButtons
              onBack={handleBack}
              onContinue={handleContinue}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
