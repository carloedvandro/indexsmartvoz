
import { useLocation } from "react-router-dom";
import { FinancialHeader } from "@/components/client/financial/FinancialHeader";

export default function FinancialDetails() {
  const location = useLocation();
  const { type } = location.state || {};

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-white">
      <FinancialHeader />

      <div className="flex-1 overflow-auto bg-white">
        <div className="max-w-[1024px] mx-auto h-full flex flex-col">
          <div className="mt-[116px] p-6">
            <h2 className="text-2xl font-semibold mb-6">
              {type === 'balance' ? 'Detalhes do Saldo' : 'Detalhes dos Ganhos'}
            </h2>

            {/* Aqui você pode adicionar os detalhes específicos que deseja mostrar */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Resumo</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Disponível</span>
                      <span className="font-medium">R$ 5.000,01</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ganhos do Mês</span>
                      <span className="font-medium">R$ 2.500,00</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Histórico</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Último Pagamento</span>
                      <span className="font-medium">R$ 1.500,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Data</span>
                      <span className="font-medium">15/02/2024</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Transações Recentes</h3>
                <div className="space-y-4">
                  {[
                    { date: '20/02/2024', desc: 'Bônus de Rede', value: 'R$ 500,00' },
                    { date: '15/02/2024', desc: 'Comissão Direta', value: 'R$ 1.500,00' },
                    { date: '10/02/2024', desc: 'Bônus de Equipe', value: 'R$ 750,00' },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{item.desc}</p>
                        <p className="text-sm text-gray-500">{item.date}</p>
                      </div>
                      <span className="font-medium text-green-600">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
