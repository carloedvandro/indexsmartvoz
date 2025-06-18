import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  type?: "default" | "warning" | "success";
}

const typeToColorMap = {
  default: "text-muted-foreground",
  warning: "text-yellow-500",
  success: "text-green-500",
};

export function DashboardCard({ title, value, description, type = "default" }: DashboardCardProps) {
  const colorClass = typeToColorMap[type] || typeToColorMap["default"];
  const { toast } = useToast();

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className={`text-xs ${colorClass}`}>{description}</p>}
      </CardContent>
    </Card>
  );
}
