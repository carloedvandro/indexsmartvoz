
import React from 'react';

export const Logo = () => {
  return (
    <div className="flex justify-center items-center h-full -mt-3">
      <img 
        src="/lovable-uploads/6476bb03-0467-42d7-ae08-31ae5f2da580.png" 
        alt="Smartvoz" 
        className="logo-image"
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
