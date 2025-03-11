
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface NavigationButtonsProps {
  currentStep: number;
  handleBack: () => void;
  handleContinue: () => void;
  disabled?: boolean;
}

export function NavigationButtons({ 
  currentStep, 
  handleBack, 
  handleContinue,
  disabled = false
}: NavigationButtonsProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center mt-6">
      <div className="relative flex items-center justify-between bg-black rounded-full max-w-[280px] w-full h-14 px-1">
        <Button 
          onClick={() => currentStep === 1 ? navigate("/client/dashboard") : handleBack()}
          className="rounded-full h-12 w-12 flex items-center justify-center p-0 bg-red-600 hover:bg-red-700 text-white border-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6V4c0-1.1-.9-2-2-2H4a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-2"/>
            <path d="M15 10H9"/>
            <polyline points="13 6 9 10 13 14"/>
          </svg>
        </Button>
        <div className="border-t-2 border-white w-full max-w-[180px]"></div>
        <Button 
          onClick={handleContinue}
          disabled={disabled}
          className="rounded-full h-12 w-12 flex items-center justify-center p-0 bg-green-500 hover:bg-green-600 text-white border-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17l9.2-9.2M17 17V7H7"/>
          </svg>
        </Button>
      </div>
    </div>
  );
}
