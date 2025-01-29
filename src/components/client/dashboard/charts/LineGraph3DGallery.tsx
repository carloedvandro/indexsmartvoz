import React from 'react';
import { LineGraph3D } from './LineGraph3D';

export const LineGraph3DGallery = () => {
  const variants: Array<'gradient1' | 'gradient2' | 'gradient3' | 'gradient4' | 'gradient5'> = [
    'gradient1',
    'gradient2',
    'gradient3',
    'gradient4',
    'gradient5'
  ];

  const gradientNames = {
    gradient1: "Emerald Flow",
    gradient2: "Royal Pulse",
    gradient3: "Rose Wave",
    gradient4: "Ocean Drift",
    gradient5: "Ruby Surge"
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {variants.map((variant) => (
        <div key={variant} className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            {gradientNames[variant]}
          </h3>
          <LineGraph3D variant={variant} />
        </div>
      ))}
    </div>
  );
};