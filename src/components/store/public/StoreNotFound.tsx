import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export function StoreNotFound() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-lg mb-4">Loja não encontrada</p>
            <Button onClick={() => navigate(-1)}>Voltar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}