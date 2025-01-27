import { Home } from "lucide-react";

export interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export function DashboardHeader({ title, subtitle, icon }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center gap-2">
        {icon || <Home className="h-5 w-5" />}
        <div>
          <h1 className="text-xl font-semibold">{title || "Dashboard"}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}