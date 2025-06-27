
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, AlertCircle, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

/**
 * Purpose: Página de retorno após pagamento no Asaas
 * Verifica status do pagamento e redireciona para próxima etapa
 */

type PaymentStatus = 'checking' | 'confirmed' | 'pending' | 'failed';

export default function PaymentReturn() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('checking');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [checkAttempts, setCheckAttempts] = useState(0);

  // Obter parâmetros da URL
  const sessionId = searchParams.get('session_id');
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

  useEffect(() => {
    checkPaymentStatus();
  }, []);

  const checkPaymentStatus = async () => {
    console.log('🔍 [PAYMENT-RETURN] Verificando status do pagamento...');
    
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        toast({
          title: "Erro",
          description: "Usuário não autenticado. Redirecionando...",
          variant: "destructive"
        });
        navigate("/client/login");
        return;
      }

      // Buscar pedido do usuário mais recente
      const { data: orders, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (orderError) {
        console.error('❌ [PAYMENT-RETURN] Erro ao buscar orders:', orderError);
        setPaymentStatus('failed');
        return;
      }

      if (orders && orders.length > 0) {
        const latestOrder = orders[0];
        setPaymentDetails(latestOrder);

        console.log('📋 [PAYMENT-RETURN] Order encontrada:', {
          status: latestOrder.status,
          id: latestOrder.id,
          amount: latestOrder.total_amount
        });

        if (latestOrder.status === 'paid') {
          setPaymentStatus('confirmed');
          toast({
            title: "Pagamento Confirmado!",
            description: "Seu pagamento foi processado com sucesso."
          });
        } else if (latestOrder.status === 'pending') {
          setPaymentStatus('pending');
          // Tentar verificar novamente em alguns segundos
          if (checkAttempts < 10) {
            setTimeout(() => {
              setCheckAttempts(prev => prev + 1);
              checkPaymentStatus();
            }, 3000);
          }
        } else {
          setPaymentStatus('failed');
        }
      } else {
        setPaymentStatus('pending');
        // Tentar verificar novamente se não encontrou o pedido
        if (checkAttempts < 5) {
          setTimeout(() => {
            setCheckAttempts(prev => prev + 1);
            checkPaymentStatus();
          }, 2000);
        } else {
          setPaymentStatus('failed');
        }
      }
    } catch (error) {
      console.error('💥 [PAYMENT-RETURN] Erro ao verificar pagamento:', error);
      setPaymentStatus('failed');
    }
  };

  const handleContinue = () => {
    if (paymentStatus === 'confirmed') {
      // Salvar dados necessários para próxima etapa
      if (paymentDetails) {
        const orderData = {
          orderId: paymentDetails.id,
          status: 'paid',
          total: paymentDetails.total_amount,
          protocol: paymentDetails.id,
          paymentMethod: 'pix'
        };
        localStorage.setItem('orderData', JSON.stringify(orderData));
      }
      
      navigate("/client/chip-activation");
    } else {
      navigate("/client/products");
    }
  };

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'confirmed':
        return <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />;
      case 'pending':
        return <Clock className="h-16 w-16 text-yellow-600 mx-auto animate-pulse" />;
      case 'failed':
        return <AlertCircle className="h-16 w-16 text-red-600 mx-auto" />;
      default:
        return <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>;
    }
  };

  const getStatusTitle = () => {
    switch (paymentStatus) {
      case 'confirmed':
        return 'Pagamento Confirmado!';
      case 'pending':
        return 'Aguardando Confirmação';
      case 'failed':
        return 'Falha no Pagamento';
      default:
        return 'Verificando Pagamento...';
    }
  };

  const getStatusDescription = () => {
    switch (paymentStatus) {
      case 'confirmed':
        return 'Seu pagamento foi processado com sucesso. Você pode prosseguir para a ativação do chip.';
      case 'pending':
        return 'Estamos aguardando a confirmação do seu pagamento. Isso pode levar alguns minutos.';
      case 'failed':
        return 'Não foi possível confirmar seu pagamento. Tente novamente ou entre em contato com o suporte.';
      default:
        return 'Verificando o status do seu pagamento...';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="text-center">
            <CardHeader className="pb-4">
              <div className="mb-4">
                {getStatusIcon()}
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                {getStatusTitle()}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <p className="text-gray-600">
                {getStatusDescription()}
              </p>

              {paymentDetails && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Protocolo:</span>
                    <span className="font-medium">{paymentDetails.id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Valor:</span>
                    <span className="font-medium">R$ {paymentDetails.total_amount?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${
                      paymentDetails.status === 'paid' ? 'text-green-600' : 
                      paymentDetails.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {paymentDetails.status === 'paid' ? 'Pago' : 
                       paymentDetails.status === 'pending' ? 'Pendente' : 'Falhou'}
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {paymentStatus === 'confirmed' && (
                  <Button 
                    onClick={handleContinue} 
                    className="w-full h-12 text-lg"
                  >
                    Continuar para Ativação
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                )}

                {paymentStatus === 'pending' && (
                  <Button 
                    onClick={checkPaymentStatus} 
                    variant="outline" 
                    className="w-full"
                  >
                    Verificar Novamente
                  </Button>
                )}

                {paymentStatus === 'failed' && (
                  <div className="space-y-2">
                    <Button 
                      onClick={() => navigate("/client/products")} 
                      className="w-full"
                    >
                      Tentar Novamente
                    </Button>
                    <Button 
                      onClick={() => navigate("/client/dashboard")} 
                      variant="outline" 
                      className="w-full"
                    >
                      Voltar ao Dashboard
                    </Button>
                  </div>
                )}
              </div>

              {paymentStatus === 'checking' && (
                <p className="text-sm text-gray-500">
                  Tentativa {checkAttempts + 1} de verificação...
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
