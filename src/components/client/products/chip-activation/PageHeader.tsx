
import React from "react";

export function PageHeader() {
  const titleStyle = "text-3xl font-bold bg-gradient-to-r from-color-1 via-color-2 to-color-3 bg-clip-text text-transparent [text-shadow:_2px_2px_2px_rgb(0_0_0_/_20%)] animate-rainbow bg-[length:200%_auto] -mt-1";

  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <h1 className={titleStyle}>
        Smartvoz
      </h1>
    </div>
  );
}
