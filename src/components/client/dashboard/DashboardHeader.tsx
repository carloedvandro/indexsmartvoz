import { Header1 } from "@/components/ui/header";

export interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export function DashboardHeader({ title, subtitle, icon }: DashboardHeaderProps) {
  return <Header1 />;
}