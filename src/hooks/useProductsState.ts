
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Line = {
  id: number;
  internet: string;
  type: string;
  ddd: string;
  price: number;
  barcode?: string;
  planId?: string;
  planName?: string;
};

export function useProductsState() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLines, setSelectedLines] = useState<Line[]>([]);
  const [selectedDueDate, setSelectedDueDate] = useState<number | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [protocol, setProtocol] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [scanningIndex, setScanningIndex] = useState<number | null>(null);
  const [showChipActivation, setShowChipActivation] = useState(false);
  const [isAsaasProcessing, setIsAsaasProcessing] = useState(false);

  // Load selected plan from localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem('selectedPlan');
    if (savedPlan) {
      try {
        const plan = JSON.parse(savedPlan);
        console.log('Loaded plan from localStorage:', plan);
        
        // Pre-populate with selected plan
        setSelectedLines([{
          id: 1,
          internet: plan.gb,
          type: "eSIM",
          ddd: "",
          price: plan.price,
          planId: plan.id,
          planName: plan.name || plan.title
        }]);
      } catch (error) {
        console.error('Error parsing saved plan:', error);
        // If no plan is saved, redirect back to plan selection
        navigate("/client/plan-selection");
      }
    } else {
      navigate("/client/plan-selection");
    }
  }, [navigate]);

  return {
    currentStep,
    setCurrentStep,
    selectedLines,
    setSelectedLines,
    selectedDueDate,
    setSelectedDueDate,
    acceptedTerms,
    setAcceptedTerms,
    protocol,
    setProtocol,
    showConfirmation,
    setShowConfirmation,
    scanningIndex,
    setScanningIndex,
    showChipActivation,
    setShowChipActivation,
    isAsaasProcessing,
    setIsAsaasProcessing
  };
}
