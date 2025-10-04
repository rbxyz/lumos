# Lumos App: Terminal Financeiro Hacker

Acesso rápido e imersivo a dados de ações, fundos e ETFs com estética de terminal.  

O **Lumos App** é uma PWA de alta performance para monitoramento e análise de dados do mercado financeiro em tempo real.  
A interface adota o estilo **"Hacker Green"**, priorizando velocidade, densidade de informação e imersão.

Este projeto foi inspirado em iniciativas como **["O olho que tudo vê"](https://github.com/jdalmeida/olho-que-tudo-ve)**, do desenvolvedor [jdalmeida](https://github.com/jdalmeida), que explora conceitos semelhantes de coleta e exibição de informações financeiras em tempo real.

---

## Stack Tecnológica

| Componente         | Tecnologia Principal | Função                                                                 |
|--------------------|----------------------|------------------------------------------------------------------------|
| **Frontend/Server** | Next.js 14+          | Roteamento, SSR/SSG e otimização                                       |
| **Tipagem**        | TypeScript           | Tipagem ponta-a-ponta                                                  |
| **Comunicação**    | tRPC                 | Chamadas de API seguras e tipadas entre frontend e backend             |
| **Estilização**    | Tailwind CSS         | Estilização utilitária no tema "Hacker Green"                          |
| **Persistência**   | Prisma + PostgreSQL  | ORM tipado e persistência de dados de usuários e configurações         |
| **Cache/Realtime** | Redis + WebSockets   | Cache para APIs de mercado e entrega de dados em tempo real            |

---

## Arquitetura e Funcionalidades

### 1. Interface "Hacker Green"
- **Paleta**: fundo escuro `#080808` e destaques em verde neon `#00FF41`.  
- **Tipografia**: fontes monospace (ex.: Fira Code).  
- **Efeitos visuais**: glow (text-shadow), textura de scanlines e estilo CRT.  

### 2. Gateway de Dados
- **tRPC como middleware**: centraliza e tipa todas as requisições.  
- **Cache com Redis**: respostas rápidas e proteção contra limites de APIs externas.  
- **Live Feed**: servidor WebSocket envia cotações em tempo real (tick-a-tick).  

### 3. Segurança e Autorização
- **Autenticação**: NextAuth.js, com persistência via Prisma/PostgreSQL.  
- **Autorização**: middleware no tRPC para proteger consultas de mercado, restritas a usuários autenticados.  

---

## Configuração e Execução Local

### Pré-requisitos
- Node.js v18+  
- pnpm  
- Docker (recomendado para PostgreSQL e Redis)  

### Passos

1. **Clonar repositório e instalar dependências**:
   ```bash
   git clone [seu-repo-url] lumos-app
   cd lumos-app
   pnpm install

2. **Configurar variáveis de ambiente**:
Crie o arquivo .env com:
    ```bash
    DATABASE_URL → conexão PostgreSQL

    NEXTAUTH_SECRET → chave para sessões

    Chaves das APIs externas (ex.: ALPHA_VANTAGE_KEY)

3. **Inicializar banco e cache**:
    ```bash
    docker-compose up -d
    pnpm prisma db push


4. **Rodar aplicação**:
    ```bash
    pnpm dev


Acesse em: http://localhost:3000

5. **Contribuição**

Contribuições são bem-vindas.

Abra uma Issue para discutir novas funcionalidades.

Envie Pull Requests para correções e melhorias.