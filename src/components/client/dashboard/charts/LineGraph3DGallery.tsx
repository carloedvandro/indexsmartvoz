import React from 'react';
import { LineGraph3D } from './LineGraph3D';

const defaultData = [
  { x: 0, y: 0.5, z: 0 },
  { x: 1, y: 0.7, z: 0 },
  { x: 2, y: 0.9, z: 0 },
  { x: 3, y: 0.8, z: 0 },
  { x: 4, y: 0.6, z: 0 },
  { x: 5, y: 0.4, z: 0 },
  { x: 6, y: 0.3, z: 0 },
  { x: 7, y: 0.5, z: 0 },
];

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
          <LineGraph3D 
            variant={variant} 
            data={defaultData}
            color="#D6BCFA"
          />
        </div>
      ))}
    </div>
  );
};