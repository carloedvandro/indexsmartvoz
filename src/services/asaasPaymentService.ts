
import { supabase } from "@/integrations/supabase/client";

interface AsaasCustomer {
  name: string;
  cpfCnpj: string;
  email?: string;
  phone?: string;
  mobilePhone?: string;
  address?: string;
  addressNumber?: string;
  complement?: string;
  province?: string;
  city?: string;
  state?: string;
  postalCode?: string;
}

interface AsaasPayment {
  customer: string;
  billingType: 'BOLETO' | 'CREDIT_CARD' | 'PIX' | 'DEBIT_CARD';
  dueDate: string;
  value: number;
  description?: string;
  externalReference?: string;
}

interface PaymentData {
  planId: string;
  userId: string;
  amount: number;
  paymentMethod: 'pix' | 'boleto' | 'credit_card';
  dueDate?: string;
}

export class AsaasPaymentService {
  private baseURL = 'https://www.asaas.com/api/v3';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async makeRequest(endpoint: string, method: 'GET' | 'POST' = 'GET', data?: any) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method,
      headers: {
        'access_token': this.apiKey,
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Asaas API error: ${response.status}`);
    }

    return response.json();
  }

  async createCustomer(customerData: AsaasCustomer) {
    return this.makeRequest('/customers', 'POST', customerData);
  }

  async createPayment(paymentData: AsaasPayment) {
    return this.makeRequest('/payments', 'POST', paymentData);
  }

  async processPayment(paymentData: PaymentData) {
    try {
      // Get user profile and address
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', paymentData.userId)
        .single();

      if (profileError) {
        throw new Error('Erro ao buscar perfil do usuário');
      }

      // Get user address using RPC function or fallback
      let addressData = null;
      
      try {
        const { data: rpcAddressData } = await supabase
          .rpc('get_user_address', { p_user_id: paymentData.userId })
          .single();
        
        addressData = rpcAddressData;
      } catch (rpcError) {
        console.log("RPC failed, trying direct access");
        
        try {
          const { data: directAddressData } = await supabase
            .from("user_addresses" as any)
            .select("*")
            .eq("user_id", paymentData.userId)
            .single();
          
          addressData = directAddressData;
        } catch (directError) {
          console.log("Direct access also failed, proceeding without address");
        }
      }

      // Create customer in Asaas
      const customerData: AsaasCustomer = {
        name: profile.full_name || 'Cliente',
        cpfCnpj: profile.cpf || profile.cnpj || '',
        email: profile.email,
        phone: profile.phone || undefined,
        mobilePhone: profile.mobile || profile.whatsapp || undefined,
      };

      // Add address data if available
      if (addressData) {
        customerData.address = addressData.street;
        customerData.addressNumber = addressData.number;
        customerData.complement = addressData.complement || undefined;
        customerData.province = addressData.neighborhood;
        customerData.city = addressData.city;
        customerData.state = addressData.state;
        customerData.postalCode = addressData.cep;
      }

      const customer = await this.createCustomer(customerData);

      // Create payment
      const payment = await this.createPayment({
        customer: customer.id,
        billingType: paymentData.paymentMethod.toUpperCase() as any,
        dueDate: paymentData.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        value: paymentData.amount,
        description: `Pagamento do plano`,
        externalReference: paymentData.planId,
      });

      // Save order to database
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: paymentData.userId,
          plan_id: paymentData.planId,
          total_amount: paymentData.amount,
          payment_method: paymentData.paymentMethod,
          asaas_payment_id: payment.id,
          status: 'pending',
        });

      if (orderError) {
        throw new Error('Erro ao salvar pedido');
      }

      return payment;
    } catch (error) {
      console.error('Erro no processamento do pagamento:', error);
      throw error;
    }
  }
}
