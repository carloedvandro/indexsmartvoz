
import React from 'react';

interface TotalRecordsProps {
  count: number;
}

export function TotalRecords({ count }: TotalRecordsProps) {
  return (
    <div className="flex justify-between items-center mt-4 px-2 text-sm w-full md:w-[680px] mx-auto">
      <div className="text-gray-600">
        Total de {count} registros
      </div>
      <div className="text-gray-700">
        Saldo anterior: <span className="font-medium">R$0,00</span>
      </div>
    </div>
  );
}
