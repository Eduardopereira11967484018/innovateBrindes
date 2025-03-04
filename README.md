1. Visão geral do projeto
2. Arquitetura e estrutura de pastas
3. Tecnologias utilizadas
4. Componentes principais
5. Fluxos de usuário
6. API e integração com backend
7. Autenticação
8. Gerenciamento de estado
9. Instruções de instalação e execução
10. Guia de contribuição


Vou organizar a documentação de forma clara e profissional, como se fosse um documento técnico para desenvolvedores que precisam entender e trabalhar com o projeto.
`</Thinking>`

### Documentação do Projeto E-commerce

## Sumário

1. [Visão Geral](#visão-geral)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Arquitetura do Projeto](#arquitetura-do-projeto)
4. [Estrutura de Pastas](#estrutura-de-pastas)
5. [Componentes Principais](#componentes-principais)
6. [Fluxos de Usuário](#fluxos-de-usuário)
7. [API e Integração com Backend](#api-e-integração-com-backend)
8. [Autenticação](#autenticação)
9. [Gerenciamento de Estado](#gerenciamento-de-estado)
10. [Instruções de Instalação e Execução](#instruções-de-instalação-e-execução)
11. [Guia de Contribuição](#guia-de-contribuição)


## Visão Geral

Este projeto é uma plataforma de e-commerce completa para a Innovation Brindes, especializada na venda de brindes personalizados. A aplicação foi desenvolvida utilizando Next.js 14 com App Router, oferecendo uma experiência de usuário moderna e responsiva.

### Funcionalidades Principais

- Catálogo de produtos com busca e filtragem
- Carrinho de compras com persistência
- Sistema de autenticação de usuários
- Checkout em múltiplas etapas
- Cálculo de frete via API dos Correios
- Rastreamento de pedidos
- Perfil de usuário com histórico de pedidos


## Tecnologias Utilizadas

- **Frontend**:

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Shadcn/UI (componentes)
- Lucide React (ícones)
- Stitches (CSS-in-JS)



- **Gerenciamento de Estado**:

- React Context API
- useReducer para lógica complexa
- localStorage para persistência



- **Ferramentas de Desenvolvimento**:

- ESLint
- Prettier
- TypeScript
- Next.js Dev Tools





## Arquitetura do Projeto

O projeto segue a arquitetura do Next.js App Router, que é baseada em sistema de arquivos para definição de rotas. Utilizamos Server Components para renderização no servidor e Client Components para interatividade no cliente.

### Padrões de Design

- **Componentes Reutilizáveis**: Componentes de UI modulares e reutilizáveis
- **Context API**: Para gerenciamento de estado global
- **Hooks Personalizados**: Para lógica reutilizável
- **Server Components**: Para melhor SEO e performance
- **Client Components**: Para interatividade do usuário


## Estrutura de Pastas

```plaintext
/
├── app/                    # Rotas e páginas (App Router)
│   ├── api/                # Rotas de API
│   ├── checkout/           # Fluxo de checkout
│   ├── login/              # Autenticação
│   ├── products/           # Páginas de produtos
│   ├── profile/            # Perfil do usuário
│   ├── tracking/           # Rastreamento de pedidos
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página inicial
├── components/             # Componentes React
│   ├── auth/               # Componentes de autenticação
│   ├── checkout/           # Componentes de checkout
│   ├── ui/                 # Componentes de UI reutilizáveis
│   └── ...                 # Outros componentes
├── contexts/               # Contextos React
├── hooks/                  # Hooks personalizados
├── lib/                    # Utilitários e helpers
├── public/                 # Arquivos estáticos
├── services/               # Serviços de API
├── styles/                 # Estilos globais
└── types/                  # Definições de tipos TypeScript
```

## Componentes Principais

### Layout e Navegação

- **Header**: Barra de navegação principal com carrinho, busca e autenticação
- **InstantSearch**: Busca em tempo real com sugestões
- **Cart**: Componente de carrinho de compras


### Produtos

- **ProductCard**: Card de produto para listagem
- **ProductDetail**: Página detalhada do produto
- **ProductList**: Lista de produtos com paginação infinita
- **ProductsLoading**: Skeleton loading para produtos


### Checkout

- **CheckoutForm**: Formulário de checkout multi-etapas
- **AddressForm**: Formulário de endereço com integração dos Correios
- **PaymentForm**: Formulário de pagamento (cartão e PIX)
- **OrderSummary**: Resumo do pedido
- **ShippingOptions**: Opções de frete


### Autenticação

- **LoginForm**: Formulário de login
- **AuthProvider**: Provedor de contexto de autenticação
- **UserProfile**: Perfil do usuário


## Fluxos de Usuário

### Navegação e Busca

1. Usuário acessa a página inicial
2. Navega pelo catálogo ou utiliza a busca
3. Visualiza resultados de busca ou lista de produtos
4. Clica em um produto para ver detalhes


### Compra

1. Usuário adiciona produtos ao carrinho
2. Acessa o carrinho e inicia o checkout
3. Preenche endereço de entrega
4. Seleciona método de envio
5. Escolhe forma de pagamento
6. Confirma pedido
7. Recebe confirmação e código de rastreamento


### Autenticação

1. Usuário acessa a página de login
2. Insere credenciais
3. É redirecionado para a página inicial ou página anterior
4. Pode acessar seu perfil e histórico de pedidos


## API e Integração com Backend

### Endpoints da API

- **GET /api/products**: Lista de produtos paginada
- **GET /api/products/[id]**: Detalhes de um produto específico
- **GET /api/products/search**: Busca de produtos
- **GET /api/products/instant-search**: Busca instantânea para sugestões


### Serviços

- **api.ts**: Serviço principal para comunicação com o backend
- **correios-api.ts**: Integração com API dos Correios para cálculo de frete e rastreamento
- **auth.ts**: Serviço de autenticação


### Estratégia de Cache

Utilizamos uma estratégia de cache personalizada para melhorar a performance:

- Cache no cliente com TTL configurável
- Invalidação de cache seletiva
- Atualização em segundo plano para dados obsoletos


## Autenticação

### Fluxo de Autenticação

1. Usuário insere credenciais no formulário de login
2. Frontend valida as credenciais contra o backend
3. Em caso de sucesso, armazena token/dados do usuário em localStorage e cookies
4. Middleware protege rotas que requerem autenticação


### Proteção de Rotas

Utilizamos o middleware do Next.js para proteger rotas que requerem autenticação:

- **/profile**: Perfil do usuário
- **/checkout**: Processo de checkout


### Contexto de Autenticação

O `AuthContext` fornece:

- Estado atual do usuário
- Função de login
- Função de logout
- Estado de carregamento


## Gerenciamento de Estado

### Contextos

- **CartContext**: Gerencia o estado do carrinho de compras
- **CheckoutContext**: Gerencia o estado do processo de checkout
- **AuthContext**: Gerencia o estado de autenticação


### Persistência

- **localStorage**: Para persistir dados entre sessões
- **Cookies**: Para autenticação e verificação no servidor


## Instruções de Instalação e Execução

### Requisitos

- Node.js 18.x ou superior
- npm ou yarn


### Instalação

```shellscript
# Clone o repositório
git clone https://github.com/seu-usuario/ecommerce.git
cd ecommerce

# Instale as dependências
npm install
# ou
yarn install
```

### Configuração

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```plaintext
NEXT_PUBLIC_API_URL=https://apihomolog.innovationbrindes.com.br/api/site/v2
```

### Execução

```shellscript
# Desenvolvimento
npm run dev
# ou
yarn dev

# Produção
npm run build
npm start
# ou
yarn build
yarn start
```

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Compila o projeto para produção
- `npm start`: Inicia o servidor de produção
- `npm run lint`: Executa o linter


## Guia de Contribuição

### Fluxo de Trabalho

1. Crie uma branch a partir da `main`
2. Faça suas alterações
3. Envie um Pull Request para a `main`


### Padrões de Código

- Utilize TypeScript para todos os arquivos
- Siga as convenções de nomenclatura:

- PascalCase para componentes React
- camelCase para funções e variáveis
- kebab-case para arquivos de componentes



- Documente funções e componentes complexos


### Testes

- Escreva testes para novos componentes e funcionalidades
- Execute os testes antes de enviar um PR


```shellscript
npm run test
# ou
yarn test
```

### Commits

Siga o padrão de commits convencionais:

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Alterações na documentação
- `style`: Alterações de formatação
- `refactor`: Refatoração de código
- `test`: Adição ou correção de testes
- `chore`: Alterações em ferramentas de build, etc.


## Componentes Detalhados

### Header

O componente Header é responsável pela navegação principal do site, incluindo:

- Logo da empresa
- Barra de busca instantânea
- Ícones de contato (email e WhatsApp)
- Ícone de rastreamento
- Carrinho de compras
- Menu de usuário (login/perfil)


```typescriptreact
// Exemplo simplificado do Header
<header className="sticky top-0 z-50 w-full bg-[#99CC00] py-4">
  <div className="container mx-auto flex items-center gap-4 px-4">
    <Link href="/">
      <Image src="/logo.png" alt="Innovation Brindes" width={180} height={40} />
    </Link>
    <InstantSearch />
    <div className="flex items-center gap-4">
      {/* Ícones de contato */}
      {/* Carrinho */}
      {/* Autenticação */}
    </div>
  </div>
</header>
```

### ProductCard

O ProductCard exibe informações resumidas de um produto na listagem:

- Imagem do produto
- Título
- Descrição curta
- Preço
- Botões de ação (adicionar ao carrinho, ver detalhes)


```typescriptreact
// Exemplo simplificado do ProductCard
<Card className="h-[380px] flex flex-col overflow-hidden">
  <CardHeader className="p-0">
    <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
  </CardHeader>
  <CardContent className="flex flex-col flex-1 p-4">
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="text-sm text-muted-foreground">{truncatedDescription}</p>
    <div className="mt-auto">
      <p className="text-lg font-bold">{formattedPrice}</p>
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={handleAddToCart}>Adicionar</Button>
        <Button variant="secondary" asChild>
          <Link href={`/products/${id}`}>Detalhes</Link>
        </Button>
      </div>
    </div>
  </CardContent>
</Card>
```

### CheckoutForm

O CheckoutForm gerencia o fluxo de checkout em múltiplas etapas:

- Endereço de entrega
- Opções de frete
- Método de pagamento
- Confirmação do pedido


```typescriptreact
// Exemplo simplificado do CheckoutForm
<CheckoutContainer>
  <StepsContainer>
    {steps.map((step) => (
      <Step key={step.id} active={currentStep === step.id}>
        <StepNumber>{/* ... */}</StepNumber>
        <StepTitle>{step.title}</StepTitle>
      </Step>
    ))}
  </StepsContainer>

  <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
    <FormContainer>
      {currentStep === "address" && <AddressForm onSubmit={handleAddressSubmit} />}
      {currentStep === "payment" && <PaymentForm onSubmit={handlePaymentSubmit} />}
      {currentStep === "confirmation" && <ConfirmationStep />}
    </FormContainer>

    <OrderSummary items={cartItems} total={cartTotal} />
  </div>
</CheckoutContainer>
```

## Considerações de Performance

### Otimizações Implementadas

1. **Server Components**: Utilizamos Server Components do Next.js para renderizar conteúdo estático no servidor, reduzindo o JavaScript enviado ao cliente.
2. **Imagens Otimizadas**: Utilizamos o componente `Image` do Next.js para otimização automática de imagens, incluindo:

1. Carregamento lazy
2. Dimensionamento automático
3. Formatos modernos (WebP)



3. **Paginação Infinita**: Implementamos paginação infinita para carregar produtos sob demanda, melhorando o tempo de carregamento inicial.
4. **Debounce na Busca**: Aplicamos debounce nas consultas de busca para reduzir chamadas desnecessárias à API.
5. **Memoização de Componentes**: Utilizamos `React.memo`, `useCallback` e `useMemo` para evitar renderizações desnecessárias.


### Métricas de Performance

- **First Contentful Paint (FCP)**: < 1.0s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.5s
- **Cumulative Layout Shift (CLS)**: < 0.1


## Considerações de Segurança

### Proteções Implementadas

1. **Sanitização de Entrada**: Todos os inputs do usuário são sanitizados antes de serem processados.
2. **CSRF Protection**: Implementamos proteção contra ataques CSRF nas chamadas de API.
3. **Autenticação Segura**: Utilizamos cookies HttpOnly para armazenar tokens de autenticação.
4. **Validação de Dados**: Utilizamos Zod para validação de esquemas de dados no cliente e servidor.
5. **Headers de Segurança**: Configuramos headers de segurança como Content-Security-Policy, X-XSS-Protection, etc.


## Acessibilidade

O projeto segue as diretrizes WCAG 2.1 nível AA, incluindo:

1. **Semântica HTML**: Utilizamos elementos HTML semânticos para melhor estrutura.
2. **Contraste de Cores**: Garantimos contraste adequado para texto e elementos interativos.
3. **Navegação por Teclado**: Todos os elementos interativos são acessíveis via teclado.
4. **ARIA Labels**: Adicionamos atributos ARIA onde necessário para melhorar a experiência com leitores de tela.
5. **Textos Alternativos**: Todas as imagens possuem textos alternativos descritivos.


## Conclusão

Este projeto de e-commerce para a Innovation Brindes oferece uma solução completa e moderna para venda de brindes personalizados. Com foco em performance, acessibilidade e experiência do usuário, a plataforma proporciona uma jornada de compra fluida e intuitiva.

A arquitetura baseada em Next.js App Router permite escalabilidade e manutenção simplificada, enquanto as integrações com serviços externos como a API dos Correios adicionam funcionalidades essenciais para o negócio.

Para dúvidas ou suporte, entre em contato com a equipe de desenvolvimento.
