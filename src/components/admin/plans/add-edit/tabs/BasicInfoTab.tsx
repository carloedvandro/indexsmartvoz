
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CurrencyInput } from "@/components/ui/currency-input";
import { usePlanForm } from "../PlanFormProvider";
import { useEffect, useCallback, useMemo } from "react";
import React from "react";

interface BasicInfoFormData {
  title: string;
  description: string;
  value: number;
  status: string;
  firstPurchaseCashback: number;
}

const BasicInfoTabComponent = React.memo(() => {
  const { basicFormData, setBasicFormData } = usePlanForm();

  // Memoizar os valores padrão para evitar recriação desnecessária
  const defaultValues = useMemo(() => ({
    title: '',
    description: '',
    value: 0,
    status: 'active',
    firstPurchaseCashback: 0,
  }), []);

  const { register, setValue, watch, formState: { errors }, reset } = useForm<BasicInfoFormData>({
    defaultValues
  });

  // Memoizar valores atuais do form
  const formValues = watch();

  // Verificar se há dados válidos para inicialização
  const hasValidBasicData = useMemo(() => {
    return basicFormData && (
      basicFormData.title || 
      basicFormData.description || 
      basicFormData.value > 0 || 
      basicFormData.firstPurchaseCashback > 0
    );
  }, [basicFormData]);

  // Inicializar o formulário apenas quando houver dados válidos
  useEffect(() => {
    if (hasValidBasicData) {
      console.log('🔄 BasicInfoTab: Initializing form with data:', basicFormData);
      
      const formData = {
        title: basicFormData.title || '',
        description: basicFormData.description || '',
        value: basicFormData.value || 0,
        status: basicFormData.status || 'active',
        firstPurchaseCashback: basicFormData.firstPurchaseCashback || 0
      };
      
      reset(formData);
    }
  }, [hasValidBasicData, basicFormData, reset]);

  // Callback memoizado para sincronizar dados com o contexto
  const syncToContext = useCallback((values: BasicInfoFormData) => {
    if (setBasicFormData) {
      const newData = {
        title: values.title || '',
        description: values.description || '',
        value: values.value || 0,
        status: values.status || 'active',
        firstPurchaseCashback: values.firstPurchaseCashback || 0
      };
      
      setBasicFormData(newData);
    }
  }, [setBasicFormData]);

  // Sincronizar mudanças no formulário com o contexto (debounced)
  useEffect(() => {
    // Só sincronizar se tiver dados válidos no form
    if (formValues.title || formValues.value > 0) {
      const timeoutId = setTimeout(() => {
        syncToContext(formValues);
      }, 100); // Pequeno delay para evitar sincronizações excessivas

      return () => clearTimeout(timeoutId);
    }
  }, [formValues, syncToContext]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-1">Informações Básicas</h2>
        <p className="text-sm text-gray-600">Configure os dados principais do plano</p>
      </div>

      <div className="space-y-6">
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
            <Label htmlFor="value">Valor *</Label>
            <CurrencyInput
              value={watch("value")}
              onChange={(value) => setValue("value", value)}
              placeholder="R$ 0,00"
            />
            {errors.value && (
              <span className="text-sm text-red-600">{errors.value.message}</span>
            )}
          </div>

          <div>
            <Label htmlFor="firstPurchaseCashback">Cashback da Primeira Compra</Label>
            <CurrencyInput
              value={watch("firstPurchaseCashback")}
              onChange={(value) => setValue("firstPurchaseCashback", value)}
              placeholder="R$ 0,00"
            />
            {errors.firstPurchaseCashback && (
              <span className="text-sm text-red-600">{errors.firstPurchaseCashback.message}</span>
            )}
          </div>
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
    </div>
  );
});

BasicInfoTabComponent.displayName = 'BasicInfoTab';

export { BasicInfoTabComponent as BasicInfoTab };
