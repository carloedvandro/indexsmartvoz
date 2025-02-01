import { Card, CardContent } from "@/components/ui/card";

export function BarcodeInstructionsStep() {
  return (
    <Card className="md:col-span-2 max-w-4xl mx-auto w-full">
      <CardContent className="pt-6 space-y-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Confira como você encontra o código de barras do SIM card</h2>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">COMO ENCONTRAR?</h3>
            <p className="text-gray-600">
              O código de barras está impresso no cartão do Vivo Chip, tem 20 números e começa com 8955, conforme o exemplo:
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg flex justify-center">
              <img 
                src="/lovable-uploads/56082e79-b54d-4d20-b899-b44e7edec8d6.png" 
                alt="Exemplo de código de barras do SIM card"
                className="w-[90%] h-auto"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}