
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

interface BasicFormData {
  title: string;
  description: string;
  value: number;
  status: string;
  firstPurchaseCashback: number;
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

export const PlanFormProvider = React.memo(({ children, initialData }: PlanFormProviderProps) => {
  const [activeTab, setActiveTab] = useState('informacoes');
  const [cashbackLevels, setCashbackLevels] = useState<any[]>([]);
  const [benefits, setBenefits] = useState<any[]>([]);
  const [basicFormData, setBasicFormData] = useState<BasicFormData>({
    title: '',
    description: '',
    value: 0,
    status: 'active',
    firstPurchaseCashback: 0
  });
  const [initialized, setInitialized] = useState(false);

  // Memoizar se há dados iniciais válidos
  const hasInitialData = useMemo(() => {
    return initialData && (
      initialData.title ||
      initialData.description ||
      initialData.value ||
      initialData.first_purchase_cashback ||
      (initialData.plan_cashback_levels && initialData.plan_cashback_levels.length > 0) ||
      (initialData.plan_benefits && initialData.plan_benefits.length > 0)
    );
  }, [initialData]);

  // Efeito para inicializar os dados quando initialData mudar
  useEffect(() => {
    if (hasInitialData && !initialized) {
      console.log('🟢 PlanFormProvider: Initializing form data:', initialData);
      
      // Inicializar dados básicos
      const newBasicFormData = {
        title: initialData.title || '',
        description: initialData.description || '',
        value: initialData.value || 0,
        status: initialData.status || 'active',
        firstPurchaseCashback: initialData.first_purchase_cashback || 0
      };
      
      setBasicFormData(newBasicFormData);
      console.log('🟢 PlanFormProvider: Setting basic form data:', newBasicFormData);

      // Inicializar cashback levels - mapear amount e percentage corretamente
      if (initialData.plan_cashback_levels && Array.isArray(initialData.plan_cashback_levels)) {
        const mappedCashbackLevels = initialData.plan_cashback_levels.map((level: any) => ({
          ...level,
          valueType: level.amount !== null && level.amount !== undefined ? 'fixed' : 'percentage',
          percentage: level.percentage ? level.percentage * 100 : 0
        }));
        setCashbackLevels(mappedCashbackLevels);
        console.log('🟢 PlanFormProvider: Setting cashback levels:', mappedCashbackLevels);
      }

      // Inicializar benefits
      if (initialData.plan_benefits && Array.isArray(initialData.plan_benefits)) {
        setBenefits(initialData.plan_benefits);
        console.log('🟢 PlanFormProvider: Setting benefits:', initialData.plan_benefits);
      }
      
      setInitialized(true);
    } else if (!hasInitialData && !initialized) {
      // Se não há dados iniciais, marcar como inicializado para permitir a edição
      setInitialized(true);
    }
  }, [hasInitialData, initialized, initialData]);

  // Função memoizada para atualizar dados básicos preservando valores existentes
  const updateBasicFormData = useCallback((newData: BasicFormData) => {
    console.log('🟡 PlanFormProvider: Updating basic form data:', newData);
    setBasicFormData(prev => {
      const updated = { ...prev, ...newData };
      console.log('🟡 PlanFormProvider: Previous data:', prev);
      console.log('🟡 PlanFormProvider: Updated data:', updated);
      return updated;
    });
  }, []);

  // Métodos memoizados para gerenciar cashback levels
  const addCashbackLevel = useCallback((level: any) => {
    const newLevel = { ...level, id: level.id || Date.now() + Math.random() };
    console.log('🟢 PlanFormProvider: Adding cashback level:', newLevel);
    setCashbackLevels(prev => {
      const newArray = [...prev, newLevel];
      console.log('🟢 PlanFormProvider: New cashback levels array:', newArray);
      return newArray;
    });
  }, []);

  const updateCashbackLevel = useCallback((id: any, level: any) => {
    console.log('🟡 PlanFormProvider: Updating cashback level:', { id, level });
    setCashbackLevels(prev => prev.map(item => 
      item.id === id ? { ...level, id } : item
    ));
  }, []);

  const deleteCashbackLevel = useCallback((id: any) => {
    console.log('🔴 PlanFormProvider: Deleting cashback level:', id);
    setCashbackLevels(prev => prev.filter(item => item.id !== id));
  }, []);

  // Métodos memoizados para gerenciar benefits
  const addBenefit = useCallback((benefit: any) => {
    const newBenefit = { ...benefit, id: benefit.id || Date.now() + Math.random() };
    console.log('🟢 PlanFormProvider: Adding benefit:', newBenefit);
    setBenefits(prev => [...prev, newBenefit]);
  }, []);

  const updateBenefit = useCallback((id: any, benefit: any) => {
    console.log('🟡 PlanFormProvider: Updating benefit:', { id, benefit });
    setBenefits(prev => prev.map(item => 
      item.id === id ? { ...benefit, id } : item
    ));
  }, []);

  const deleteBenefit = useCallback((id: any) => {
    console.log('🔴 PlanFormProvider: Deleting benefit:', id);
    setBenefits(prev => prev.filter(item => item.id !== id));
  }, []);

  // Memoizar o valor do contexto
  const contextValue = useMemo(() => ({
    activeTab,
    setActiveTab,
    planData: initialData,
    cashbackLevels,
    setCashbackLevels,
    benefits,
    setBenefits,
    basicFormData,
    setBasicFormData: updateBasicFormData,
    addCashbackLevel,
    updateCashbackLevel,
    deleteCashbackLevel,
    addBenefit,
    updateBenefit,
    deleteBenefit,
  }), [
    activeTab,
    initialData,
    cashbackLevels,
    benefits,
    basicFormData,
    updateBasicFormData,
    addCashbackLevel,
    updateCashbackLevel,
    deleteCashbackLevel,
    addBenefit,
    updateBenefit,
    deleteBenefit,
  ]);

  return (
    <PlanFormContext.Provider value={contextValue}>
      {children}
    </PlanFormContext.Provider>
  );
});

PlanFormProvider.displayName = 'PlanFormProvider';

export function usePlanForm() {
  const context = useContext(PlanFormContext);
  if (!context) {
    throw new Error('usePlanForm must be used within a PlanFormProvider');
  }
  return context;
}
