
import React from 'react';

interface LoginHeaderProps {
  itemVariants?: any;
}

export function LoginHeader({ itemVariants }: LoginHeaderProps) {
  return (
    <div className="flex justify-center">
      <img
        src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png"
        alt="Smartvoz Logo"
        className="h-[80px] object-contain"
      />
    </div>
  );
}
