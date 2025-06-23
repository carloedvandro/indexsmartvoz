
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePlanForm } from "../PlanFormProvider";
import { useEffect, useRef } from "react";

interface BasicInfoFormData {
  title: string;
  description: string;
  value: number;
  status: string;
}

export function BasicInfoTab() {
  const { basicFormData, setBasicFormData } = usePlanForm();
  const isInitialized = useRef(false);

  const { register, setValue, watch, formState: { errors }, reset } = useForm<BasicInfoFormData>({
    defaultValues: {
      title: basicFormData?.title || '',
      description: basicFormData?.description || '',
      value: basicFormData?.value || 0,
      status: basicFormData?.status || 'active',
    }
  });

  // Inicializar o formulário com os dados do contexto apenas uma vez
  useEffect(() => {
    if (basicFormData && !isInitialized.current) {
      reset({
        title: basicFormData.title || '',
        description: basicFormData.description || '',
        value: basicFormData.value || 0,
        status: basicFormData.status || 'active'
      });
      isInitialized.current = true;
    }
  }, [basicFormData, reset]);

  // Observar mudanças no formulário e sincronizar com o contexto
  const formValues = watch();
  
  useEffect(() => {
    // Sincronizar os valores do formulário com o contexto apenas se já foi inicializado
    if (setBasicFormData && isInitialized.current) {
      setBasicFormData({
        title: formValues.title || '',
        description: formValues.description || '',
        value: formValues.value || 0,
        status: formValues.status || 'active'
      });
    }
  }, [formValues, setBasicFormData]);

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
      </div>
    </div>
  );
}
