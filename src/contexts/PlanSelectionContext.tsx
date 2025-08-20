
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface PlanData {
  id: string;
  name: string;
  gb: string;
  price: number;
  features: string[];
}

export interface PlanSelectionData {
  selectedPlan: PlanData | null;
  selectedDDD: string;
  selectedDueDate: number | null;
}

interface PlanSelectionContextType {
  planData: PlanSelectionData;
  setPlanData: (data: Partial<PlanSelectionData>) => void;
  clearPlanData: () => void;
}

const PlanSelectionContext = createContext<PlanSelectionContextType | undefined>(undefined);

const initialState: PlanSelectionData = {
  selectedPlan: null,
  selectedDDD: '',
  selectedDueDate: null,
};

export function PlanSelectionProvider({ children }: { children: ReactNode }) {
  const [planData, setPlanDataState] = useState<PlanSelectionData>(initialState);

  const setPlanData = (data: Partial<PlanSelectionData>) => {
    setPlanDataState(prev => ({ ...prev, ...data }));
  };

  const clearPlanData = () => {
    setPlanDataState(initialState);
  };

  return (
    <PlanSelectionContext.Provider value={{ planData, setPlanData, clearPlanData }}>
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
