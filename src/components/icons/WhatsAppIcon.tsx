
import React from 'react';

interface WhatsAppIconProps {
  className?: string;
}

export const WhatsAppIcon: React.FC<WhatsAppIconProps> = ({ className }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-full bg-white border-2 border-green-500 shadow-md"></div>
      <img 
        src="/lovable-uploads/f0cdadd1-da36-463e-a204-77d294279fe7.png" 
        alt="WhatsApp Icon" 
        className="relative w-full h-full object-contain p-1.5"
      />
    </div>
  );
};
