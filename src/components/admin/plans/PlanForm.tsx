
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PlanFormProps {
  plan?: any;
  onSuccess: () => void;
}

interface CashbackLevel {
  level: number;
  percentage: number;
  description: string;
}

interface Benefit {
  title: string;
  description: string;
}

export function PlanForm({ plan, onSuccess }: PlanFormProps) {
  const { toast } = useToast();
  const [cashbackLevels, setCashbackLevels] = useState<CashbackLevel[]>(
    plan?.cashback_levels || [{ level: 1, percentage: 0, description: '' }]
  );
  const [benefits, setBenefits] = useState<Benefit[]>(
    plan?.benefits?.map((b: any) => ({ title: b.benefit_title, description: b.benefit_description })) || 
    [{ title: '', description: '' }]
  );

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      title: plan?.title || '',
      description: plan?.description || '',
      value: plan?.value || '',
      status: plan?.status || 'active'
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      let planId = plan?.id;

      if (plan) {
        // Atualizar plano existente
        const { error } = await supabase
          .from('plans')
          .update({
            title: data.title,
            description: data.description,
            value: parseFloat(data.value),
            status: data.status
          })
          .eq('id', plan.id);

        if (error) throw error;
      } else {
        // Criar novo plano
        const { data: newPlan, error } = await supabase
          .from('plans')
          .insert({
            title: data.title,
            description: data.description,
            value: parseFloat(data.value),
            status: data.status
          })
          .select()
          .single();

        if (error) throw error;
        planId = newPlan.id;
      }

      // Deletar cashback levels existentes e inserir novos
      if (plan) {
        await supabase
          .from('plan_cashback_levels')
          .delete()
          .eq('plan_id', planId);
      }

      if (cashbackLevels.length > 0) {
        const { error: cashbackError } = await supabase
          .from('plan_cashback_levels')
          .insert(
            cashbackLevels.map(level => ({
              plan_id: planId,
              level: level.level,
              percentage: level.percentage,
              description: level.description
            }))
          );

        if (cashbackError) throw cashbackError;
      }

      // Deletar benefícios existentes e inserir novos
      if (plan) {
        await supabase
          .from('plan_benefits')
          .delete()
          .eq('plan_id', planId);
      }

      if (benefits.length > 0) {
        const { error: benefitsError } = await supabase
          .from('plan_benefits')
          .insert(
            benefits.map((benefit, index) => ({
              plan_id: planId,
              benefit_title: benefit.title,
              benefit_description: benefit.description,
              display_order: index + 1
            }))
          );

        if (benefitsError) throw benefitsError;
      }
    },
    onSuccess: () => {
      toast({
        title: plan ? "Plano atualizado" : "Plano criado",
        description: plan ? "Plano foi atualizado com sucesso." : "Novo plano foi criado com sucesso.",
      });
      onSuccess();
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao salvar plano.",
        variant: "destructive",
      });
    }
  });

  const addCashbackLevel = () => {
    setCashbackLevels([...cashbackLevels, { level: cashbackLevels.length + 1, percentage: 0, description: '' }]);
  };

  const removeCashbackLevel = (index: number) => {
    setCashbackLevels(cashbackLevels.filter((_, i) => i !== index));
  };

  const updateCashbackLevel = (index: number, field: keyof CashbackLevel, value: any) => {
    const updated = [...cashbackLevels];
    updated[index] = { ...updated[index], [field]: value };
    setCashbackLevels(updated);
  };

  const addBenefit = () => {
    setBenefits([...benefits, { title: '', description: '' }]);
  };

  const removeBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  const updateBenefit = (index: number, field: keyof Benefit, value: string) => {
    const updated = [...benefits];
    updated[index] = { ...updated[index], [field]: value };
    setBenefits(updated);
  };

  const onSubmit = (data: any) => {
    saveMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Informações Básicas */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Informações Básicas</h3>
        
        <div>
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            {...register('title', { required: 'Título é obrigatório' })}
          />
          {errors.title && (
            <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            {...register('description')}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="value">Valor (R$)</Label>
            <Input
              id="value"
              type="number"
              step="0.01"
              {...register('value', { required: 'Valor é obrigatório' })}
            />
            {errors.value && (
              <p className="text-sm text-red-600 mt-1">{errors.value.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              {...register('status')}
              defaultValue={watch('status')}
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
      </div>

      {/* Níveis de Cashback */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Níveis de Cashback</h3>
          <Button type="button" variant="outline" onClick={addCashbackLevel}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Nível
          </Button>
        </div>

        {cashbackLevels.map((level, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Nível {level.level}</h4>
              {cashbackLevels.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeCashbackLevel(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nível</Label>
                <Input
                  type="number"
                  value={level.level}
                  onChange={(e) => updateCashbackLevel(index, 'level', parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label>Percentual (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={level.percentage}
                  onChange={(e) => updateCashbackLevel(index, 'percentage', parseFloat(e.target.value))}
                />
              </div>
            </div>

            <div>
              <Label>Descrição</Label>
              <Input
                value={level.description}
                onChange={(e) => updateCashbackLevel(index, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Benefícios */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Benefícios</h3>
          <Button type="button" variant="outline" onClick={addBenefit}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Benefício
          </Button>
        </div>

        {benefits.map((benefit, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Benefício {index + 1}</h4>
              {benefits.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeBenefit(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div>
              <Label>Título</Label>
              <Input
                value={benefit.title}
                onChange={(e) => updateBenefit(index, 'title', e.target.value)}
              />
            </div>

            <div>
              <Label>Descrição</Label>
              <Textarea
                value={benefit.description}
                onChange={(e) => updateBenefit(index, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button type="submit" disabled={saveMutation.isPending}>
          {saveMutation.isPending ? 'Salvando...' : (plan ? 'Atualizar' : 'Criar')}
        </Button>
      </div>
    </form>
  );
}
