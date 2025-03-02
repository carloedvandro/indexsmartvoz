
import React from 'react';

export const Logo = () => {
  return (
    <div className="flex justify-center items-center">
      <img 
        src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png" 
        alt="Smartvoz" 
        className="h-10 w-auto md:h-12 md:w-auto logo-image"
        style={{ 
          maxWidth: '200px',
          objectFit: 'contain',
          filter: 'drop-shadow(0 0 0.1rem rgba(0,0,0,0.05))',
          marginTop: '0px'  // Removed margin to position logo normally
        }}
      />
    </div>
  );
};
