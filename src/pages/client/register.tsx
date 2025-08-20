
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { usePlanSelection } from "@/contexts/PlanSelectionContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft } from "lucide-react";
import { PersonalInfoFields } from "@/components/client/register/fields/PersonalInfoFields";
import { ContactFields } from "@/components/client/register/fields/ContactFields";
import { AddressFields } from "@/components/client/register/fields/AddressFields";
import { PasswordFields } from "@/components/client/register/fields/PasswordFields";

const registerSchema = z.object({
  fullName: z.string().min(2, "Nome completo é obrigatório"),
  email: z.string().email("Email inválido"),
  cpf: z.string().min(11, "CPF inválido"),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
  whatsapp: z.string().min(10, "WhatsApp é obrigatório"),
  cep: z.string().min(8, "CEP é obrigatório"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  passwordConfirmation: z.string(),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Senhas não coincidem",
  path: ["passwordConfirmation"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function ClientRegister() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { planData } = usePlanSelection();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      cpf: "",
      birthDate: "",
      whatsapp: "",
      cep: "",
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsSubmitting(true);

      // Verificar se o plano foi selecionado
      if (!planData.selectedPlan || !planData.selectedDDD || !planData.selectedDueDate) {
        toast({
          title: "Erro",
          description: "Por favor, selecione um plano primeiro.",
          variant: "destructive",
        });
        navigate("/client/plan-selection");
        return;
      }

      // Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          },
        },
      });

      if (authError) {
        if (authError.message.includes("already registered")) {
          throw new Error("Email já está cadastrado. Por favor faça login ou use recuperação de senha.");
        }
        throw new Error("Erro ao criar usuário: " + authError.message);
      }

      if (!authData.user) {
        throw new Error("Erro ao criar usuário");
      }

      // Atualizar perfil com dados completos
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: data.fullName,
          email: data.email,
          cpf_cnpj: data.cpf,
          birth_date: data.birthDate,
          phone: data.whatsapp,
        })
        .eq("id", authData.user.id);

      if (profileError) {
        console.error("Error updating profile:", profileError);
      }

      // Criar endereço
      const { error: addressError } = await supabase
        .from("profile_addresses")
        .insert({
          profile_id: authData.user.id,
          cep: data.cep,
          street: data.street,
          number: data.number,
          neighborhood: data.neighborhood,
          city: data.city,
          state: data.state,
        });

      if (addressError) {
        console.error("Error creating address:", addressError);
      }

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Agora vamos processar seu pagamento...",
      });

      // Redirecionar para checkout/pagamento
      navigate("/client/checkout");

    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro ao criar sua conta.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/client/plan-selection");
  };

  // Verificar se há dados do plano
  if (!planData.selectedPlan) {
    navigate("/client/plan-selection");
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header com logotipo */}
      <header className="w-full py-6 px-4 bg-white shadow-sm">
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png" 
            alt="Smartvoz Logo" 
            className="h-[80px] object-contain mix-blend-multiply opacity-90 contrast-125"
          />
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBack}
            className="flex items-center text-purple-600 hover:text-purple-700"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar
          </button>
        </div>

        {/* Resumo do Plano */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg">
            <h3 className="font-bold">{planData.selectedPlan.name}</h3>
            <p className="text-xl font-bold">{planData.selectedPlan.gb}</p>
            <p className="text-lg">R$ {planData.selectedPlan.price.toFixed(2)}/mês</p>
            <p className="text-sm mt-2">DDD: {planData.selectedDDD} | Vencimento: dia {planData.selectedDueDate}</p>
          </div>
        </div>

        {/* Formulário de Cadastro */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6">Complete seu Cadastro</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Dados Pessoais</h3>
                <PersonalInfoFields form={form} />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contato</h3>
                <ContactFields form={form} />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Endereço</h3>
                <AddressFields form={form} />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Senha</h3>
                <PasswordFields form={form} />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  "Finalizar Cadastro"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
