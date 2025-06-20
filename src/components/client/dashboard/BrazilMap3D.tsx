
import React from 'react';

export function BrazilMap3D() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Mapa do Brasil</h3>
      <div className="flex justify-center items-center">
        <img 
          src="/lovable-uploads/4d7efd52-5fe3-48e0-809a-72113be0bd16.png" 
          alt="Mapa 3D do Brasil dividido por regiões" 
          className="max-w-full h-auto max-h-96 object-contain"
        />
      </div>
    </div>
  );
}
