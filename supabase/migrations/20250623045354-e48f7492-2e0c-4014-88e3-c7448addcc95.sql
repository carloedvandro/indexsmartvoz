
-- Criar apenas o índice único para user_id (as políticas já existem)
CREATE UNIQUE INDEX IF NOT EXISTS terms_acceptance_user_id_unique 
  ON public.terms_acceptance (user_id);
