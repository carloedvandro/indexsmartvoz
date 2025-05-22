
import React from 'react';
import Image from "@/components/ui/image";

interface LoginHeaderProps {
  itemVariants?: any;
}

export function LoginHeader({ itemVariants }: LoginHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 text-center min-h-[160px]">
      <div className="login-logo-container">
        <Image 
          src="/lovable-uploads/76260bd0-7526-47c9-b4c1-38599c646779.png" 
          alt="Smartvoz Logo" 
          className="h-14 w-auto" 
        />
      </div>
    </div>
  );
}
