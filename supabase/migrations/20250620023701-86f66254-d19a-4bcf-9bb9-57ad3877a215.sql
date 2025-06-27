
-- Atualizar a constraint de status para incluir 'confirmed'
ALTER TABLE public.orders 
DROP CONSTRAINT IF EXISTS orders_status_check;

ALTER TABLE public.orders 
ADD CONSTRAINT orders_status_check 
CHECK (status IN ('pending', 'paid', 'cancelled', 'failed', 'chip_activation', 'confirmed', 'rejected'));
