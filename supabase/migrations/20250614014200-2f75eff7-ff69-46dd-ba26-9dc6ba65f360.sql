
-- Inserir 4 planos com valores diferentes
INSERT INTO plans (title, description, value, status) VALUES
('Plano Basic 80GB', 'Plano básico com 80GB de internet móvel', 84.99, 'active'),
('Plano Prime 100GB', 'Plano intermediário com 100GB de internet móvel', 104.99, 'active'),
('Plano Premium 120GB', 'Plano premium com 120GB de internet móvel', 124.99, 'active'),
('Plano Gold 140GB', 'Plano gold com 140GB de internet móvel', 144.99, 'active');

-- Inserir níveis de cashback para cada plano (4 níveis cada)
-- Plano Basic 80GB
INSERT INTO plan_cashback_levels (plan_id, level, percentage, description)
SELECT 
    p.id,
    1,
    0.05,
    'Cashback nível 1 - 5%'
FROM plans p WHERE p.title = 'Plano Basic 80GB';

INSERT INTO plan_cashback_levels (plan_id, level, percentage, description)
SELECT 
    p.id,
    2,
    0.03,
    'Cashback nível 2 - 3%'
FROM plans p WHERE p.title = 'Plano Basic 80GB';

INSERT INTO plan_cashback_levels (plan_id, level, percentage, description)
SELECT 
    p.id,
    3,
    0.02,
    'Cashback nível 3 - 2%'
FROM plans p WHERE p.title = 'Plano Basic 80GB';

INSERT INTO plan_cashback_levels (plan_id, level, percentage, description)
SELECT 
    p.id,
    4,
    0.01,
    'Cashback nível 4 - 1%'
FROM plans p WHERE p.title = 'Plano Basic 80GB';

-- Plano Prime 100GB
INSERT INTO plan_cashback_levels (plan_id, level, percentage, description)
SELECT 
    p.id,
    1,
    0.07,
    'Cashback nível 1 - 7%'
FROM plans p WHERE p.title = 'Plano Prime 100GB';

INSERT INTO plan_cashback_levels (plan_id, level, percentage, description)
SELECT 
    p.id,
    2,
    0.05,
    'Cashback nível 2 - 5%'
FROM plans p WHERE p.title = 'Plano Prime 100GB';

INSERT INTO plan_cashback_levels (plan_id, level, percentage, description)
SELECT 
    p.id,
    3,
    0.03,
    'Cashback nível 3 - 3%'
FROM plans p WHERE p.title = 'Plano Prime 100GB';

INSERT INTO plan_cashback_levels (plan_id, level, percentage, description)
SELECT 
    p.id,
    4,
    0.02,
    'Cashback nível 4 - 2%'
FROM plans p WHERE p.title = 'Plano Prime 100GB';

-- Plano Premium 120GB
INSERT INTO plan_cashback_levels (plan_id, level, percentage, description)
SELECT 
    p.id,
    1,
    0.10,
    'Cashback nível 1 - 10%'
FROM plans p WHERE p.title = 'Plano Premium 120GB';

INSERT INTO plan_cashback_levels (plan_id, level, percentage, description)
SELECT 
    p.id,
    2,
    0.07,
    'Cashback nível 2 - 7%'
FROM plans p WHERE p.title = 'Plano Premium 120GB';

INSERT INTO plan_cashback_levels (plan_id, level, percentage, description)
SELECT 
    p.id,
    3,
    0.05,
    'Cashback nível 3 - 5%'
FROM plans p WHERE p.title = 'Plano Premium 120GB';

INSERT INTO plan_cashback_levels (plan_id, level, percentage, description)
SELECT 
    p.id,
    4,
    0.03,
    'Cashback nível 4 - 3%'
FROM plans p WHERE p.title = 'Plano Premium 120GB';

-- Plano Gold 140GB
INSERT INTO plan_cashback_levels (plan_id, level, percentage, description)
SELECT 
    p.id,
    1,
    0.12,
    'Cashback nível 1 - 12%'
FROM plans p WHERE p.title = 'Plano Gold 140GB';

INSERT INTO plan_cashback_levels (plan_id, level, percentage, description)
SELECT 
    p.id,
    2,
    0.08,
    'Cashback nível 2 - 8%'
FROM plans p WHERE p.title = 'Plano Gold 140GB';

INSERT INTO plan_cashback_levels (plan_id, level, percentage, description)
SELECT 
    p.id,
    3,
    0.06,
    'Cashback nível 3 - 6%'
FROM plans p WHERE p.title = 'Plano Gold 140GB';

INSERT INTO plan_cashback_levels (plan_id, level, percentage, description)
SELECT 
    p.id,
    4,
    0.04,
    'Cashback nível 4 - 4%'
FROM plans p WHERE p.title = 'Plano Gold 140GB';

-- Inserir benefícios para cada plano
-- Plano Basic 80GB
INSERT INTO plan_benefits (plan_id, benefit_title, display_order)
SELECT 
    p.id,
    'Internet 80GB',
    1
