
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BenefitsList } from "../../plan-form/BenefitsList";
import { BenefitsModal } from "../../plan-form/BenefitsModal";
import { usePlanForm } from "../PlanFormProvider";

export function BenefitsTab() {
  const { 
    benefits, 
    addBenefit, 
    updateBenefit, 
    deleteBenefit 
  } = usePlanForm();
  const [benefitsModalOpen, setBenefitsModalOpen] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState<any>(null);

  const handleBenefitSubmit = (benefitData: any) => {
    if (editingBenefit) {
      updateBenefit(editingBenefit.id, benefitData);
      setEditingBenefit(null);
    } else {
      addBenefit(benefitData);
    }
    setBenefitsModalOpen(false);
  };

  const handleEditBenefit = (benefit: any) => {
    setEditingBenefit(benefit);
    setBenefitsModalOpen(true);
  };

  const handleDeleteBenefit = (id: any) => {
    deleteBenefit(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-1">Benefícios</h2>
          <p className="text-sm text-gray-600">Configure os benefícios inclusos neste plano</p>
        </div>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => {
            setEditingBenefit(null);
            setBenefitsModalOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Benefício
        </Button>
      </div>

      <BenefitsList
        benefits={benefits}
        onEdit={handleEditBenefit}
        onDelete={handleDeleteBenefit}
      />

      <BenefitsModal
        open={benefitsModalOpen}
        onOpenChange={setBenefitsModalOpen}
        onSubmit={handleBenefitSubmit}
        initialData={editingBenefit}
      />
    </div>
  );
}
