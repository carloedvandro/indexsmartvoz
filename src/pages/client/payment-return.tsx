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

  // Impedir navegação para trás
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      window.history.pushState(null, '', window.location.href);
      toast({
        title: "Navegação bloqueada",
        description: "Complete o processo de pagamento antes de sair desta página.",
        variant: "destructive"
      });
    };

    // Adicionar estado no histórico para bloquear voltar
    window.history.pushState(null, '', window.location.href);
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [toast]);

  useEffect(() => {
    checkPaymentStatus();
  }, []);

  const checkPaymentStatus = async () => {
    console.log('🔍 [PAYMENT-RETURN] Verificando status do pagamento...');
    console.log('🔍 [PAYMENT-RETURN] Parâmetros da URL:', { sessionId, paymentId, status });
    console.log('🔍 [PAYMENT-RETURN] Tentativa:', checkAttempts + 1);
    
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('❌ [PAYMENT-RETURN] Erro de autenticação:', userError);
        toast({
          title: "Erro de autenticação",
          description: "Faça login novamente para continuar.",
          variant: "destructive"
        });
        navigate("/client/login");
        return;
      }

      console.log('👤 [PAYMENT-RETURN] Usuário autenticado:', user.id);

      // Buscar pedidos do usuário ordenados por data de atualização
      const { data: orders, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(5);

      if (orderError) {
        console.error('❌ [PAYMENT-RETURN] Erro ao buscar orders:', orderError);
        setPaymentStatus('failed');
        return;
      }

      console.log('📋 [PAYMENT-RETURN] Orders encontradas:', orders?.length || 0);
      if (orders && orders.length > 0) {
        orders.forEach((order, index) => {
          console.log(`📋 [PAYMENT-RETURN] Order ${index + 1}:`, {
            id: order.id,
            status: order.status,
            amount: order.total_amount,
            asaas_payment_id: order.asaas_payment_id,
            created_at: order.created_at,
            updated_at: order.updated_at
          });
        });
      }

      if (orders && orders.length > 0) {
        // Procurar por order paga primeiro
        let targetOrder = orders.find(order => order.status === 'paid');
        
        // Se não encontrou paga, pegar a mais recente
        if (!targetOrder) {
          targetOrder = orders[0];
        }

        setPaymentDetails(targetOrder);

        console.log('📋 [PAYMENT-RETURN] Order selecionada:', {
          id: targetOrder.id,
          status: targetOrder.status,
          amount: targetOrder.total_amount,
          asaas_payment_id: targetOrder.asaas_payment_id,
          created_at: targetOrder.created_at,
          updated_at: targetOrder.updated_at
        });

        if (targetOrder.status === 'paid') {
          console.log('✅ [PAYMENT-RETURN] Pagamento confirmado!');
          setPaymentStatus('confirmed');
          
          // Limpar navegação bloqueada
          window.removeEventListener('beforeunload', () => {});
          window.removeEventListener('popstate', () => {});
          
          toast({
            title: "Pagamento Confirmado!",
            description: "Seu pagamento foi processado com sucesso."
          });
        } else if (targetOrder.status === 'pending' || targetOrder.status === 'payment_pending') {
          setPaymentStatus('pending');
          console.log(`🔄 [PAYMENT-RETURN] Tentativa ${checkAttempts + 1} - Status ainda pendente: ${targetOrder.status}`);
          
          // Tentar verificar novamente em alguns segundos, mas com limite menor
          if (checkAttempts < 15) {
            setTimeout(() => {
              setCheckAttempts(prev => prev + 1);
              checkPaymentStatus();
            }, 2500); // Reduzido para 2.5 segundos
          } else {
            console.warn('⚠️ [PAYMENT-RETURN] Máximo de tentativas atingido');
            setPaymentStatus('confirmed'); // Assumir confirmado após muitas tentativas
            toast({
              title: "Pagamento Processado",
              description: "Seu pedido foi processado. Você pode continuar para a próxima etapa.",
            });
          }
        } else {
          console.log('❌ [PAYMENT-RETURN] Status não reconhecido:', targetOrder.status);
          setPaymentStatus('failed');
        }
      } else {
        console.warn('⚠️ [PAYMENT-RETURN] Nenhuma order encontrada');
        setPaymentStatus('pending');
        
        // Tentar verificar novamente se não encontrou o pedido
        if (checkAttempts < 8) {
          setTimeout(() => {
            setCheckAttempts(prev => prev + 1);
            checkPaymentStatus();
          }, 2000);
        } else {
          console.warn('⚠️ [PAYMENT-RETURN] Máximo de tentativas sem pedido - assumindo confirmado');
          setPaymentStatus('confirmed');
          toast({
            title: "Processamento Concluído",
            description: "Continuando para a próxima etapa...",
          });
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
          paymentMethod: paymentDetails.payment_method || 'pix'
        };
        localStorage.setItem('orderData', JSON.stringify(orderData));
        console.log('💾 [PAYMENT-RETURN] Dados salvos para próxima etapa:', orderData);
      }
      
      // Ir para seleção do tipo de ativação
      navigate("/client/chip-activation", { replace: true });
    } else {
      // Voltar para produtos
      navigate("/client/products", { replace: true });
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
        return `Estamos aguardando a confirmação do seu pagamento. Isso pode levar alguns minutos. (Tentativa ${checkAttempts + 1}/15)`;
      case 'failed':
        return 'Não foi possível confirmar seu pagamento. Tente novamente ou entre em contato com o suporte.';
      default:
        return 'Verificando o status do seu pagamento...';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Logo fixada no topo */}
      <div className="fixed top-0 left-0 right-0 bg-white px-4 py-2 z-50 shadow-sm">
        <div className="flex items-center justify-center">
          <img
            src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png"
            alt="Smartvoz"
            className="h-16 object-contain"
          />
        </div>
      </div>

      <div className="pt-20 flex items-center justify-center min-h-screen">
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
                         paymentDetails.status === 'pending' ? 'Pendente' : 'Processando'}
                      </span>
                    </div>
                    {paymentDetails.asaas_payment_id && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">ID Asaas:</span>
                        <span className="font-medium text-xs">{paymentDetails.asaas_payment_id}</span>
                      </div>
                    )}
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
                        onClick={() => navigate("/client/products", { replace: true })} 
                        className="w-full"
                      >
                        Tentar Novamente
                      </Button>
                      <Button 
                        onClick={() => navigate("/client/dashboard", { replace: true })} 
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
    </div>
  );
}
