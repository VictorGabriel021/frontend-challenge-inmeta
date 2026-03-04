# 🃏 Card Trade Marketplace

Aplicação frontend desenvolvida em Vue 3 para gerenciamento de trocas de cartas entre usuários.

O sistema permite visualizar trocas disponíveis no marketplace, criar novas solicitações de troca e excluir solicitações próprias.

---

## 🚀 Demo

🔗 Deploy: https://marketplace-yugioh.netlify.app/

---

## 📌 Funcionalidades

- ✅ Cadastro de Usuário
- ✅ Login
- ✅ Listagem paginada de trades
- ✅ Load more no marketplace
- ✅ Criação de nova trade
- ✅ Seleção de carta oferecida (usuário)
- ✅ Seleção de carta desejada (sistema)
- ✅ Paginação de cartas do sistema dentro do modal com Load More
- ✅ Exclusão de trade com confirmação
- ✅ Atualização automática da lista após criação/exclusão
- ✅ Feedback visual com loading states
- ✅ Toast notifications para ações do usuário

---

## 🧠 Decisões Técnicas

### 📍 Arquitetura

Foi adotado um padrão inspirado em MVVM (Model–View–ViewModel) com o uso de um useMarketplaceViewModel para:

- Centralizar a lógica de negócio e regras da aplicação
- Evitar a dispersão de chamadas de API dentro dos componentes visuais
- Garantir separação clara entre UI (View) e estado/regra de negócio (ViewModel)
- Melhorar a organização, legibilidade e escalabilidade do código

Essa abordagem facilita manutenção futura e reduz acoplamento entre camada de apresentação e camada de dados.

### 📍 Paginação

A paginação foi implementada manualmente utilizando:

- `page`
- `rpp` (results per page)
- `more` (flag de continuidade)

Isso permite controle explícito do estado da aplicação.

### 📍 Modal de Criação

O modal possui:

- Busca das cartas do usuário
- Paginação das cartas do sistema
- Controle independente de loading
- Reset automático ao fechar

### 📍 Exclusão com Confirmação

A exclusão de trades foi implementada com:

- Verificação de propriedade (usuário só pode deletar o que é seu)
- Modal de confirmação
- Atualização otimista da lista local

---

## ⚙️ Tecnologias Utilizadas

- Vue 3
- Zustand
- Composition API
- TypeScript
- Vite
- Vue Router
- TailwindCSS
- Axios
- Lucide Icons
- Vue Sonner (Toast)

---

🚀 Melhorias Arquiteturais Futuras

Caso o sistema evoluísse para um produto maior, eu implementaria:

🧭 Navegação Lateral (Layout Autenticado)

Adicionar um layout com navegação lateral fixa (sidebar) quando o usuário estiver autenticado, permitindo organizar melhor as rotas do sistema, como por exemplo:

Marketplace

Minhas Trocas

Minhas Cartas

Perfil

Configurações

Isso melhora UX, escalabilidade de rotas e organização estrutural da aplicação.

✅ Validação de Formulários

Em um cenário com formulários mais complexos (cadastro, edição de perfil, autenticação, etc.), seria recomendado utilizar uma biblioteca de validação como:

VeeValidate

Ela permite:

Validação declarativa

Integração com schemas (ex: Yup ou Zod)

Melhor controle de erros de formulário

Escalabilidade conforme o sistema cresce

🚫 Página 404 (Not Found)

Adicionar uma rota fallback (NotFound) para capturar URLs inválidas, melhorando a experiência do usuário e deixando o roteamento mais robusto.

⚡ Cache e Gerenciamento de Estado com TanStack Query

Para otimização de performance e controle de cache, seria interessante utilizar:

TanStack Query (Vue Query)

Especialmente na tela de Marketplace, pois:

Não é uma tela que exige atualização em tempo real

Pode se beneficiar de cache com staleTime

Reduz chamadas repetidas à API

Permite revalidação automática em background

Isso tornaria o controle de loading, erro e cache mais robusto e simplificaria parte da lógica manual atualmente implementada.

## 📦 Instalação e Execução

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/VictorGabriel021/frontend-challenge-inmeta.git

2️⃣ Instalar dependências
npm install

3️⃣ Rodar em ambiente de desenvolvimento
npm run dev
```
