# Y-TECH - Sistema de Rede e Loja Virtual

## Visão Geral
Y-TECH é uma plataforma web fullstack desenvolvida para gerenciar uma rede de usuários com sistema de indicações, loja virtual e dashboard administrativo. O sistema permite o cadastro de usuários através de indicação, gerenciamento de produtos, visualização da rede e controle administrativo.

## Stack Tecnológica

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Estilização**: Tailwind CSS + shadcn/ui
- **Estado**: TanStack Query (React Query)
- **Roteamento**: React Router DOM
- **Formulários**: React Hook Form + Zod
- **Internacionalização**: i18next
- **Notificações**: Sonner Toast

### Backend (Supabase)
- **Banco de Dados**: PostgreSQL
- **Autenticação**: Supabase Auth
- **Storage**: Supabase Storage
- **APIs**: Supabase Edge Functions
- **Segurança**: Row Level Security (RLS)

## Estrutura do Sistema

### Módulos Principais
1. **Autenticação**
   - Login via email/senha
   - Recuperação de senha
   - Registro por indicação

2. **Rede de Usuários**
   - Visualização da rede em árvore
   - Níveis de indicação (até 4 níveis)
   - Filtros por nível

3. **Loja Virtual**
   - Catálogo de produtos
   - Gerenciamento de produtos
   - Sistema de pedidos

4. **Área Administrativa**
   - Gestão de usuários
   - Controle de produtos
   - Monitoramento da rede

## Banco de Dados

### Tabelas Principais
1. `profiles`
   - Dados dos usuários
   - Informações de contato
   - Documentação (CPF/CNPJ)

2. `network`
   - Estrutura da rede
   - Níveis de indicação
   - Relacionamentos entre usuários

3. `store_products`
   - Produtos
   - Preços
   - Imagens

4. `store_orders`
   - Pedidos
   - Status
   - Informações de compra

## Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta no Supabase

### Configuração do Ambiente

1. Clone o repositório:
```bash
git clone <repository-url>
cd y-tech
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto:
```env
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anon
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

### Configuração do Supabase

1. Crie um novo projeto no Supabase
2. Configure a autenticação:
   - Habilite login por email/senha
   - Configure templates de email
   - Ajuste as políticas de redirecionamento

3. Configure o Storage:
   - Crie um bucket `product-images`
   - Configure as políticas de acesso

4. Configure as políticas RLS:
   - Implemente as políticas de segurança para cada tabela
   - Teste os acessos com diferentes perfis

## Segurança

### Frontend
- Validação de formulários
- Proteção contra XSS
- Sanitização de inputs
- CORS configurado

### Backend
- Políticas RLS
- Autenticação JWT
- Validação de dados
- Gerenciamento de secrets

## Manutenção

### Monitoramento
- Logs do frontend via console
- Logs do backend via Supabase
- Monitoramento de Edge Functions

### Backups
- Backup automático do PostgreSQL
- Backup periódico recomendado

## Deployment

### Produção
1. Build do projeto:
```bash
npm run build
```

2. Teste o build localmente:
```bash
npm run preview
```

3. Deploy:
- Configure seu serviço de hosting preferido
- Configure as variáveis de ambiente
- Deploy dos arquivos estáticos

## Suporte

### Contatos
- Suporte Técnico: [email]
- Documentação Supabase: https://supabase.com/docs
- Documentação React: https://react.dev

### Troubleshooting Comum

1. **Problemas de Autenticação**
   - Verificar tokens
   - Confirmar políticas RLS
   - Validar configurações de email

2. **Problemas de Upload**
   - Verificar permissões do bucket
   - Validar tamanho máximo de arquivo
   - Confirmar tipos permitidos

3. **Problemas de Rede**
   - Verificar níveis máximos
   - Validar relacionamentos
   - Confirmar cálculos

## Licença
[Tipo de Licença]

## Contribuição
Para contribuir com o projeto:
1. Fork o repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

---
Desenvolvido com ❤️ pela equipe Y-TECH