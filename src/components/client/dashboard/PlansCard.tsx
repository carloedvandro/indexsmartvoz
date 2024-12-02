import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PlansCard = () => {
  return (
    <Card className="h-full">
      <CardHeader className="py-4 px-0">
        <CardTitle className="text-center">Planos</CardTitle>
      </CardHeader>
      <CardContent className="py-4 px-0">
        <p className="text-center text-muted-foreground">
          Informações sobre seus planos serão exibidas aqui.
        </p>
      </CardContent>
    </Card>
  );
};