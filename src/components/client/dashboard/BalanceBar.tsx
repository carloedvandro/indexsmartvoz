
import { EyeOff, Bell, User, ChevronDown } from 'lucide-react';

export function BalanceBar() {
  return (
    <div className="w-full bg-white border-b border-gray-200 px-4 py-3">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">Saldo em conta</span>
            <span className="text-lg font-semibold text-green-600">R$ 269,18</span>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <EyeOff className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell className="h-5 w-5 text-gray-500" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
