
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { CashbackList } from "./plan-form/CashbackList";
import { BenefitsList } from "./plan-form/BenefitsList";
import { CashbackModal } from "./plan-form/CashbackModal";
import { BenefitsModal } from "./plan-form/BenefitsModal";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PlanFormData {
  title: string;
  description: string;
  value: number;
  status: string;
}

interface PlanFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function PlanForm({ initialData, onSubmit, onCancel, isLoading }: PlanFormProps) {
  const [cashbackLevels, setCashbackLevels] = useState(
    initialData?.cashback_levels || []
  );
  const [benefits, setBenefits] = useState(
    initialData?.benefits || []
  );
  const [cashbackModalOpen, setCashbackModalOpen] = useState(false);
  const [benefitsModalOpen, setBenefitsModalOpen] = useState(false);
  const [editingCashback, setEditingCashback] = useState<any>(null);
  const [editingBenefit, setEditingBenefit] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<PlanFormData>({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      value: initialData?.value || 0,
      status: initialData?.status || 'active',
    }
  });

  const handleFormSubmit = async (data: PlanFormData) => {
    try {
      setSubmitting(true);
      
      let planId = initialData?.id;
      
      // Salvar/atualizar o plano principal
      if (initialData?.id) {
        // Atualizar plano existente
        const { error: planError } = await supabase
          .from('plans')
          .update({
            title: data.title,
            description: data.description,
            value: data.value,
            status: data.status,
            updated_at: new Date().toISOString()
          })
          .eq('id', initialData.id);

        if (planError) throw planError;
      } else {
        // Criar novo plano
        const { data: planData, error: planError } = await supabase
          .from('plans')
          .insert({
            title: data.title,
            description: data.description,
            value: data.value,
            status: data.status
          })
          .select()
          .single();

        if (planError) throw planError;
        planId = planData.id;
      }

      // Deletar cashback levels existentes se estiver editando
      if (initialData?.id) {
        await supabase
          .from('plan_cashback_levels')
          .delete()
          .eq('plan_id', planId);
      }

      // Inserir novos cashback levels
      if (cashbackLevels.length > 0) {
        const cashbackData = cashbackLevels.map(level => ({
          plan_id: planId,
          level: level.level,
          percentage: level.percentage / 100, // Converter para decimal
          description: level.description || null
        }));

        const { error: cashbackError } = await supabase
          .from('plan_cashback_levels')
          .insert(cashbackData);

        if (cashbackError) throw cashbackError;
      }

      // Deletar benefits existentes se estiver editando
      if (initialData?.id) {
        await supabase
          .from('plan_benefits')
          .delete()
          .eq('plan_id', planId);
      }

      // Inserir novos benefits
      if (benefits.length > 0) {
        const benefitsData = benefits.map(benefit => ({
          plan_id: planId,
          benefit_title: benefit.benefit_title,
          display_order: benefit.display_order
        }));

        const { error: benefitsError } = await supabase
          .from('plan_benefits')
          .insert(benefitsData);

        if (benefitsError) throw benefitsError;
      }

      toast({
        title: "Sucesso",
        description: initialData ? "Plano atualizado com sucesso!" : "Plano criado com sucesso!",
      });

      // Chamar o callback de sucesso
      onSubmit({
        ...data,
        id: planId,
        cashbackLevels,
        benefits
      });

    } catch (error) {
      console.error('Erro ao salvar plano:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar plano. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCashbackSubmit = (cashbackData: any) => {
    if (editingCashback) {
      setCashbackLevels(prev => 
        prev.map(item => item.id === editingCashback.id ? { ...cashbackData, id: item.id } : item)
      );
      setEditingCashback(null);
    } else {
      setCashbackLevels(prev => [...prev, { ...cashbackData, id: Date.now() }]);
    }
    setCashbackModalOpen(false);
  };

  const handleEditCashback = (cashback: any) => {
    setEditingCashback(cashback);
    setCashbackModalOpen(true);
  };

  const handleDeleteCashback = (id: any) => {
    setCashbackLevels(prev => prev.filter(item => item.id !== id));
  };

  const handleBenefitSubmit = (benefitData: any) => {
    if (editingBenefit) {
      setBenefits(prev => 
        prev.map(item => item.id === editingBenefit.id ? { ...benefitData, id: item.id } : item)
      );
      setEditingBenefit(null);
    } else {
      setBenefits(prev => [...prev, { ...benefitData, id: Date.now() }]);
    }
    setBenefitsModalOpen(false);
  };

  const handleEditBenefit = (benefit: any) => {
    setEditingBenefit(benefit);
    setBenefitsModalOpen(true);
  };

  const handleDeleteBenefit = (id: any) => {
    setBenefits(prev => prev.filter(item => item.id !== id));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              {...register("title", { required: "Título é obrigatório" })}
            />
            {errors.title && (
              <span className="text-sm text-red-600">{errors.title.message}</span>
            )}
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              {...register("description")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="value">Valor (R$) *</Label>
              <Input
                id="value"
                type="number"
                step="0.01"
                {...register("value", { 
                  required: "Valor é obrigatório",
                  valueAsNumber: true,
                  min: { value: 0, message: "Valor deve ser positivo" }
                })}
              />
              {errors.value && (
                <span className="text-sm text-red-600">{errors.value.message}</span>
              )}
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={watch("status")}
                onValueChange={(value) => setValue("status", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs para Cashback e Benefícios */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações do Plano</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cashback" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cashback">Níveis de Cashback</TabsTrigger>
              <TabsTrigger value="benefits">Benefícios</TabsTrigger>
            </TabsList>

            <TabsContent value="cashback" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Níveis de Cashback</h3>
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
            </TabsContent>

            <TabsContent value="benefits" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Benefícios</h3>
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading || submitting}>
          {submitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>

      {/* Modais */}
      <CashbackModal
        open={cashbackModalOpen}
        onOpenChange={setCashbackModalOpen}
        onSubmit={handleCashbackSubmit}
        initialData={editingCashback}
        existingLevels={cashbackLevels.filter(c => c.id !== editingCashback?.id).map(c => c.level)}
      />

      <BenefitsModal
        open={benefitsModalOpen}
        onOpenChange={setBenefitsModalOpen}
        onSubmit={handleBenefitSubmit}
        initialData={editingBenefit}
      />
    </form>
  );
}
