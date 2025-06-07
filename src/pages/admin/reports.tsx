
import { AdminPageHeader } from "@/components/admin/common/AdminPageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, PieChart, TrendingUp, Users, Package, ShoppingCart } from "lucide-react";

export default function AdminReports() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <AdminPageHeader
          title="Módulo de Relatórios"
          subtitle="Análises e relatórios do sistema"
        />

        {/* Tipos de Relatórios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">Relatórios de Clientes</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">• Crescimento de base</p>
                <p className="text-sm text-gray-600">• Análise de engajamento</p>
                <p className="text-sm text-gray-600">• Segmentação por região</p>
                <p className="text-sm text-gray-600">• Churn rate</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-green-600" />
                <CardTitle className="text-lg">Relatórios de Vendas</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">• Performance por período</p>
                <p className="text-sm text-gray-600">• Conversão de leads</p>
                <p className="text-sm text-gray-600">• Análise de planos</p>
                <p className="text-sm text-gray-600">• Ticket médio</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-lg">Relatórios Financeiros</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">• Receita por período</p>
                <p className="text-sm text-gray-600">• Comissões por nível</p>
                <p className="text-sm text-gray-600">• Margem de lucro</p>
                <p className="text-sm text-gray-600">• Previsões</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Área Principal de Desenvolvimento */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Dashboard Analítico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded border-2 border-dashed border-gray-300">
                <BarChart3 className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Relatórios em Desenvolvimento
                </h3>
                <p className="text-gray-500 text-center max-w-md">
                  Sistema completo de relatórios com dashboards interativos, 
                  gráficos em tempo real e exportação de dados.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Análises Avançadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded border-2 border-dashed border-gray-300">
                <PieChart className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Análises Personalizadas
                </h3>
                <p className="text-gray-500 text-center max-w-md">
                  Relatórios customizáveis com filtros avançados, 
                  comparativos e insights de negócio.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Funcionalidades Futuras */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Funcionalidades Planejadas para Relatórios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg">
                <Package className="h-8 w-8 text-blue-600 mb-2" />
                <h4 className="font-medium mb-2">Relatórios de Planos</h4>
                <p className="text-sm text-gray-600">
                  Performance dos planos, conversões e preferências dos clientes.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <Users className="h-8 w-8 text-green-600 mb-2" />
                <h4 className="font-medium mb-2">Análise de Rede</h4>
                <p className="text-sm text-gray-600">
                  Crescimento da rede multinível, performance por níveis.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
                <h4 className="font-medium mb-2">Dashboards Executivos</h4>
                <p className="text-sm text-gray-600">
                  KPIs executivos, métricas de crescimento e forecasting.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <BarChart3 className="h-8 w-8 text-orange-600 mb-2" />
                <h4 className="font-medium mb-2">Exportação</h4>
                <p className="text-sm text-gray-600">
                  Exportação em PDF, Excel e integração com BI tools.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
