
import React, { createContext, useContext, useState } from 'react';

interface BasicFormData {
  title: string;
  description: string;
  value: number;
  status: string;
}

interface PlanFormContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  planData: any;
  cashbackLevels: any[];
  setCashbackLevels: (levels: any[]) => void;
  benefits: any[];
  setBenefits: (benefits: any[]) => void;
  basicFormData: BasicFormData | null;
  setBasicFormData: (data: BasicFormData) => void;
}

const PlanFormContext = createContext<PlanFormContextType | null>(null);

interface PlanFormProviderProps {
  children: React.ReactNode;
  initialData?: any;
}

export function PlanFormProvider({ children, initialData }: PlanFormProviderProps) {
  const [activeTab, setActiveTab] = useState('informacoes');
  const [cashbackLevels, setCashbackLevels] = useState(
    initialData?.cashback_levels || []
  );
  const [benefits, setBenefits] = useState(
    initialData?.benefits || []
  );
  const [basicFormData, setBasicFormData] = useState<BasicFormData | null>(
    initialData ? {
      title: initialData.title || '',
      description: initialData.description || '',
      value: initialData.value || 0,
      status: initialData.status || 'active'
    } : null
  );

  const value = {
    activeTab,
    setActiveTab,
    planData: initialData,
    cashbackLevels,
    setCashbackLevels,
    benefits,
    setBenefits,
    basicFormData,
    setBasicFormData,
  };

  return (
    <PlanFormContext.Provider value={value}>
      {children}
    </PlanFormContext.Provider>
  );
}

export function usePlanForm() {
  const context = useContext(PlanFormContext);
  if (!context) {
    throw new Error('usePlanForm must be used within a PlanFormProvider');
  }
  return context;
}
