import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Smartphone, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const ASAAS_EDGE_PAYMENT_URL = "/functions/asaas-payment"; // Edge Function route

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'select' | 'processing' | 'success'>('select');
  const [selectedPayment, setSelectedPayment] = useState<'pix' | 'card' | null>(null);

  const { selectedLines, selectedDueDate } = location.state || {};

  useEffect(() => {
    if (!selectedLines || selectedLines.length === 0) {
      toast({
        title: "Erro",
        description: "Nenhum plano selecionado. Redirecionando...",
        variant: "destructive",
      });
      navigate("/client/plan-selection");
    }
  }, [selectedLines, navigate]);

  const calculateTotal = () => {
    return selectedLines?.reduce((total: number, line: any) => total + line.price, 0) || 0;
  };

  const handlePayment = async () => {
    if (!selectedPayment) {
      toast({
        title: "Selecione uma forma de pagamento",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setPaymentStep('processing');

    // Simulate payment processing
    setTimeout(async () => {
      try {
        const orderData = {
          selectedLines,
          selectedDueDate,
          paymentMethod: selectedPayment,
          total: calculateTotal(),
          protocol: new Date().getTime().toString(),
          status: 'paid'
        };

        // Salvar dados do pedido no localStorage para uso na ativação do chip
        localStorage.setItem('orderData', JSON.stringify(orderData));

        setPaymentStep('success');
        setIsProcessing(false);
        
        toast({
          title: "Pagamento Aprovado!",
          description: "Redirecionando para ativação do chip..."
        });

        // Navigate to chip activation after 2 seconds
        setTimeout(() => {
          navigate("/client/chip-activation");
        }, 2000);
      } catch (error) {
        setIsProcessing(false);
        setPaymentStep('select');
      }
    }, 3000);
  };

  const handleAsaasPayment = async () => {
    if (!selectedLines?.length) return;

    // Simples, assume um único produto/plano. Personalize conforme necessário:
    const plan = selectedLines[0];
    const name = localStorage.getItem("checkoutName") || "Cliente";
    const email = localStorage.getItem("checkoutEmail") || "cliente@placeholder.com";

    const cpfCnpj = localStorage.getItem("checkoutCpf") || "";
    const phone = localStorage.getItem("checkoutPhone") || "";
    const value = plan.price;
    const dueDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    setIsProcessing(true);

    try {
      const res = await fetch(ASAAS_EDGE_PAYMENT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          cpfCnpj,
          phone,
          value,
          dueDate,
          webhookUrl: `${window.location.origin}/functions/asaas-webhook`
        }),
      });

      const data = await res.json();
      if (data.error) {
        setIsProcessing(false);
        toast({ title: "Erro no pagamento", description: data.error.message || "Erro desconhecido", variant: "destructive" });
        return;
      }
      // Redireciona para link de pagamento
      window.location.href = data.invoiceUrl;
    } catch (e) {
      setIsProcessing(false);
      toast({ title: "Erro ao conectar ao Asaas", description: "Tente novamente.", variant: "destructive" });
    }
  };

  const handleBack = () => {
    navigate("/client/products");
  };

  if (paymentStep === 'processing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <motion.div 
          className="text-center" 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Processando Pagamento</h2>
          <p className="text-gray-600">Aguarde enquanto validamos seu pagamento...</p>
        </motion.div>
      </div>
    );
  }

  if (paymentStep === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <motion.div 
          className="text-center" 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
        >
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Pagamento Aprovado!</h2>
          <p className="text-gray-600 mb-4">Redirecionando para ativação do chip...</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500">Protocolo: {new Date().getTime().toString()}</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
              <p className="text-gray-600">Finalize seu pedido</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Resumo do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedLines?.map((line: any, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{line.internet}</p>
                      <p className="text-sm text-gray-600">{line.type}</p>
                      {line.ddd && <p className="text-sm text-gray-600">DDD: {line.ddd}</p>}
                    </div>
                    <p className="font-medium">R$ {line.price.toFixed(2)}</p>
                  </div>
                ))}
                
                {selectedDueDate && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 pt-2 border-t">
                    <Clock className="h-4 w-4" />
                    Vencimento: Todo dia {selectedDueDate}
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total</span>
                    <span className="text-green-600">R$ {calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Forma de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant={selectedPayment === 'pix' ? "default" : "outline"}
                    className="h-20 flex flex-col items-center justify-center"
                    onClick={() => setSelectedPayment('pix')}
                  >
                    <div className="text-2xl mb-1">💰</div>
                    <span>PIX</span>
                    <span className="text-xs text-gray-600">Aprovação instantânea</span>
                  </Button>

                  <Button
                    variant={selectedPayment === 'card' ? "default" : "outline"}
                    className="h-20 flex flex-col items-center justify-center"
                    onClick={() => setSelectedPayment('card')}
                  >
                    <CreditCard className="h-6 w-6 mb-1" />
                    <span>Cartão</span>
                    <span className="text-xs text-gray-600">Débito ou Crédito</span>
                  </Button>
                </div>

                <Button
                  className="w-full h-12 text-lg"
                  onClick={handleAsaasPayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Gerando cobrança..." : `Pagar R$ ${calculateTotal().toFixed(2)}`}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  <p>🔒 Pagamento 100% seguro</p>
                  <p>Seus dados estão protegidos</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm">
        
      </div>
    </div>
  );
}
