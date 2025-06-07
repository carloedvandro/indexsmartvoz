
import { AdminPageHeader } from "@/components/admin/common/AdminPageHeader";
import { AdminCard } from "@/components/admin/common/AdminCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, CreditCard, PiggyBank } from "lucide-react";

export default function AdminFinance() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <AdminPageHeader
          title="Módulo Financeiro"
          subtitle="Gestão financeira e controle de receitas"
        />

        {/* Cards de Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AdminCard
            title="Receita Total"
            value="R$ 0,00"
            icon={DollarSign}
            description="Receita acumulada"
            color="green"
          />
          <AdminCard
            title="Receita Mensal"
            value="R$ 0,00"
            icon={TrendingUp}
            description="Receita do mês atual"
            color="blue"
          />
          <AdminCard
            title="Comissões Pagas"
            value="R$ 0,00"
            icon={CreditCard}
            description="Total de comissões pagas"
            color="yellow"
          />
          <AdminCard
            title="Saldo Disponível"
            value="R$ 0,00"
            icon={PiggyBank}
            description="Saldo para saque"
            color="green"
          />
        </div>

        {/* Área de Desenvolvimento */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Relatório de Receitas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded border-2 border-dashed border-gray-300">
                <DollarSign className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Módulo em Desenvolvimento
                </h3>
                <p className="text-gray-500 text-center max-w-md">
                  O módulo financeiro está sendo desenvolvido e incluirá relatórios detalhados de receitas, 
                  gestão de comissões e controle de pagamentos.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gestão de Comissões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded border-2 border-dashed border-gray-300">
                <CreditCard className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Em Breve
                </h3>
                <p className="text-gray-500 text-center max-w-md">
                  Sistema completo de gestão de comissões por níveis, 
                  controle de pagamentos e histórico de transações.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Funcionalidades Futuras */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Funcionalidades Planejadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Relatórios Financeiros</h4>
                <p className="text-sm text-gray-600">
                  Dashboards com métricas financeiras, gráficos de receita e análise de performance.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Sistema de Comissões</h4>
                <p className="text-sm text-gray-600">
                  Cálculo automático de comissões por níveis, pagamentos e histórico completo.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Controle de Saques</h4>
                <p className="text-sm text-gray-600">
                  Gestão de solicitações de saque, aprovações e integrações bancárias.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
