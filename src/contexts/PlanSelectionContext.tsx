
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PlanData {
  id: string;
  name: string;
  gb: string;
  price: number;
  features: string[];
}

interface SelectionData {
  internet: string;
  ddd: string;
  dueDate: number;
  price: number;
}

interface PlanSelectionContextType {
  selectedPlan: PlanData | null;
  selectionData: SelectionData | null;
  setSelectedPlan: (plan: PlanData) => void;
  setSelectionData: (data: SelectionData) => void;
  clearSelection: () => void;
}

const PlanSelectionContext = createContext<PlanSelectionContextType | undefined>(undefined);

export function PlanSelectionProvider({ children }: { children: ReactNode }) {
  const [selectedPlan, setSelectedPlan] = useState<PlanData | null>(null);
  const [selectionData, setSelectionData] = useState<SelectionData | null>(null);

  const clearSelection = () => {
    setSelectedPlan(null);
    setSelectionData(null);
  };

  return (
    <PlanSelectionContext.Provider value={{
      selectedPlan,
      selectionData,
      setSelectedPlan,
      setSelectionData,
      clearSelection
    }}>
      {children}
    </PlanSelectionContext.Provider>
  );
}

export function usePlanSelection() {
  const context = useContext(PlanSelectionContext);
  if (context === undefined) {
    throw new Error('usePlanSelection must be used within a PlanSelectionProvider');
  }
  return context;
}
