
import React from 'react';

export const Logo = () => {
  return (
    <div className="flex justify-center items-center h-full -mt-3">
      <div className="p-1 rounded-md bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-[length:200%_auto] animate-gradient">
        <img 
          src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png" 
          alt="Smartvoz" 
          className="h-[100px] w-auto object-contain bg-white"
          style={{ 
            maxWidth: '200px',
            filter: 'drop-shadow(0 0 0.1rem rgba(0,0,0,0.05))'
          }}
        />
      </div>
    </div>
  );
};

