
import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlanFormTabs } from "@/components/admin/plans/add-edit/PlanFormTabs";
import { PlanFormSidebar } from "@/components/admin/plans/add-edit/PlanFormSidebar";
import { PlanFormProvider } from "@/components/admin/plans/add-edit/PlanFormProvider";
import { useToast } from "@/hooks/use-toast";

export default function AdminPlanAddEdit() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('id');
  const isEditing = !!planId;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
          valueType: level.fixed_value !== null ? 'fixed' : 'percentage',
          fixedValue: level.fixed_value,
          percentage: level.percentage ? level.percentage * 100 : 0
        }))
      };

      return processedData;
    },
    enabled: !!planId
  });

  const handleBack = () => {
    navigate('/admin/plans');
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      // Aqui você pode adicionar a lógica de salvamento
      // Por enquanto, apenas simulamos o salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Sucesso",
        description: isEditing ? "Plano atualizado com sucesso!" : "Plano criado com sucesso!",
      });
      
      navigate('/admin/plans');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar plano. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <PlanFormProvider initialData={planData}>
      <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
        {/* Top Navbar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
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
          <Card className="w-full max-w-6xl mx-auto">
            <CardContent className="p-0">
              {/* Navigation Tabs horizontais */}
              <div className="border-b border-gray-200">
                <PlanFormSidebar />
              </div>
              
              {/* Content Area */}
              <div className="p-6">
                <PlanFormTabs />
              </div>
            </CardContent>
          </Card>
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
    </PlanFormProvider>
  );
}
