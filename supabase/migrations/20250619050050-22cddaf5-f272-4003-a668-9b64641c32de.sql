
-- Primeiro vamos verificar quais valores são permitidos na constraint atual
SELECT 
    con.conname AS constraint_name,
    pg_get_constraintdef(con.oid) AS constraint_definition
FROM pg_constraint con
INNER JOIN pg_class rel ON rel.oid = con.conrelid
INNER JOIN pg_namespace nsp ON nsp.oid = connamespace
WHERE nsp.nspname = 'public' 
    AND rel.relname = 'orders' 
    AND con.contype = 'c'
    AND con.conname = 'orders_status_check';

-- Atualizar a constraint para incluir 'chip_activation'
ALTER TABLE public.orders 
DROP CONSTRAINT IF EXISTS orders_status_check;

ALTER TABLE public.orders 
ADD CONSTRAINT orders_status_check 
CHECK (status IN ('pending', 'paid', 'cancelled', 'failed', 'chip_activation'));
