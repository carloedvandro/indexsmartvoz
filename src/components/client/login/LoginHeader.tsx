
import React from 'react';

interface LoginHeaderProps {
  itemVariants: any;
}

export function LoginHeader({ itemVariants }: LoginHeaderProps) {
  const titleStyle = "text-3xl font-semibold bg-gradient-to-r from-color-1 via-color-2 to-color-3 bg-clip-text text-transparent [text-shadow:_2px_2px_2px_rgb(0_0_0_/_20%)] animate-rainbow bg-[length:200%_auto] -mt-1";

  return (
    <div className="flex flex-col items-center justify-center space-y-2 text-center min-h-[160px]">
      <div className="login-logo-container">
        <h1 className={titleStyle}>
          Smartvoz
        </h1>
      </div>
    </div>
  );
}
