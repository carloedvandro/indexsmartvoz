
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CashbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  existingLevels: number[];
}

interface CashbackFormData {
  level: number;
  valueType: 'percentage' | 'fixed';
  percentage?: number;
  fixedValue?: number;
  description: string;
}

export function CashbackModal({ 
  open, 
  onOpenChange, 
  onSubmit, 
  initialData, 
  existingLevels 
}: CashbackModalProps) {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<CashbackFormData>();
  const [valueType, setValueType] = useState<'percentage' | 'fixed'>('percentage');

  const watchedValueType = watch('valueType');

  useEffect(() => {
    if (open) {
      if (initialData) {
        const type = initialData.fixedValue !== undefined && initialData.fixedValue !== null ? 'fixed' : 'percentage';
        setValueType(type);
        reset({
          level: initialData.level,
          valueType: type,
          percentage: type === 'percentage' ? initialData.percentage : undefined,
          fixedValue: type === 'fixed' ? initialData.fixedValue : undefined,
          description: initialData.description || ''
        });
      } else {
        setValueType('percentage');
        reset({
          level: Math.max(0, ...existingLevels) + 1,
          valueType: 'percentage',
          percentage: 0,
          fixedValue: undefined,
          description: ''
        });
      }
    }
  }, [open, initialData, existingLevels, reset]);

  useEffect(() => {
    if (watchedValueType !== valueType) {
      setValueType(watchedValueType);
    }
  }, [watchedValueType]);

  const handleFormSubmit = (data: CashbackFormData) => {
    const submitData = {
      level: data.level,
      valueType: data.valueType,
      percentage: data.valueType === 'percentage' ? data.percentage : null,
      fixedValue: data.valueType === 'fixed' ? data.fixedValue : null,
      description: data.description
    };
    onSubmit(submitData);
  };

  const handleValueTypeChange = (value: string) => {
    const newType = value as 'percentage' | 'fixed';
    setValueType(newType);
    setValue('valueType', newType);
    
    // Limpar os valores dos campos não utilizados
    if (newType === 'percentage') {
      setValue('fixedValue', undefined);
    } else {
      setValue('percentage', undefined);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Editar Nível de Cashback' : 'Adicionar Nível de Cashback'}
          </DialogTitle>
          <DialogDescription>
            Configure o nível e tipo de cashback
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="level">Nível *</Label>
            <Input
              id="level"
              type="number"
              min="1"
              {...register("level", { 
                required: "Nível é obrigatório",
                valueAsNumber: true,
                min: { value: 1, message: "Nível deve ser maior que 0" },
                validate: (value) => {
                  if (initialData && value === initialData.level) return true;
                  return !existingLevels.includes(value) || "Este nível já existe";
                }
              })}
            />
            {errors.level && (
              <span className="text-sm text-red-600">{errors.level.message}</span>
            )}
          </div>

          <div>
            <Label>Tipo de Valor *</Label>
            <RadioGroup 
              value={valueType} 
              onValueChange={handleValueTypeChange}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="percentage" id="percentage" />
                <Label htmlFor="percentage">Percentual (%)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fixed" id="fixed" />
                <Label htmlFor="fixed">Valor Fixo (R$)</Label>
              </div>
            </RadioGroup>
            <input type="hidden" {...register("valueType")} />
          </div>

          {valueType === 'percentage' && (
            <div>
              <Label htmlFor="percentage">Percentual (%) *</Label>
              <Input
                id="percentage"
                type="number"
                step="0.01"
                min="0"
                max="100"
                {...register("percentage", {
                  required: valueType === 'percentage' ? "Percentual é obrigatório" : false,
                  valueAsNumber: true,
                  min: { value: 0, message: "Percentual deve ser positivo" },
                  max: { value: 100, message: "Percentual não pode ser maior que 100%" }
                })}
              />
              {errors.percentage && (
                <span className="text-sm text-red-600">{errors.percentage.message}</span>
              )}
            </div>
          )}

          {valueType === 'fixed' && (
            <div>
              <Label htmlFor="fixedValue">Valor Fixo (R$) *</Label>
              <Input
                id="fixedValue"
                type="number"
                step="0.01"
                min="0"
                {...register("fixedValue", {
                  required: valueType === 'fixed' ? "Valor fixo é obrigatório" : false,
                  valueAsNumber: true,
                  min: { value: 0, message: "Valor deve ser positivo" }
                })}
              />
              {errors.fixedValue && (
                <span className="text-sm text-red-600">{errors.fixedValue.message}</span>
              )}
            </div>
          )}

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              {...register("description")}
              placeholder="Descrição do nível (opcional)"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {initialData ? 'Atualizar' : 'Adicionar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
