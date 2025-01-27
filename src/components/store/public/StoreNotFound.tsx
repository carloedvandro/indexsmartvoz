import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export function StoreNotFound() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-red-500">
            Loja não encontrada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              O link que você acessou não está disponível ou foi removido.
            </p>
            <Button onClick={() => navigate(-1)}>Voltar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}