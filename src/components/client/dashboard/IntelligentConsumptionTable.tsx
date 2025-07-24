export function IntelligentConsumptionTable() {
  const tableData = [
    {
      nivel: "1º",
      clientes: 5,
      valorPorIndicado: "R$ 25,00",
      totalNivel: "R$ 125,00"
    },
    {
      nivel: "2º", 
      clientes: 25,
      valorPorIndicado: "R$ 5,00",
      totalNivel: "R$ 125,00"
    },
    {
      nivel: "3º",
      clientes: 125,
      valorPorIndicado: "R$ 5,00", 
      totalNivel: "R$ 625,00"
    },
    {
      nivel: "4º",
      clientes: 625,
      valorPorIndicado: "R$ 5,00",
      totalNivel: "R$ 3.125,00"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold text-center mb-6 text-purple-600">
        Consumo Inteligente
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-purple-700 to-purple-900">
              <th className="text-white px-4 py-3 text-left font-semibold rounded-tl-lg">Nível</th>
              <th className="text-white px-4 py-3 text-center font-semibold">Clientes</th>
              <th className="text-white px-4 py-3 text-center font-semibold">Valor por Indicado</th>
              <th className="text-white px-4 py-3 text-center font-semibold rounded-tr-lg">Total no Nível</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-4 font-semibold text-purple-600 border-l-4 border-pink-500">
                  {row.nivel} Nível
                </td>
                <td className="px-4 py-4 text-center font-medium">
                  {row.clientes}
                </td>
                <td className="px-4 py-4 text-center font-bold text-purple-700">
                  {row.valorPorIndicado}
                </td>
                <td className="px-4 py-4 text-center font-semibold">
                  {row.totalNivel}
                </td>
              </tr>
            ))}
            <tr className="bg-gradient-to-r from-purple-700 to-purple-900 text-white font-bold">
              <td className="px-4 py-4 rounded-bl-lg">Total</td>
              <td className="px-4 py-4 text-center">780</td>
              <td className="px-4 py-4 text-center">-</td>
              <td className="px-4 py-4 text-center rounded-br-lg">R$ 4.000,00</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <p className="text-center mt-4 font-semibold text-gray-600">
        Valor total a receber na recorrência
      </p>
    </div>
  );
}