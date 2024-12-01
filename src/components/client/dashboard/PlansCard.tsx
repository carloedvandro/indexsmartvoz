import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PlansCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Planos</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Informações sobre seus planos serão exibidas aqui.
        </p>
      </CardContent>
    </Card>
  );
};