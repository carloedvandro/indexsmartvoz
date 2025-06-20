
import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import { CidadeData, EstadoData } from './types';

const estadosData: EstadoData[] = [
  { nome: 'São Paulo', vendas: 120000 },
  { nome: 'Rio de Janeiro', vendas: 80000 },
  { nome: 'Minas Gerais', vendas: 60000 },
  { nome: 'Bahia', vendas: 45000 },
  { nome: 'Paraná', vendas: 35000 },
  { nome: 'Rio Grande do Sul', vendas: 40000 },
];

const cidadesData: CidadeData[] = [
  { nome: 'São Paulo', estado: 'São Paulo', vendas: 70000, coordX: 520, coordY: 510 },
  { nome: 'Campinas', estado: 'São Paulo', vendas: 30000, coordX: 500, coordY: 480 },
  { nome: 'Santos', estado: 'São Paulo', vendas: 20000, coordX: 530, coordY: 520 },
  { nome: 'Rio de Janeiro', estado: 'Rio de Janeiro', vendas: 50000, coordX: 550, coordY: 470 },
  { nome: 'Niterói', estado: 'Rio de Janeiro', vendas: 30000, coordX: 570, coordY: 460 },
  { nome: 'Belo Horizonte', estado: 'Minas Gerais', vendas: 40000, coordX: 500, coordY: 440 },
  { nome: 'Uberlândia', estado: 'Minas Gerais', vendas: 20000, coordX: 480, coordY: 420 },
  { nome: 'Salvador', estado: 'Bahia', vendas: 45000, coordX: 460, coordY: 350 },
  { nome: 'Curitiba', estado: 'Paraná', vendas: 35000, coordX: 480, coordY: 550 },
  { nome: 'Porto Alegre', estado: 'Rio Grande do Sul', vendas: 40000, coordX: 470, coordY: 600 },
];

export const MapaBrasilInterativo: React.FC = () => {
  const [estadoSelecionado, setEstadoSelecionado] = useState<string | null>(null);
  const [cidadeHover, setCidadeHover] = useState<CidadeData | null>(null);

  // Filtra cidades do estado selecionado
  const cidadesDoEstado = estadoSelecionado
    ? cidadesData.filter(c => c.estado === estadoSelecionado)
    : [];

  const handleEstadoClick = (estadoNome: string) => {
    if (estadosData.find((e) => e.nome === estadoNome)) {
      setEstadoSelecionado(estadoSelecionado === estadoNome ? null : estadoNome);
      setCidadeHover(null);
    }
  };

  const dadosParaGrafico = cidadesDoEstado.length > 0 ? cidadesDoEstado : cidadesData;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Mapa do Brasil Interativo - Vendas de Planos
        </h3>
        {estadoSelecionado && (
          <button
            onClick={() => setEstadoSelecionado(null)}
            className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
          >
            Limpar seleção
          </button>
        )}
      </div>

      <div className="relative border border-gray-200 rounded-lg p-4 mb-8 bg-gradient-to-br from-blue-50 to-green-50">
        {/* Usando a imagem do mapa 3D existente */}
        <img 
          src="/lovable-uploads/0dad93aa-051a-49c8-9a6e-ffe6b5108e20.png" 
          alt="Mapa do Brasil" 
          className="w-full h-auto max-h-96 object-contain cursor-pointer"
          onClick={(e) => {
            // Simular clique em estados baseado na posição do clique
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            // Aproximação das regiões dos estados principais
            if (x > 70 && x < 90 && y > 70 && y < 85) {
              handleEstadoClick('São Paulo');
            } else if (x > 75 && x < 95 && y > 60 && y < 70) {
              handleEstadoClick('Rio de Janeiro');
            } else if (x > 65 && x < 80 && y > 55 && y < 70) {
              handleEstadoClick('Minas Gerais');
            }
          }}
        />

        {/* Pontos das cidades */}
        {cidadesDoEstado.map((cidade) => (
          <motion.div
            key={cidade.nome}
            className={`absolute w-4 h-4 rounded-full border-2 border-white cursor-pointer shadow-lg ${
              cidadeHover?.nome === cidade.nome ? 'bg-orange-500' : 'bg-blue-500'
            }`}
            style={{
              left: `${(cidade.coordX / 600) * 100}%`,
              top: `${(cidade.coordY / 700) * 100}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }}
            onMouseEnter={() => setCidadeHover(cidade)}
            onMouseLeave={() => setCidadeHover(null)}
            whileHover={{ scale: 1.5 }}
            animate={{ scale: cidadeHover?.nome === cidade.nome ? 1.3 : 1 }}
          />
        ))}

        {/* Tooltip da cidade */}
        {cidadeHover && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bg-white border border-gray-300 rounded-lg p-3 shadow-lg pointer-events-none z-20"
            style={{
              left: `${(cidadeHover.coordX / 600) * 100}%`,
              top: `${((cidadeHover.coordY - 40) / 700) * 100}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <h4 className="font-bold text-sm">{cidadeHover.nome}</h4>
            <p className="text-xs text-gray-600">Estado: {cidadeHover.estado}</p>
            <p className="text-xs text-gray-800">
              Vendas: {cidadeHover.vendas.toLocaleString('pt-BR')}
            </p>
          </motion.div>
        )}

        {estadoSelecionado && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <p className="text-sm font-medium text-gray-800">
              Estado selecionado: <span className="text-blue-600">{estadoSelecionado}</span>
            </p>
            <p className="text-xs text-gray-600">
              {cidadesDoEstado.length} cidades encontradas
            </p>
          </div>
        )}
      </div>

      {/* Gráfico de vendas por cidade */}
      <div className="mb-8">
        <h4 className="text-md font-semibold text-gray-800 mb-4">
          {estadoSelecionado ? `Vendas em ${estadoSelecionado}` : 'Vendas por Cidade'}
        </h4>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dadosParaGrafico}
              margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            >
              <XAxis 
                dataKey="nome" 
                angle={-45} 
                textAnchor="end" 
                interval={0} 
                height={80}
                tick={{ fontSize: 12 }}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <RechartsTooltip 
                formatter={(value) => [value.toLocaleString('pt-BR'), 'Vendas']}
                labelStyle={{ color: '#374151' }}
              />
              <Legend />
              <Bar 
                dataKey="vendas" 
                name="Vendas" 
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabela de vendas por cidade */}
      <div>
        <h4 className="text-md font-semibold text-gray-800 mb-4">
          Detalhamento das Vendas
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Cidade
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Estado
                </th>
                <th className="border border-gray-200 px-4 py-3 text-right text-sm font-medium text-gray-700">
                  Vendas
                </th>
              </tr>
            </thead>
            <tbody>
              {dadosParaGrafico.map((cidade, index) => (
                <tr key={cidade.nome} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-800">
                    {cidade.nome}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                    {cidade.estado}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-800 text-right font-medium">
                    {cidade.vendas.toLocaleString('pt-BR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
