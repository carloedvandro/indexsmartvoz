
import React from 'react';

interface DetailedViewTitleProps {
  title: string;
}

export function DetailedViewTitle({ title }: DetailedViewTitleProps) {
  return (
    <div className="w-full md:w-[680px] mx-auto mb-4">
      <h2 className="text-xl font-semibold text-purple-900 mb-4">{title}</h2>
    </div>
  );
}
