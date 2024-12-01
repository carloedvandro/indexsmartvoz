import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PlansCard = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Planos</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm sm:text-base text-muted-foreground">
          Informações sobre seus planos serão exibidas aqui.
        </p>
      </CardContent>
    </Card>
  );
};