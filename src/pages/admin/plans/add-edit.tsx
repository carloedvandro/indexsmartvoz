
import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlanFormTabs } from "@/components/admin/plans/add-edit/PlanFormTabs";
import { PlanFormSidebar } from "@/components/admin/plans/add-edit/PlanFormSidebar";
import { PlanFormProvider } from "@/components/admin/plans/add-edit/PlanFormProvider";

export default function AdminPlanAddEdit() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('id');
  const isEditing = !!planId;

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <PlanFormProvider initialData={planData}>
      <div className="min-h-screen bg-gray-50">
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
          </div>
        </div>

        {/* Main Content - apenas o formulário sem sidebar */}
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
      </div>
    </PlanFormProvider>
  );
}
