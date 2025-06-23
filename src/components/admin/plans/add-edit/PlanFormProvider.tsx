
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
  // Novos métodos para gerenciar dados temporários
  addCashbackLevel: (level: any) => void;
  updateCashbackLevel: (id: any, level: any) => void;
  deleteCashbackLevel: (id: any) => void;
  addBenefit: (benefit: any) => void;
  updateBenefit: (id: any, benefit: any) => void;
  deleteBenefit: (id: any) => void;
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

  // Métodos para gerenciar cashback levels
  const addCashbackLevel = (level: any) => {
    const newLevel = { ...level, id: level.id || Date.now() + Math.random() };
    setCashbackLevels(prev => [...prev, newLevel]);
  };

  const updateCashbackLevel = (id: any, level: any) => {
    setCashbackLevels(prev => prev.map(item => 
      item.id === id ? { ...level, id } : item
    ));
  };

  const deleteCashbackLevel = (id: any) => {
    setCashbackLevels(prev => prev.filter(item => item.id !== id));
  };

  // Métodos para gerenciar benefits
  const addBenefit = (benefit: any) => {
    const newBenefit = { ...benefit, id: benefit.id || Date.now() + Math.random() };
    setBenefits(prev => [...prev, newBenefit]);
  };

  const updateBenefit = (id: any, benefit: any) => {
    setBenefits(prev => prev.map(item => 
      item.id === id ? { ...benefit, id } : item
    ));
  };

  const deleteBenefit = (id: any) => {
    setBenefits(prev => prev.filter(item => item.id !== id));
  };

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
    addCashbackLevel,
    updateCashbackLevel,
    deleteCashbackLevel,
    addBenefit,
    updateBenefit,
    deleteBenefit,
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