FROM plans p WHERE p.title = 'Plano Basic 80GB';

INSERT INTO plan_benefits (plan_id, benefit_title, display_order)
SELECT 
    p.id,
    'Minutos Ilimitados',
    2
FROM plans p WHERE p.title = 'Plano Basic 80GB';

INSERT INTO plan_benefits (plan_id, benefit_title, display_order)
SELECT 
    p.id,
    'SMS Ilimitado',
    3
FROM plans p WHERE p.title = 'Plano Basic 80GB';

INSERT INTO plan_benefits (plan_id, benefit_title, display_order)
SELECT 
    p.id,
    'Chip eSIM ou Físico',
    4
FROM plans p WHERE p.title = 'Plano Basic 80GB';

-- Plano Prime 100GB
INSERT INTO plan_benefits (plan_id, benefit_title, display_order)
SELECT 
    p.id,
    'Internet 100GB',
    1
FROM plans p WHERE p.title = 'Plano Prime 100GB';

INSERT INTO plan_benefits (plan_id, benefit_title, display_order)
SELECT 
    p.id,
    'Minutos Ilimitados',
    2
FROM plans p WHERE p.title = 'Plano Prime 100GB';

INSERT INTO plan_benefits (plan_id, benefit_title, display_order)
SELECT 
    p.id,
    'SMS Ilimitado',
    3
FROM plans p WHERE p.title = 'Plano Prime 100GB';

INSERT INTO plan_benefits (plan_id, benefit_title, display_order)
SELECT 
    p.id,
    'Chip eSIM ou Físico',
    4
FROM plans p WHERE p.title = 'Plano Prime 100GB';

INSERT INTO plan_benefits (plan_id, benefit_title, display_order)
SELECT 
    p.id,
    'WhatsApp Grátis',
    5
FROM plans p WHERE p.title = 'Plano Prime 100GB';

-- Plano Premium 120GB
INSERT INTO plan_benefits (plan_id, benefit_title, display_order)
SELECT 
    p.id,
    'Internet 120GB',
    1
FROM plans p WHERE p.title = 'Plano Premium 120GB';

INSERT INTO plan_benefits (plan_id, benefit_title, display_order)
SELECT 
    p.id,
    'Minutos Ilimitados',
    2
FROM plans p WHERE p.title = 'Plano Premium 120GB';

INSERT INTO plan_benefits (plan_id, benefit_title, display_order)
SELECT 
    p.id,
    'SMS Ilimitado',
    3
FROM plans p WHERE p.title = 'Plano Premium 120GB';

INSERT INTO plan_benefits (plan_id, benefit_title, display_order)
SELECT 
    p.id,
    'Chip eSIM ou Físico',
    4
FROM plans p WHERE p.title = 'Plano Premium 120GB';

INSERT INTO plan_benefits (plan_id, benefit_title, display_order)
SELECT 
    p.id,
    'WhatsApp Grátis',
    5
FROM plans p WHERE p.title = 'Plano Premium 120GB';

INSERT INTO plan_benefits (plan_id, benefit_title, display_order)
SELECT 
    p.id,
    'Redes Sociais Grátis',
    6
FROM plans p WHERE p.title = 'Plano Premium 120GB';

-- Plano Gold 140GB
INSERT INTO plan_benefits (plan_id, benefit_title, display_order)
SELECT 
    p.id,
    'Internet 140GB',
    1
FROM plans p WHERE p.title = 'Plano Gold 140GB';

INSERT INTO plan_benefits (plan_id, benefit_title, display_order)
SELECT 
    p.id,
    'Minutos Ilimitados',
    2
FROM plans p WHERE p.title = 'Plano Gold 140GB';

INSERT INTO plan_benefits (plan_id, benefit_title, display_order)
SELECT 
    p.id,
    'SMS Ilimitado',
    3
FROM plans p WHERE p.title = 'Plano Gold 140GB';

INSERT INTO plan_benefits (plan_id, benefit_title, display_order)
SELECT 
    p.id,
    'Chip eSIM ou Físico',
    4
FROM plans p WHERE p.title = 'Plano Gold 140GB';

INSERT INTO plan_benefits (plan_id, benefit_title, display_order)
SELECT 
    p.id,
    'WhatsApp Grátis',
    5
FROM plans p WHERE p.title = 'Plano Gold 140GB';

INSERT INTO plan_benefits (plan_id, benefit_title, display_order)
SELECT 
    p.id,
    'Redes Sociais Grátis',
    6
FROM plans p WHERE p.title = 'Plano Gold 140GB';

INSERT INTO plan_benefits (plan_id, benefit_title, display_order)
SELECT 
    p.id,
    'Netflix Grátis por 3 meses',
    7
FROM plans p WHERE p.title = 'Plano Gold 140GB';

INSERT INTO plan_benefits (plan_id, benefit_title, display_order)
SELECT 
    p.id,
    'Roaming Nacional',
    8
FROM plans p WHERE p.title = 'Plano Gold 140GB';
