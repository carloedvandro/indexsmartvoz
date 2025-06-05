
import { ReactNode } from "react";

interface NavigationCardProps {
  children: ReactNode;
}

export function NavigationCard({ children }: NavigationCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {children}
    </div>
  );
}
