
import React from 'react';

interface WhatsAppIconProps {
  className?: string;
}

export const WhatsAppIcon: React.FC<WhatsAppIconProps> = ({ className }) => {
  return (
    <div className={className}>
      <img 
        src="/lovable-uploads/f0cdadd1-da36-463e-a204-77d294279fe7.png" 
        alt="WhatsApp Icon" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};
