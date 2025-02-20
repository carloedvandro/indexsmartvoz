
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useProfile } from '@/hooks/useProfile';

interface CustomerFormData {
  customer_name: string;
  phone_number: string;
  cpf?: string;
  email?: string;
  plan_name?: string;
}

interface CustomerFormProps {
  onSuccess?: () => void;
}

export const CustomerForm = ({ onSuccess }: CustomerFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { data: profile } = useProfile();
  
  const form = useForm<CustomerFormData>({
    defaultValues: {
      customer_name: '',
      phone_number: '',
      cpf: '',
      email: '',
      plan_name: '',
    },
  });

  const onSubmit = async (values: CustomerFormData) => {
    if (!profile?.id) {
      toast({
        title: 'Erro',
        description: 'Usuário não autenticado',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('customer_lines')
        .insert([{
          ...values,
          user_id: profile.id,
          status: 'active',
          data_limit: 0,
          data_used: 0,
        }]);

      if (error) throw error;

      toast({
        title: 'Cliente adicionado com sucesso!',
      });

      queryClient.invalidateQueries({ queryKey: ['customers'] });
      onSuccess?.();
    } catch (error) {
      console.error('Error adding customer:', error);
      toast({
        title: 'Erro ao adicionar cliente',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="customer_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="plan_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plano</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Adicionando...' : 'Adicionar Cliente'}
        </Button>
      </form>
    </Form>
  );
};
