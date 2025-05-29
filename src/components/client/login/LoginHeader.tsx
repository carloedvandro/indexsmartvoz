
import React from 'react';

interface LoginHeaderProps {
  itemVariants?: any;
}

export function LoginHeader({ itemVariants }: LoginHeaderProps) {
  const titleStyle = "text-3xl font-extrabold bg-gradient-to-r from-color-1 via-color-2 to-color-3 bg-clip-text text-transparent [text-shadow:_2px_2px_2px_rgb(0_0_0_/_20%)] animate-rainbow bg-[length:200%_auto] -mt-1";

  return (
    <div className="-mt-2.5">
      <img
        src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png"
        alt="Smartvoz Logo"
        className="h-[90px] object-contain mx-auto mix-blend-multiply opacity-90 contrast-125"
      />
    </div>
  );
}
