
import React from 'react';

export const Logo = () => {
  return (
    <div className="flex justify-center items-center h-full -mt-3">
      <img 
        src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png" 
        alt="Smartvoz" 
        className="h-[100px] w-auto object-contain"
        style={{ 
          maxWidth: '200px',
          filter: 'drop-shadow(0 0 0.1rem rgba(0,0,0,0.05))'
        }}
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
};
