import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface BenefitsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}
interface BenefitFormData {
  benefit_title: string;
  display_order: number;
}
export function BenefitsModal({
  open,
  onOpenChange,
  onSubmit,
  initialData
}: BenefitsModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors
    }
  } = useForm<BenefitFormData>();
  useEffect(() => {
    if (open) {
      if (initialData) {
        reset({
          benefit_title: initialData.benefit_title || '',
          display_order: initialData.display_order || 1
        });
      } else {
        reset({
          benefit_title: '',
          display_order: 1
        });
      }
    }
  }, [open, initialData, reset]);
  const handleFormSubmit = (data: BenefitFormData) => {
    onSubmit(data);
  };
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Editar Benefício' : 'Adicionar Benefício'}
          </DialogTitle>
          <DialogDescription>
            Configure o título e ordem do benefício
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="benefit_title">Título do Benefício *</Label>
            <Input id="benefit_title" {...register("benefit_title", {
            required: "Título é obrigatório"
          })} placeholder="Ex: Internet ilimitada" />
            {errors.benefit_title && <span className="text-sm text-red-600">{errors.benefit_title.message}</span>}
          </div>

          <div>
            <Label htmlFor="display_order">Ordem de Exibição</Label>
            <Input id="display_order" type="number" min="1" {...register("display_order", {
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Ordem deve ser maior que 0"
            }
          })} />
            {errors.display_order && <span className="text-sm text-red-600">{errors.display_order.message}</span>}
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="">
              {initialData ? 'Atualizar' : 'Adicionar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>;
}