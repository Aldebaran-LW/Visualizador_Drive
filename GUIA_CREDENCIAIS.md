# 🔑 Guia Passo a Passo - Como Obter as Credenciais do Google Drive API

Este guia vai te ajudar a obter todas as credenciais necessárias para a aplicação funcionar.

---

## 📍 PASSO 1: Acessar o Google Cloud Console

1. Abra seu navegador e acesse: **https://console.cloud.google.com/**
2. Faça login com sua conta Google (a mesma que você usa no Drive)

---

## 📍 PASSO 2: Criar um Novo Projeto

1. No topo da página, você verá um dropdown com o nome do projeto atual
2. Clique nele e depois clique em **"NOVO PROJETO"** (ou "New Project")
3. Preencha:
   - **Nome do projeto**: `Visualizador Drive` (ou qualquer nome que preferir)
   - **Organização**: Deixe como está (ou selecione se tiver)
4. Clique em **"CRIAR"** (ou "Create")
5. Aguarde alguns segundos até o projeto ser criado
6. Selecione o projeto recém-criado no dropdown do topo

---

## 📍 PASSO 3: Ativar a Google Drive API

1. No menu lateral esquerdo, procure por **"APIs e Serviços"** (ou "APIs & Services")
2. Clique em **"Biblioteca"** (ou "Library")
3. Na barra de pesquisa no topo, digite: **"Google Drive API"**
4. Clique no resultado **"Google Drive API"**
5. Na página que abrir, clique no botão azul **"ATIVAR"** (ou "ENABLE")
6. Aguarde alguns segundos até aparecer a mensagem de sucesso

---

## 📍 PASSO 4: Configurar a Tela de Consentimento OAuth

### ⚠️ IMPORTANTE: Esta etapa é DIFERENTE da seção "Credenciais"!

1. No menu lateral esquerdo, procure por **"APIs e Serviços"** (ou "APIs & Services")
2. Clique em **"Tela de consentimento OAuth"** (ou "OAuth consent screen")
   - ⚠️ **NÃO** é "Credenciais" - é uma opção separada no menu!
   - Se você não ver essa opção, clique em "APIs e Serviços" primeiro e depois procure no submenu

3. Se for a primeira vez, você verá uma tela pedindo para escolher o tipo:
   - Selecione **"Externo"** (ou "External")
   - Clique em **"CRIAR"** (ou "CREATE")

4. **Passo 1 - Informações do app**:
   - **Nome do app**: `Visualizador de Vídeos` (ou qualquer nome)
   - **Email de suporte do usuário**: Seu email
   - **Logo do app**: (Opcional - pode pular clicando em "Pular")
   - **Domínio de publicação do app**: (Deixe em branco por enquanto)
   - **Email de contato do desenvolvedor**: Seu email
   - Clique em **"SALVAR E CONTINUAR"** (ou "SAVE AND CONTINUE") no final da página

5. **Passo 2 - Escopos**:
   - Você verá uma lista de escopos (permissões)
   - Se não aparecer nenhum escopo, não se preocupe - será adicionado automaticamente
   - Clique em **"SALVAR E CONTINUAR"** (ou "SAVE AND CONTINUE")

6. **Passo 3 - Usuários de teste** (ESTA É A PARTE QUE VOCÊ ESTÁ PROCURANDO!):
   - Você verá uma seção chamada **"Usuários de teste"** (ou "Test users")
   - Procure por um botão ou campo que diz:
     - **"+ ADICIONAR USUÁRIOS"** (ou "+ ADD USERS")
     - Ou **"Adicionar usuários"** (ou "Add users")
   - Clique nesse botão
   - Uma caixa de diálogo ou campo de texto vai aparecer
   - Digite seu email (o mesmo que você usa no Google)
   - Clique em **"ADICIONAR"** (ou "ADD") ou pressione Enter
   - Seu email deve aparecer na lista de usuários de teste
   - Clique em **"SALVAR E CONTINUAR"** (ou "SAVE AND CONTINUE")

7. **Passo 4 - Resumo**:
   - Revise as informações
   - Clique em **"VOLTAR AO PAINEL"** (ou "BACK TO DASHBOARD")

### 🔍 Se você NÃO encontrar "Usuários de teste":

**Opção A - Você já configurou antes:**
- Se você já passou por essa tela antes, a tela de consentimento já existe
- Nesse caso, volte para a página da Tela de Consentimento OAuth
- Você verá várias abas no topo: "Visão geral", "Público-alvo", "Acesso a dados", etc.
- Clique na aba **"Público-alvo"** (ou "Audience")
- Role a página para baixo até encontrar a seção **"Usuários de teste"**
- Clique em **"+ ADICIONAR USUÁRIOS"** ou **"Adicionar usuários"**

**Opção B - A interface mudou:**
- Procure por uma seção chamada **"Test users"** ou **"Usuários de teste"**
- Pode estar em uma aba lateral ou em uma seção expandível
- Procure por um botão com ícone de "+" ou "Adicionar"

---

## 📍 PASSO 5: Criar o ID do Cliente OAuth 2.0

1. No menu lateral, vá em **"APIs e Serviços"** > **"Credenciais"** (ou "Credentials")
2. Clique no botão **"+ CRIAR CREDENCIAIS"** (ou "+ CREATE CREDENTIALS") no topo
3. Selecione **"ID do cliente OAuth"** (ou "OAuth client ID")

4. Se aparecer uma mensagem pedindo para configurar a tela de consentimento, você já fez isso no passo anterior, então pode continuar

5. Na tela de criação:
   - **Tipo de aplicativo**: Selecione **"Aplicativo da Web"** (ou "Web application")
   - **Nome**: `Visualizador Drive Web` (ou qualquer nome)

