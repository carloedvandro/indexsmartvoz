
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

interface CashbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  existingLevels: number[];
}

interface CashbackFormData {
  level: number;
  percentage: number;
  description: string;
}

export function CashbackModal({ 
  open, 
  onOpenChange, 
  onSubmit, 
  initialData, 
  existingLevels 
}: CashbackModalProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CashbackFormData>();

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset({
          level: initialData.level,
          percentage: initialData.percentage,
          description: initialData.description || ''
        });
      } else {
        reset({
          level: Math.max(0, ...existingLevels) + 1,
          percentage: 0,
          description: ''
        });
      }
    }
  }, [open, initialData, existingLevels, reset]);

  const handleFormSubmit = (data: CashbackFormData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Editar Nível de Cashback' : 'Adicionar Nível de Cashback'}
          </DialogTitle>
          <DialogDescription>
            Configure o nível e percentual de cashback
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
              <Label htmlFor="percentage">Percentual (%) *</Label>
              <Input
                id="percentage"
                type="number"
                step="0.01"
                min="0"
                max="100"
                {...register("percentage", {
                  required: "Percentual é obrigatório",
                  valueAsNumber: true,
                  min: { value: 0, message: "Percentual deve ser positivo" },
                  max: { value: 100, message: "Percentual não pode ser maior que 100%" }
                })}
              />
              {errors.percentage && (
                <span className="text-sm text-red-600">{errors.percentage.message}</span>
              )}
            </div>
          </div>

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
            <Button type="button" onClick={handleSubmit(handleFormSubmit)}>
              {initialData ? 'Atualizar' : 'Adicionar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
