
-- Adicionar coluna asaas_payment_id na tabela orders
ALTER TABLE public.orders 
ADD COLUMN asaas_payment_id TEXT;

-- Criar índice para melhor performance nas consultas
CREATE INDEX idx_orders_asaas_payment_id ON public.orders(asaas_payment_id);

-- Adicionar coluna payment_method na tabela orders se não existir
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'pix';
