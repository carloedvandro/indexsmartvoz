
import { Bell } from "lucide-react";

export function NotificationsHeader() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
          <Bell className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notificações</h1>
          <p className="text-gray-600">
            Acompanhe todas as atualizações e novidades do sistema
          </p>
        </div>
      </div>
    </div>
  );
}
