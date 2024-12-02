import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PlansCard = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-center">Planos</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground">
          Informações sobre seus planos serão exibidas aqui.
        </p>
      </CardContent>
    </Card>
  );
};