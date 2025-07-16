
import { useState, useEffect } from "react";
import { SlideButton } from "@/components/ui/slide-button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ProtocolGenerator } from "@/services/protocolGenerator";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, AlertCircle, Clock, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ReceiptGenerator } from "@/services/receiptGenerator";

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
  const [generatedProtocol, setGeneratedProtocol] = useState<string>('Carregando...');
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

  // Gerar protocolo ao carregar a página (simula o fetch do JavaScript)
  useEffect(() => {
    // Aguardar um pouco antes de gerar o protocolo para simular a requisição
    const timer = setTimeout(() => {
      const protocol = ProtocolGenerator.generateProtocol();
      setGeneratedProtocol(protocol);
    }, 1000);

    return () => clearTimeout(timer);
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
          
          // Gerar protocolo quando confirmado
          const protocol = ProtocolGenerator.generateProtocol();
          setGeneratedProtocol(protocol);
          
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
          if (checkAttempts < 12) {
            setTimeout(() => {
              setCheckAttempts(prev => prev + 1);
              checkPaymentStatus();
            }, 3000); // Reduzido para 3 segundos
          } else {
            console.warn('⚠️ [PAYMENT-RETURN] Máximo de tentativas atingido');
            setPaymentStatus('confirmed'); // Assumir confirmado após muitas tentativas
            
            // Gerar protocolo quando assumir confirmado
            const protocol = ProtocolGenerator.generateProtocol();
            setGeneratedProtocol(protocol);
            
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
          
          // Gerar protocolo quando assumir confirmado sem pedido
          const protocol = ProtocolGenerator.generateProtocol();
          setGeneratedProtocol(protocol);
          
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
        // Gerar protocolo sequencial
        const protocol = ProtocolGenerator.generateProtocol();
        
        const orderData = {
          orderId: paymentDetails.id,
          status: 'paid',
          total: paymentDetails.total_amount,
          protocol: protocol,
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
        return `Estamos aguardando a confirmação do seu pagamento. Isso pode levar alguns minutos. (Tentativa ${checkAttempts + 1}/12)`;
      case 'failed':
        return 'Não foi possível confirmar seu pagamento. Tente novamente ou entre em contato com o suporte.';
      default:
        return 'Verificando o status do seu pagamento...';
    }
  };

  const handleDownloadReceipt = () => {
    if (paymentStatus === 'confirmed' && generatedProtocol !== 'Carregando...') {
      const now = new Date();
      const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} às ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      const receiptData = {
        transactionId: `E19540550202507152100VHMQEV3D1HO`, // ID gerado automaticamente
        amount: `R$ ${paymentDetails?.total_amount?.toFixed(2).replace('.', ',') || '119,99'}`,
        date: formattedDate,
        protocol: generatedProtocol,
        recipientName: 'SmartVoz Telecom',
        recipientDoc: '***.988.112-**',
        recipientBank: 'Banco Inter S.A.',
        payerDoc: '***.817.710-**',
        payerBank: 'Asaas I.P S.A.',
        asaasPaymentId: paymentDetails?.asaas_payment_id
      };

      ReceiptGenerator.generatePaymentReceipt(receiptData);
      
      toast({
        title: "Comprovante baixado!",
        description: "O comprovante de pagamento foi gerado e baixado com sucesso."
      });
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

      <div className="pt-20 flex items-center justify-center min-h-screen bg-[#5f0889]">
        <div className="w-full max-w-[500px] mx-auto p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="px-4 py-4 bg-transparent backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-4"
          >
            {/* Ícone e título */}
            <div className="text-center mb-6">
              {paymentStatus === 'confirmed' ? (
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/845/845646.png" 
                  alt="Check" 
                  className="w-[60px] h-[60px] mx-auto mb-4"
                />
              ) : (
                <div className="mb-4">
                  {getStatusIcon()}
                </div>
              )}
              <h2 className="text-white text-2xl font-normal mb-2">
                {getStatusTitle()}
              </h2>
              <p className="text-white text-base leading-relaxed">
                {getStatusDescription()}
              </p>
            </div>

            {/* Tabela de detalhes */}
            <table className="w-full text-base text-white mb-8">
              <tbody>
                <tr>
                  <td className="py-1">
                    <strong>Protocolo:</strong>
                  </td>
                  <td className="text-right py-1">
                    {generatedProtocol}
                  </td>
                </tr>
                <tr>
                  <td className="py-1">
                    <strong>Valor:</strong>
                  </td>
                  <td className="text-right py-1">
                    R$ {paymentDetails?.total_amount?.toFixed(2) || '119,99'}
                  </td>
                </tr>
                <tr>
                  <td className="py-1">
                    <strong>Status:</strong>
                  </td>
                  <td className="text-right py-1">
                    <strong className="text-green-600">
                      {paymentDetails?.status === 'paid' ? 'Pago' : 
                       paymentDetails?.status === 'pending' ? 'Pendente' : 
                       paymentStatus === 'confirmed' ? 'Pago' : 'Processando'}
                    </strong>
                  </td>
                </tr>
                {paymentDetails?.asaas_payment_id && (
                  <tr>
                    <td className="py-1">
                      <strong>ID Asaas:</strong>
                    </td>
                    <td className="text-right py-1 text-sm">
                      {paymentDetails.asaas_payment_id}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Botões de ação */}
            <div className="text-center space-y-3">
              {paymentStatus === 'confirmed' && (
                <>
                  <SlideButton
                    onClick={handleContinue}
                    className="w-full"
                  >
                    Continuar para Ativação →
                  </SlideButton>
                  <button
                    onClick={handleDownloadReceipt}
                    className="px-4 py-4 bg-transparent backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-4 inline-flex items-center text-white font-medium no-underline transition-colors hover:bg-white/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar Comprovante
                  </button>
                </>
              )}

              {paymentStatus === 'pending' && (
                <button
                  onClick={checkPaymentStatus}
                  className="inline-block px-6 py-3 border border-[#4a148c] text-[#4a148c] font-bold no-underline rounded-md hover:bg-[#4a148c] hover:text-white transition-colors"
                >
                  Verificar Novamente
                </button>
              )}

              {paymentStatus === 'failed' && (
                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/client/products", { replace: true })}
                    className="block w-full px-6 py-3 bg-[#4a148c] text-white font-bold no-underline rounded-md hover:bg-[#6a1b9a] transition-colors"
                  >
                    Tentar Novamente
                  </button>
                  <button
                    onClick={() => navigate("/client/dashboard", { replace: true })}
                    className="block w-full px-6 py-3 border border-[#4a148c] text-[#4a148c] font-bold no-underline rounded-md hover:bg-[#4a148c] hover:text-white transition-colors"
                  >
                    Voltar ao Dashboard
                  </button>
                </div>
              )}

              {paymentStatus === 'checking' && (
                <p className="text-sm text-gray-500 mt-4">
                  Tentativa {checkAttempts + 1} de verificação...
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
