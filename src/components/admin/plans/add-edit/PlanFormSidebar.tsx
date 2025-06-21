
import { User, BarChart3, Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlanForm } from "./PlanFormProvider";

const menuItems = [
  {
    id: 'informacoes',
    title: 'Informações',
    icon: User,
    description: 'Dados básicos do plano'
  },
  {
    id: 'niveis',
    title: 'Níveis',
    icon: BarChart3,
    description: 'Configuração de cashback'
  },
  {
    id: 'beneficios',
    title: 'Benefícios',
    icon: Gift,
    description: 'Lista de benefícios'
  }
];

export function PlanFormSidebar() {
  const { activeTab, setActiveTab } = usePlanForm();

  return (
    <div className="px-6 py-4">
      <div className="overflow-x-auto">
        <nav className="flex space-x-8 min-w-max">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                activeTab === item.id
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn(
                "h-4 w-4 flex-shrink-0",
                activeTab === item.id ? "text-blue-600" : "text-gray-400"
              )} />
              <span>{item.title}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
