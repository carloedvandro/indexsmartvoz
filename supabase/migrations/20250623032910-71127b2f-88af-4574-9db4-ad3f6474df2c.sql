
-- Adicionar campos para controle da subconta Asaas na tabela profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS asaas_account_id TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS asaas_account_token TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS asaas_account_created_at TIMESTAMP WITH TIME ZONE;

-- Criar tabela para log de criação de subcontas
CREATE TABLE IF NOT EXISTS public.asaas_account_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  asaas_account_id TEXT,
  asaas_account_token TEXT,
  creation_status TEXT NOT NULL DEFAULT 'pending',
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Adicionar RLS na nova tabela
ALTER TABLE public.asaas_account_logs ENABLE ROW LEVEL SECURITY;

-- Criar políticas RLS para a nova tabela (apenas admins podem ver)
CREATE POLICY "Admins can view asaas account logs" 
  ON public.asaas_account_logs 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Admins can insert asaas account logs" 
  ON public.asaas_account_logs 
  FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

-- Adicionar trigger para updated_at na nova tabela
CREATE TRIGGER update_asaas_account_logs_updated_at
    BEFORE UPDATE ON public.asaas_account_logs
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Criar tabela para controlar aceite de termos (necessário para subconta)
CREATE TABLE IF NOT EXISTS public.terms_acceptance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  accepted BOOLEAN NOT NULL DEFAULT false,
  receive_communications BOOLEAN NOT NULL DEFAULT false,
  accepted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Adicionar RLS na tabela de termos
ALTER TABLE public.terms_acceptance ENABLE ROW LEVEL SECURITY;

-- Políticas para terms_acceptance
CREATE POLICY "Users can view their own terms acceptance" 
  ON public.terms_acceptance 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own terms acceptance" 
  ON public.terms_acceptance 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Admins podem ver todos os aceites de termos
CREATE POLICY "Admins can view all terms acceptance" 
  ON public.terms_acceptance 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));
