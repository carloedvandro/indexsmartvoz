
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CashbackList } from "../../plan-form/CashbackList";
import { CashbackModal } from "../../plan-form/CashbackModal";
import { usePlanForm } from "../PlanFormProvider";

export function CashbackLevelsTab() {
  const { 
    cashbackLevels, 
    addCashbackLevel, 
    updateCashbackLevel, 
    deleteCashbackLevel 
  } = usePlanForm();
  const [cashbackModalOpen, setCashbackModalOpen] = useState(false);
  const [editingCashback, setEditingCashback] = useState<any>(null);

  const handleCashbackSubmit = (cashbackData: any) => {
    console.log('🟡 CashbackLevelsTab - handleCashbackSubmit called with:', cashbackData);
    if (editingCashback) {
      console.log('🟡 Updating existing cashback level');
      updateCashbackLevel(editingCashback.id, cashbackData);
      setEditingCashback(null);
    } else {
      console.log('🟡 Adding new cashback level');
      addCashbackLevel(cashbackData);
    }
    setCashbackModalOpen(false);
  };

  const handleEditCashback = (cashback: any) => {
    setEditingCashback(cashback);
    setCashbackModalOpen(true);
  };

  const handleDeleteCashback = (id: any) => {
    deleteCashbackLevel(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-1">Níveis de Cashback</h2>
          <p className="text-sm text-gray-600">Configure os níveis de comissão para este plano</p>
        </div>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => {
            setEditingCashback(null);
            setCashbackModalOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Nível
        </Button>
      </div>

      <CashbackList
        cashbackLevels={cashbackLevels}
        onEdit={handleEditCashback}
        onDelete={handleDeleteCashback}
      />

      <CashbackModal
        open={cashbackModalOpen}
        onOpenChange={setCashbackModalOpen}
        onSubmit={handleCashbackSubmit}
        initialData={editingCashback}
        existingLevels={cashbackLevels.filter(c => c.id !== editingCashback?.id).map(c => c.level)}
      />
    </div>
  );
}