6. Em **"URIs de redirecionamento autorizados"** (ou "Authorized redirect URIs"):
   - Clique em **"+ ADICIONAR URI"** (ou "+ ADD URI")
   - Digite: `http://localhost:3000`
   - Clique em **"+ ADICIONAR URI"** novamente
   - Digite: `http://localhost:3000/login` (opcional, mas recomendado)

7. Clique em **"CRIAR"** (ou "CREATE")

8. **IMPORTANTE**: Uma janela popup vai aparecer com suas credenciais!
   - **Copie o "ID DO CLIENTE"** (ou "Client ID") - você vai precisar dele!
   - Anote em algum lugar seguro
   - Exemplo: `123456789-abcdefghijklmnop.apps.googleusercontent.com`
   - Clique em **"OK"**

---

## 📍 PASSO 6: Criar a Chave de API

1. Ainda na página de **"Credenciais"**
2. Clique novamente em **"+ CRIAR CREDENCIAIS"** (ou "+ CREATE CREDENTIALS")
3. Selecione **"Chave de API"** (ou "API key")

4. **IMPORTANTE**: Outra janela popup vai aparecer!
   - **Copie a "CHAVE DE API"** (ou "API key") - você vai precisar dela!
   - Anote em algum lugar seguro
   - Exemplo: `AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz`
   - Clique em **"FECHAR"** (ou "CLOSE")

5. **(Opcional mas Recomendado)**: Para maior segurança:
   - Clique no ícone de lápis (editar) ao lado da chave de API que você acabou de criar
   - Em **"Restrições de API"** (ou "API restrictions"):
     - Selecione **"Restringir chave"** (ou "Restrict key")
     - Em **"Selecionar APIs"**, escolha **"Google Drive API"**
   - Clique em **"SALVAR"** (ou "SAVE")

---

## 📍 PASSO 7: Configurar o Arquivo .env

1. Volte para o projeto no seu computador
2. Na raiz do projeto (mesma pasta onde está o `package.json`), crie um arquivo chamado **`.env`**
   - **Importante**: O arquivo deve se chamar exatamente `.env` (com o ponto no início)
   - No Windows, se não conseguir criar, use o comando no terminal:
     ```bash
     echo. > .env
     ```

3. Abra o arquivo `.env` e cole o seguinte conteúdo:

```env
VITE_GOOGLE_API_KEY=COLE_AQUI_SUA_CHAVE_DE_API
VITE_GOOGLE_CLIENT_ID=COLE_AQUI_SEU_ID_DO_CLIENTE
```

4. **Substitua**:
   - `COLE_AQUI_SUA_CHAVE_DE_API` pela **Chave de API** que você copiou no Passo 6
   - `COLE_AQUI_SEU_ID_DO_CLIENTE` pelo **ID do Cliente** que você copiou no Passo 5

5. **Exemplo de como deve ficar**:
```env
VITE_GOOGLE_API_KEY=AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz
VITE_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
```

6. **Salve o arquivo**

---

## 📍 PASSO 8: Instalar e Testar

1. Abra o terminal na pasta do projeto
2. Execute:
```bash
npm install
```

3. Depois execute:
```bash
npm run dev
```

4. Abra o navegador em: **http://localhost:3000**

5. Clique em **"Entrar com Google"**

6. Faça login com sua conta Google

7. Autorize o acesso ao Google Drive quando solicitado

8. **Pronto!** Você deve ver seus vídeos listados! 🎉

---

## ⚠️ Problemas Comuns e Soluções

### ❌ Erro: "Access blocked: This app's request is invalid"

**Solução**:
- Verifique se o Client ID está correto no arquivo `.env`
- Verifique se você adicionou `http://localhost:3000` nas URIs de redirecionamento
- Certifique-se de que está usando `http://` e não `https://`
- Verifique se você adicionou seu email como usuário de teste na tela de consentimento

### ❌ Erro: "API key not valid"

**Solução**:
- Verifique se a chave de API está correta no arquivo `.env`
- Verifique se a Google Drive API está ativada
- Se você restringiu a chave, verifique se a restrição está correta

### ❌ Vídeos não aparecem

**Solução**:
- Verifique se há vídeos no seu Google Drive
- Verifique se você autorizou o acesso ao Drive durante o login
- Abra o console do navegador (F12) e veja se há erros
- Tente fazer logout e login novamente

### ❌ Não consigo criar o arquivo .env

**Solução (Windows)**:
```bash
# No terminal, na pasta do projeto:
type nul > .env
```

**Solução (Mac/Linux)**:
```bash
# No terminal, na pasta do projeto:
touch .env
```

---

## ✅ Checklist Final

Antes de usar a aplicação, verifique se você tem:

- [ ] Projeto criado no Google Cloud Console
- [ ] Google Drive API ativada
- [ ] Tela de consentimento OAuth configurada
- [ ] ID do Cliente OAuth criado e copiado
- [ ] Chave de API criada e copiada
- [ ] Arquivo `.env` criado com as credenciais
- [ ] Dependências instaladas (`npm install`)
- [ ] Aplicação rodando (`npm run dev`)

---

## 🎯 Próximos Passos

Depois de configurar tudo:

1. A aplicação já está pronta para múltiplos usuários!
2. Cada pessoa que fizer login verá apenas os vídeos do seu próprio Google Drive
3. Cada usuário pode editar (cortar) seus próprios vídeos
4. Os vídeos só podem ser acessados através da aplicação (com autenticação)

---

## 📞 Precisa de Ajuda?

Se ainda tiver problemas:
1. Verifique o console do navegador (F12) para ver erros
2. Verifique se todas as credenciais estão corretas no arquivo `.env`
3. Certifique-se de que seguiu todos os passos acima

**Boa sorte! 🚀**

