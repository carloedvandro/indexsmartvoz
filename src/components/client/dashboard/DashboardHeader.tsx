import { ReactNode } from "react";

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
}

export function DashboardHeader({ title, subtitle, icon }: DashboardHeaderProps) {
  return (
    <div className="border-b bg-white">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center gap-4">
          {icon}
          <div>
            <h2 className="text-lg font-medium">{title}</h2>
            <p className="text-sm text-muted-foreground">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}