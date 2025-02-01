import React from 'react';
import { LineGraph3D } from './LineGraph3D';

export const LineGraph3DGallery = () => {
  const variants: Array<'ribbon' | 'tube' | 'particles' | 'neon' | 'wave'> = [
    'ribbon',
    'tube',
    'particles',
    'neon',
    'wave'
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {variants.map((variant) => (
        <div key={variant} className="bg-white rounded-xl shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 capitalize">
            {variant} Visualization
          </h3>
          <LineGraph3D variant={variant} />
        </div>
      ))}
    </div>
  );
};