# Novo Fluxo de Biometria Facial SmartVoz

## Visão Geral

Este é o novo fluxo de biometria facial que substitui o sistema anterior, implementando um processo mais moderno e seguro para verificação de identidade dos clientes SmartVoz.

## Estrutura do Fluxo

### 1. **SelfieStep** - Captura da Selfie
- **Funcionalidade**: Captura facial do usuário usando a câmera frontal
- **Visual**: Moldura oval brilhante com efeito shimmer
- **Instruções**: Posicionamento do rosto, iluminação adequada
- **Permissões**: Solicita acesso à câmera automaticamente

### 2. **DocumentCaptureStep** - Captura do Documento
- **Funcionalidade**: Captura do documento de identidade (RG/CNH)
- **Visual**: Moldura retangular com cantos destacados
- **Câmera**: Prefere câmera traseira para melhor qualidade
- **Instruções**: Posicionamento correto do documento

### 3. **VerificationSuccessStep** - Verificação Aprovada
- **Funcionalidade**: Exibe resultado positivo da verificação
- **Dados Mostrados**:
  - Foto do usuário (selfie capturada)
  - Nome completo
  - CPF
  - Data de nascimento
  - Protocolo de verificação
- **Ação**: Botão "Avançar" para seleção de plano

### 4. **VerificationRejectedStep** - Verificação Reprovada
- **Funcionalidade**: Informa sobre falha na verificação
- **Motivos Comuns**: Lista explicativa de possíveis causas
- **Dicas**: Orientações para nova tentativa
- **Ação**: Botão "Tentar Novamente" que reinicia o fluxo

## Padrão Visual SmartVoz

### Cores
- **Fundo Principal**: Gradiente de #5f0889 para #9b30ff
- **Elementos**: Componentes semi-transparentes com backdrop-blur
- **Bordas**: Efeitos brilhantes com box-shadow
- **Botões**: Estilo pill (totalmente arredondados)

### Molduras Especiais
- **Selfie**: Oval com efeito shimmer animado
- **Documento**: Retangular com cantos destacados
- **Brilho**: Animação CSS personalizada

### Responsividade
- Design mobile-first
- Adaptação automática para diferentes tamanhos de tela
- Elementos empilhados verticalmente em mobile

## Integração com Sistema Existente

### Substituição Transparente
- Drop-in replacement do fluxo antigo
- Mantém mesmas interfaces de integração
- Preserva lógica de cadastro existente

### Fluxo de Navegação
1. **Entrada**: Vem do registro de cliente
2. **Saída Sucesso**: Vai para seleção de plano
3. **Saída Falha**: Permite nova tentativa
4. **Dados**: Atualiza tabela `profiles` no Supabase

### APIs e Integrações
- **Simulação**: Atualmente usa verificação simulada (70% sucesso)
- **Produção**: Preparado para integração com Serasa Experian
- **Dados**: Extração OCR e comparação biométrica

## Tecnologias Utilizadas

### Dependências
- **react-webcam**: Captura de imagem via câmera
- **lucide-react**: Ícones do sistema
- **Tailwind CSS**: Estilização responsiva

### Permissões
- **Câmera**: getUserMedia() com tratamento de erros
- **Armazenamento**: Base64 das imagens capturadas

### Performance
- **Otimização**: Compressão de imagens
- **UX**: Feedback visual durante processamento
- **Fallbacks**: Tratamento para dispositivos sem câmera

## Arquivos Principais

```
src/components/client/biometry/
├── NewFacialBiometryFlow.tsx     # Controlador principal
├── steps/
│   ├── SelfieStep.tsx            # Captura de selfie
│   ├── DocumentCaptureStep.tsx   # Captura de documento
│   ├── VerificationSuccessStep.tsx # Tela de sucesso
│   └── VerificationRejectedStep.tsx # Tela de falha
└── README.md                     # Esta documentação
```

## Próximos Passos

1. **Integração Real**: Conectar com APIs da Serasa Experian
2. **Testes**: Validação em diferentes dispositivos
3. **Analytics**: Implementar tracking de conversão
4. **Melhorias**: Feedback baseado em uso real

## Manutenção

- **Atualizações**: Manter compatibilidade com browsers
- **Permissões**: Monitorar mudanças nas APIs de câmera
- **Design**: Ajustes conforme evolução da marca SmartVoz