
import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [cashbackLevels, setCashbackLevels] = useState<any[]>([]);
  const [benefits, setBenefits] = useState<any[]>([]);
  const [basicFormData, setBasicFormData] = useState<BasicFormData | null>(null);

  // Efeito para inicializar os dados quando initialData mudar
  useEffect(() => {
    if (initialData) {
      console.log('Initializing form data:', initialData);
      
      // Inicializar dados básicos
      setBasicFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        value: initialData.value || 0,
        status: initialData.status || 'active'
      });

      // Inicializar cashback levels
      if (initialData.cashback_levels && Array.isArray(initialData.cashback_levels)) {
        setCashbackLevels(initialData.cashback_levels);
        console.log('Setting cashback levels:', initialData.cashback_levels);
      }

      // Inicializar benefits
      if (initialData.benefits && Array.isArray(initialData.benefits)) {
        setBenefits(initialData.benefits);
        console.log('Setting benefits:', initialData.benefits);
      }
    }
  }, [initialData]);

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
