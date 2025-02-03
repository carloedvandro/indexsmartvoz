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
    perspective: 150,
    beamsPerSide: 6,
    beamSize: 2,
    beamDelayMax: 2,
    beamDuration: 1.5,
    gridColor: "rgba(255, 255, 255, 0.1)", // Efeito de estrelas brancas suaves
  },
  {
    perspective: 120,
    beamsPerSide: 8,
    beamSize: 1,
    beamDelayMax: 1,
    beamDuration: 1,
    gridColor: "rgba(147, 197, 253, 0.08)", // Efeito azul cintilante
  },
  {
    perspective: 100,
    beamsPerSide: 10,
    beamSize: 1.5,
    beamDelayMax: 3,
    beamDuration: 2,
    gridColor: "rgba(167, 139, 250, 0.1)", // Efeito roxo suave
  },
  {
    perspective: 130,
    beamsPerSide: 5,
    beamSize: 3,
    beamDelayMax: 1.5,
    beamDuration: 1.2,
    gridColor: "rgba(251, 191, 36, 0.06)", // Efeito dourado sutil
  },
  {
    perspective: 140,
    beamsPerSide: 7,
    beamSize: 2,
    beamDelayMax: 2.5,
    beamDuration: 1.8,
    gridColor: "rgba(239, 246, 255, 0.12)", // Efeito prateado brilhante
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