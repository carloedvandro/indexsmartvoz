import { Card, CardContent } from "@/components/ui/card";
import { OrderReviewStep } from "./OrderReviewStep";
import { ContractTermsStep } from "./ContractTermsStep";
import { PlanSelectionStep } from "./PlanSelectionStep";
import { NavigationButtons } from "./NavigationButtons";
import { useStepValidator } from "./StepValidator";
import { WarpBackground } from "@/components/ui/warp-background";

interface MainContentProps {
  currentStep: number;
  selectedLines: any[];
  selectedDueDate: number | null;
  acceptedTerms: boolean;
  setSelectedLines: (lines: any[]) => void;
  setSelectedDueDate: (date: number) => void;
  setAcceptedTerms: (accepted: boolean) => void;
  handleBack: () => void;
  handleContinue: () => void;
}

// Definindo as diferentes configurações de efeito
const effects = [
  {
    perspective: 250, // Aumentado para dar mais profundidade
    beamsPerSide: 3, // Reduzido para mais espaçamento
    beamSize: 8, // Aumentado para raios mais largos
    beamDelayMax: 8, // Aumentado para movimento mais lento
    beamDuration: 6, // Aumentado para movimento mais lento
    gridColor: "rgba(63, 131, 248, 0.08)", // Azul mais suave
  },
  {
    perspective: 200,
    beamsPerSide: 3,
    beamSize: 6,
    beamDelayMax: 2,
    beamDuration: 3,
    gridColor: "rgba(155, 135, 245, 0.1)",
  },
  {
    perspective: 100,
    beamsPerSide: 5,
    beamSize: 3,
    beamDelayMax: 5,
    beamDuration: 2,
    gridColor: "rgba(110, 89, 165, 0.1)",
  },
  {
    perspective: 180,
    beamsPerSide: 2,
    beamSize: 8,
    beamDelayMax: 3,
    beamDuration: 5,
    gridColor: "rgba(95, 8, 137, 0.15)",
  },
  {
    perspective: 120,
    beamsPerSide: 6,
    beamSize: 2,
    beamDelayMax: 2,
    beamDuration: 3,
    gridColor: "rgba(155, 135, 245, 0.12)",
  },
];

export function MainContent({
  currentStep,
  selectedLines,
  selectedDueDate,
  acceptedTerms,
  setSelectedLines,
  setSelectedDueDate,
  setAcceptedTerms,
  handleBack,
  handleContinue
}: MainContentProps) {
  const { validateAndContinue } = useStepValidator({ 
    currentStep, 
    selectedLines, 
    selectedDueDate, 
    acceptedTerms,
    handleContinue 
  });

  // Usando o primeiro efeito como padrão - você pode trocar o índice (0-4) para testar diferentes efeitos
  const currentEffect = effects[0];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 pt-32">
      <WarpBackground
        className="w-full max-w-[400px]"
        perspective={currentEffect.perspective}
        beamsPerSide={currentEffect.beamsPerSide}
        beamSize={currentEffect.beamSize}
        beamDelayMax={currentEffect.beamDelayMax}
        beamDuration={currentEffect.beamDuration}
        gridColor={currentEffect.gridColor}
      >
        <Card className="w-full max-w-[400px] shadow-none bg-transparent border-0">
          <CardContent>
            {currentStep === 1 && (
              <PlanSelectionStep 
                selectedLines={selectedLines}
                setSelectedLines={setSelectedLines}
                selectedDueDate={selectedDueDate}
                setSelectedDueDate={setSelectedDueDate}
              />
            )}

            {currentStep === 2 && (
              <OrderReviewStep selectedLines={selectedLines} />
            )}

            {currentStep === 3 && (
              <ContractTermsStep
                acceptedTerms={acceptedTerms}
                onTermsChange={setAcceptedTerms}
              />
            )}

            <NavigationButtons 
              currentStep={currentStep}
              handleBack={handleBack}
              handleContinue={validateAndContinue}
            />
          </CardContent>
        </Card>
      </WarpBackground>
    </div>
  );
}