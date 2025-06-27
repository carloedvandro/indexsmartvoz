
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function SecurityPasswordTabs() {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-fit">
        <Button 
          variant="ghost" 
          className="text-gray-600 px-4 py-2"
          onClick={() => navigate("/client/profile/change-password")}
        >
          🔐 Alterar Senha
        </Button>
        <Button className="bg-teal-500 text-white px-4 py-2 rounded-md">
          🛡️ Senha de Segurança
        </Button>
        <Button 
          variant="ghost" 
          className="text-gray-600 px-4 py-2"
          onClick={() => navigate("/client/profile/two-factor")}
        >
          🔒 Autenticação de Dois Fatores
        </Button>
        <Button 
          variant="ghost" 
          className="text-gray-600 px-4 py-2"
          onClick={() => navigate("/client/profile/configurations")}
        >
          ⚙️ Configurações
        </Button>
      </div>
    </div>
  );
}
