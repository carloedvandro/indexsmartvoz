
-- Criar tabela de endereços vinculada ao perfil do usuário
CREATE TABLE public.user_addresses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  cep TEXT NOT NULL,
  street TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  number TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  complement TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Habilitar RLS na tabela de endereços
ALTER TABLE public.user_addresses ENABLE ROW LEVEL SECURITY;

-- Política para permitir que usuários vejam apenas seus próprios endereços
CREATE POLICY "Users can view their own addresses" 
  ON public.user_addresses 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Política para permitir que usuários criem seus próprios endereços
CREATE POLICY "Users can create their own addresses" 
  ON public.user_addresses 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Política para permitir que usuários atualizem seus próprios endereços
CREATE POLICY "Users can update their own addresses" 
  ON public.user_addresses 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Política para permitir que usuários deletem seus próprios endereços
CREATE POLICY "Users can delete their own addresses" 
  ON public.user_addresses 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_user_addresses_updated_at
  BEFORE UPDATE ON public.user_addresses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
