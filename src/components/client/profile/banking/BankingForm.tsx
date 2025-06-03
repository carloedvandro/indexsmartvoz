
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProfileWithSponsor } from "@/types/profile";
import { updateProfile } from "@/services/user/userUpdate";

const bankingSchema = z.object({
  bank_name: z.string().min(1, "Nome do banco é obrigatório"),
  account_type: z.string().min(1, "Tipo de conta é obrigatório"),
  agency_number: z.string().min(1, "Número da agência é obrigatório"),
  agency_digit: z.string().optional(),
  account_number: z.string().min(1, "Número da conta é obrigatório"),
  account_digit: z.string().min(1, "Dígito é obrigatório"),
  account_name: z.string().min(1, "Titular da conta é obrigatório"),
  cpf_cnpj: z.string().min(1, "CPF/CNPJ é obrigatório"),
  security_password: z.string().optional(),
});

type BankingFormData = z.infer<typeof bankingSchema>;

interface BankingFormProps {
  profile: ProfileWithSponsor;
}

export function BankingForm({ profile }: BankingFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BankingFormData>({
    resolver: zodResolver(bankingSchema),
    defaultValues: {
      bank_name: profile.bank_name || "",
      account_type: profile.account_type || "Conta Corrente",
      agency_number: profile.agency_number || "",
      agency_digit: profile.agency_digit || "",
      account_number: profile.account_number || "",
      account_digit: profile.account_digit || "",
      account_name: profile.account_name || profile.full_name || "",
      cpf_cnpj: profile.cpf_cnpj || profile.cpf || "",
      security_password: profile.security_password || "",
    },
  });

  const onSubmit = async (data: BankingFormData) => {
    setIsSubmitting(true);
    try {
      await updateProfile(profile.id, {
        bank_name: data.bank_name,
        account_number: data.account_number,
        account_name: data.account_name,
        agency_number: data.agency_number,
        agency_digit: data.agency_digit,
        account_digit: data.account_digit,
        account_type: data.account_type,
        cpf_cnpj: data.cpf_cnpj,
        security_password: data.security_password,
      });

      toast({
        title: "Sucesso",
        description: "Dados bancários atualizados com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao atualizar dados bancários:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar os dados bancários.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const bankOptions = [
    "001 - BANCO DO BRASIL S.A.",
    "003 - BANCO DA AMAZONIA S.A.",
    "004 - BANCO DO NORDESTE DO BRASIL S.A.",
    "007 - BANCO NACIONAL DE DESENVOLVIMENTO ECONOMICO E SOCIAL BNDES",
    "021 - BANCO BANESTES S.A.",
    "025 - BANCO ALFA S.A.",
    "033 - BANCO SANTANDER (BRASIL) S.A.",
    "036 - BANCO BBI S.A.",
    "037 - BANCO DO ESTADO DO PARA S.A.",
    "041 - BANCO DO ESTADO DO RIO GRANDE DO SUL S.A.",
    "047 - BANCO DO ESTADO DE SERGIPE S.A.",
    "062 - HIPERCARD BANCO MULTIPLO S.A.",
    "063 - BANCO BRADESCARD S.A.",
    "070 - BRB - BANCO DE BRASILIA S.A.",
    "074 - BANCO J.SAFRA S.A.",
    "077 - BANCO INTER S.A.",
    "082 - BANCO TOPAZIO S.A.",
    "084 - UNIPRIME NORTE DO PARANA - COOPERATIVA DE CREDITO LTDA.",
    "085 - COOPERATIVA CENTRAL DE CREDITO URBANO - CECRED",
    "104 - CAIXA ECONOMICA FEDERAL",
    "107 - BANCO BBM S.A.",
    "121 - BANCO AGIBANK S.A.",
    "136 - CONF NAC COOP CENTRAIS UNICRED LTDA - UNICRED BRASIL",
    "151 - NOSSA CAIXA NOSSO BANCO S.A.",
    "212 - BANCO ORIGINAL S.A.",
    "217 - BANCO JOHN DEERE S.A.",
    "218 - BANCO BS2 S.A.",
    "224 - BANCO FIBRA S.A.",
    "237 - BANCO BRADESCO S.A.",
    "246 - BANCO ABC BRASIL S.A.",
    "249 - BANCO INVESTCRED UNIBANCO S.A.",
    "260 - NU PAGAMENTOS S.A.",
    "290 - PAGSEGURO INTERNET S.A.",
    "318 - BANCO BMG S.A.",
    "320 - CHINA CONSTRUCTION BANK (BRASIL) BANCO MULTIPLO S.A.",
    "323 - MERCADO PAGO - CONTA DO MERCADO LIVRE",
    "336 - BANCO C6 S.A.",
    "341 - BANCO ITAU S.A.",
    "356 - BANCO ABN AMRO S.A.",
    "389 - BANCO MERCANTIL DO BRASIL S.A.",
    "399 - HSBC BANK BRASIL S.A.",
    "422 - BANCO SAFRA S.A.",
    "473 - BANCO CAIXA GERAL - BRASIL S.A.",
    "477 - CITIBANK N.A.",
    "479 - BANCO ITAUBANK S.A.",
    "623 - BANCO PAN S.A.",
    "633 - BANCO RENDIMENTO S.A.",
    "634 - BANCO TRIANGULO S.A.",
    "637 - BANCO SOFISA S.A.",
    "643 - BANCO PINE S.A.",
    "653 - BANCO INDUSVAL S.A.",
    "655 - BANCO VOTORANTIM S.A.",
    "707 - BANCO DAYCOVAL S.A.",
    "739 - BANCO CETELEM S.A.",
    "741 - BANCO RIBEIRAO PRETO S.A.",
    "745 - BANCO CITIBANK S.A.",
    "748 - BANCO COOPERATIVO SICREDI S.A.",
    "756 - BANCO COOPERATIVO DO BRASIL S.A. - BANCOOB",
    "077 - BANCO INTER S.A.",
    "380 - PICPAY SERVICOS S.A.",
    "364 - GERENCIANET PAGAMENTOS DO BRASIL LTDA",
    "335 - BANCO DIGIO S.A.",
    "260 - NU PAGAMENTOS S.A. (NUBANK)",
    "403 - CORA SOCIEDADE DE CREDITO DIRETO S.A.",
    "208 - BANCO BTG PACTUAL S.A.",
    "125 - PLURAL S.A. - BANCO MULTIPLO",
    "290 - PAGSEGURO INTERNET S.A. (PAGBANK)",
    "359 - ZEMA CREDITO FINANCIAMENTO E INVESTIMENTO S.A.",
    "655 - BANCO VOTORANTIM S.A.",
    "237 - NEXT BANK (BRADESCO)",
    "341 - ITAU PERSONNALITE",
    "033 - SANTANDER SELECT",
    "001 - BB DIGITAL",
    "104 - CAIXA TEM"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
            🏛️
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Conta Bancária</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="bank_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Banco</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o banco" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-60">
                        {bankOptions.map((bank) => (
                          <SelectItem key={bank} value={bank}>
                            {bank}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="account_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Conta</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Conta Corrente">Conta Corrente</SelectItem>
                        <SelectItem value="Conta Poupança">Conta Poupança</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="agency_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número da Agência</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="8217" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agency_digit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dígito</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="account_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número da Conta</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="18280" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="account_digit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dígito</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="account_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titular da Conta</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Roberto Silva" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cpf_cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF/CNPJ</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="security_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha de Segurança</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="password" 
                      placeholder=""
                    />
                  </FormControl>
                  <div className="text-right">
                    <button 
                      type="button"
                      className="text-sm text-gray-500 hover:text-gray-700"
                      onClick={() => {/* TODO: Implementar esqueci a senha */}}
                    >
                      Esqueci a senha de segurança
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-teal-500 hover:bg-teal-600 text-white px-8"
              >
                {isSubmitting ? "Salvando..." : "Salvar alterações"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
