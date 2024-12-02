import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PlansCard = () => {
  return (
    <Card className="h-full rounded-none">
      <CardHeader className="p-2">
        <CardTitle className="text-center">Planos</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <p className="text-center text-muted-foreground">
          Informações sobre seus planos serão exibidas aqui.
        </p>
      </CardContent>
    </Card>
  );
};