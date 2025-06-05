
import { Bell } from "lucide-react";

export function EmptyNotifications() {
  return (
    <div className="bg-white rounded-lg border p-12 text-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <Bell className="w-8 h-8 text-gray-400" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma notificação
          </h3>
          <p className="text-gray-500 max-w-sm">
            Você está em dia! Quando houver novas atualizações ou atividades, 
            elas aparecerão aqui.
          </p>
        </div>
      </div>
    </div>
  );
}
