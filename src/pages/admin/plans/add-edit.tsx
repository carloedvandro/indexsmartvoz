import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlanFormTabs } from "@/components/admin/plans/add-edit/PlanFormTabs";
import { PlanFormSidebar } from "@/components/admin/plans/add-edit/PlanFormSidebar";
import { PlanFormProvider, usePlanForm } from "@/components/admin/plans/add-edit/PlanFormProvider";
import { useToast } from "@/hooks/use-toast";

function AdminPlanAddEditContent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('id');
  const isEditing = !!planId;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { basicFormData, cashbackLevels, benefits } = usePlanForm();

  const handleBack = () => {
    navigate('/admin/plans');
  };

  const handleSave = async () => {
    if (!basicFormData) {
      toast({
        title: "Erro",
        description: "Dados básicos não encontrados. Preencha os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    if (!basicFormData.title || basicFormData.value <= 0) {
      toast({
        title: "Erro",
        description: "Título e valor são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      let savedPlanId = planId;
      
      // Salvar/atualizar o plano principal
      if (planId) {
        // Atualizar plano existente
        const { error: planError } = await supabase
          .from('plans')
          .update({
            title: basicFormData.title,
            description: basicFormData.description,
            value: basicFormData.value,
            status: basicFormData.status,
            updated_at: new Date().toISOString()
          })
          .eq('id', planId);

        if (planError) throw planError;
      } else {
        // Criar novo plano
        const { data: newPlan, error: planError } = await supabase
          .from('plans')
          .insert({
            title: basicFormData.title,
            description: basicFormData.description,
            value: basicFormData.value,
            status: basicFormData.status
          })
          .select()
          .single();

        if (planError) throw planError;
        savedPlanId = newPlan.id;
      }

      // Deletar cashback levels existentes se estiver editando
      if (planId) {
        await supabase
          .from('plan_cashback_levels')
          .delete()
          .eq('plan_id', planId);
      }

      // Inserir novos cashback levels
      if (cashbackLevels.length > 0) {
        const cashbackData = cashbackLevels.map(level => ({
          plan_id: savedPlanId,
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
      if (planId) {
        await supabase
          .from('plan_benefits')
          .delete()
          .eq('plan_id', planId);
      }

      // Inserir novos benefits
      if (benefits.length > 0) {
        const benefitsData = benefits.map(benefit => ({
          plan_id: savedPlanId,
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
        description: isEditing ? "Plano atualizado com sucesso!" : "Plano criado com sucesso!",
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
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Top Navbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
              <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">
              {isEditing ? 'Editar Plano' : 'Adicionar Plano'}
            </h1>
          </div>

          {/* Botão de ação - visível apenas no desktop */}
          <div className="hidden md:block">
          
            <Button
              onClick={handleSave}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isEditing ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {isSubmitting ? "Salvando..." : (isEditing ? "Atualizar" : "Adicionar")}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Layout responsivo: Mobile - sidebar no topo, Desktop - sidebar à esquerda */}
        <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
          {/* Sidebar - Mobile: topo, Desktop: esquerda */}
          <div className="w-full md:w-80 md:flex-shrink-0">
            <Card className="w-full">
              <CardContent className="p-0">
                <PlanFormSidebar />
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo principal */}
          <div className="flex-1">
                <PlanFormTabs />
          </div>
        </div>
      </div>

      {/* Botão fixo no bottom para mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:hidden">
        <Button
          onClick={handleSave}
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2"
          size="lg"
        >
          {isEditing ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {isSubmitting ? "Salvando..." : (isEditing ? "Atualizar" : "Adicionar")}
        </Button>
      </div>
    </div>
  );
}

export default function AdminPlanAddEdit() {
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('id');

  // Query para buscar dados do plano se estiver editando
  const { data: planData, isLoading } = useQuery({
    queryKey: ['plan-edit', planId],
    queryFn: async () => {
      if (!planId) return null;

      const { data, error } = await supabase
        .from('plans')
        .select(`
          *,
          cashback_levels:plan_cashback_levels(*),
          benefits:plan_benefits(*)
        `)
        .eq('id', planId)
        .single();

      if (error) throw error;

      // Processar os dados para adicionar valueType aos cashback_levels
      const processedData = {
        ...data,
        cashback_levels: data.cashback_levels?.map((level: any) => ({
          ...level,
          id: level.id || Date.now() + Math.random(), // Garantir que tem ID
          valueType: level.fixed_value !== null ? 'fixed' : 'percentage',
          fixedValue: level.fixed_value || 0,
          percentage: level.percentage ? level.percentage * 100 : 0
        })) || [],
        benefits: data.benefits?.map((benefit: any) => ({
          ...benefit,
          id: benefit.id || Date.now() + Math.random() // Garantir que tem ID
        })) || []
      };

      console.log('Processed plan data:', processedData);
      return processedData;
    },
    enabled: !!planId
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <PlanFormProvider initialData={planData}>
      <AdminPlanAddEditContent />
    </PlanFormProvider>
  );
}
