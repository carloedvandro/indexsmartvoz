
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface PlanFormData {
  title: string;
  description: string;
  value: number;
  status: string;
  cashbackLevels: {
    level: number;
    percentage: number;
    description: string;
  }[];
  benefits: {
    benefit_title: string;
    benefit_description: string;
    display_order: number;
  }[];
}

interface PlanFormProps {
  initialData?: any;
  onSubmit: (data: PlanFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function PlanForm({ initialData, onSubmit, onCancel, isLoading }: PlanFormProps) {
  const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm<PlanFormData>({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      value: initialData?.value || 0,
      status: initialData?.status || 'active',
      cashbackLevels: initialData?.cashback_levels || [
        { level: 1, percentage: 0, description: '' }
      ],
      benefits: initialData?.benefits || [
        { benefit_title: '', benefit_description: '', display_order: 1 }
      ]
    }
  });

  const { fields: cashbackFields, append: appendCashback, remove: removeCashback } = useFieldArray({
    control,
    name: "cashbackLevels"
  });

  const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({
    control,
    name: "benefits"
  });

  const addCashbackLevel = () => {
    appendCashback({
      level: cashbackFields.length + 1,
      percentage: 0,
      description: ''
    });
  };

  const addBenefit = () => {
    appendBenefit({
      benefit_title: '',
      benefit_description: '',
      display_order: benefitFields.length + 1
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

      {/* Níveis de Cashback */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Níveis de Cashback</CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={addCashbackLevel}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Nível
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {cashbackFields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Nível {index + 1}</h4>
                {cashbackFields.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeCashback(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Percentual (%)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    {...register(`cashbackLevels.${index}.percentage`, {
                      valueAsNumber: true,
                      min: { value: 0, message: "Percentual deve ser positivo" },
                      max: { value: 100, message: "Percentual não pode ser maior que 100%" }
                    })}
                  />
                  {errors.cashbackLevels?.[index]?.percentage && (
                    <span className="text-sm text-red-600">
                      {String(errors.cashbackLevels[index]?.percentage?.message)}
                    </span>
                  )}
                </div>
                
                <div>
                  <Label>Descrição</Label>
                  <Input
                    {...register(`cashbackLevels.${index}.description`)}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Benefícios */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Benefícios</CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={addBenefit}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Benefício
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {benefitFields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Benefício {index + 1}</h4>
                {benefitFields.length > 1 && (
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
              
              <div className="space-y-3">
                <div>
                  <Label>Título do Benefício</Label>
                  <Input
                    {...register(`benefits.${index}.benefit_title`, {
                      required: "Título é obrigatório"
                    })}
                  />
                  {errors.benefits?.[index]?.benefit_title && (
                    <span className="text-sm text-red-600">
                      {String(errors.benefits[index]?.benefit_title?.message)}
                    </span>
                  )}
                </div>
                
                <div>
                  <Label>Descrição do Benefício</Label>
                  <Textarea
                    {...register(`benefits.${index}.benefit_description`)}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  );
}
