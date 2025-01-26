import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, AlertTriangle } from 'lucide-react';

export default function ValidationRequired() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Validação Pendente
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Para acessar sua conta, precisamos confirmar sua identidade
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <FileText className="h-5 w-5 text-purple-600" />
            <span>
              É necessário completar o processo de validação de documentos antes de
              acessar sua conta.
            </span>
          </div>

          <Button
            onClick={() => navigate('/client/login')}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Iniciar Validação
          </Button>

          <p className="text-xs text-center text-gray-500">
            Este é um procedimento de segurança obrigatório para todos os usuários.
          </p>
        </div>
      </div>
    </div>
  );
}