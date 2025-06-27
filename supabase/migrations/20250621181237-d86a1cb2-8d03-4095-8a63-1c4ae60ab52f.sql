
-- Adicionar coluna fixed_value à tabela plan_cashback_levels
ALTER TABLE plan_cashback_levels 
ADD COLUMN fixed_value NUMERIC NULL;

-- Atualizar a coluna percentage para permitir NULL 
-- (já que agora pode ser percentual OU valor fixo)
ALTER TABLE plan_cashback_levels 
ALTER COLUMN percentage DROP NOT NULL;
