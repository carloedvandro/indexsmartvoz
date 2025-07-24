
import "@/styles/logo.css";

export function DashboardHeader() {
  return (
    <div className="w-full px-5 py-4 flex justify-between items-center bg-white border-b border-gray-200 shadow-sm">
      <div className="saldo">
        <span className="text-sm text-gray-600">Saldo em conta</span>
        <strong className="block text-green-600 text-lg mt-1">R$ 269,18</strong>
      </div>
      
      <div className="logo text-xl font-bold">
        <span className="text-purple-700">SMART</span>
        <span className="text-pink-500">VOZ</span>
      </div>
      
      <div className="user-menu">
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded text-sm transition-colors">
          Sair
        </button>
      </div>
    </div>
  );
}