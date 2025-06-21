
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { usePlanForm } from "../PlanFormProvider";

interface BasicInfoFormData {
  title: string;
  description: string;
  value: number;
  status: string;
}

export function BasicInfoTab() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { planData, cashbackLevels, benefits } = usePlanForm();
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<BasicInfoFormData>({
    defaultValues: {
      title: planData?.title || '',
      description: planData?.description || '',
      value: planData?.value || 0,
      status: planData?.status || 'active',
    }
  });

  const handleFormSubmit = async (data: BasicInfoFormData) => {
    try {
      setSubmitting(true);
      
      let planId = planData?.id;
      
      // Salvar/atualizar o plano principal
      if (planData?.id) {
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
          .eq('id', planData.id);

        if (planError) throw planError;
      } else {
        // Criar novo plano
        const { data: planDataResult, error: planError } = await supabase
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
        planId = planDataResult.id;
      }

      // Deletar cashback levels existentes se estiver editando
      if (planData?.id) {
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
          percentage: level.valueType === 'percentage' ? (level.percentage || 0) / 100 : null,
          fixed_value: level.valueType === 'fixed' ? level.fixedValue : null,
          description: level.description || null
        }));

        const { error: cashbackError } = await supabase
          .from('plan_cashback_levels')
          .insert(cashbackData);

        if (cashbackError) throw cashbackError;
      }

      // Deletar benefits existentes se estiver editando
      if (planData?.id) {
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
        description: planData ? "Plano atualizado com sucesso!" : "Plano criado com sucesso!",
      });

      navigate('/admin/plans');

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-1">Informações Básicas</h2>
        <p className="text-sm text-gray-600">Configure os dados principais do plano</p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
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
      </form>
    </div>
  );
}
