# 📋 Guia de Configuração - Visualizador de Vídeos Google Drive

## Passo a Passo para Configurar o Google Drive API

### 1. Criar Projeto no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Clique em "Selecionar projeto" no topo
3. Clique em "Novo Projeto"
4. Dê um nome ao projeto (ex: "Visualizador Drive")
5. Clique em "Criar"

### 2. Ativar Google Drive API

1. No menu lateral, vá em **APIs e Serviços** > **Biblioteca**
2. Procure por "Google Drive API"
3. Clique em "Google Drive API"
4. Clique em **Ativar**

### 3. Criar Credenciais OAuth 2.0

1. Vá em **APIs e Serviços** > **Credenciais**
2. Clique em **+ Criar Credenciais** > **ID do cliente OAuth**
3. Se solicitado, configure a tela de consentimento:
   - Tipo de usuário: **Externo**
   - Nome do app: "Visualizador de Vídeos"
   - Email de suporte: seu email
   - Clique em **Salvar e Continuar**
   - Adicione seu email como usuário de teste
   - Clique em **Salvar e Continuar**
   - Revise e clique em **Voltar ao painel**

4. Configure o ID do cliente OAuth:
   - Tipo de aplicativo: **Aplicativo da Web**
   - Nome: "Visualizador Drive Web"
   - **URIs de redirecionamento autorizados**:
     - `http://localhost:3000`
     - `http://localhost:3000/login` (opcional)
   - Clique em **Criar**

5. **Copie o ID do Cliente** (você precisará dele)

### 4. Criar Chave de API

1. Ainda em **Credenciais**
2. Clique em **+ Criar Credenciais** > **Chave de API**
3. **Copie a chave de API** (você precisará dela)
4. (Opcional) Clique em **Restringir chave** para maior segurança:
   - Restrições de API: Selecione "Google Drive API"
   - Salve

### 5. Configurar o Projeto

1. No diretório do projeto, crie um arquivo `.env`:

```env
VITE_GOOGLE_API_KEY=sua_chave_api_aqui
VITE_GOOGLE_CLIENT_ID=seu_client_id_aqui
```

2. Substitua `sua_chave_api_aqui` pela chave de API copiada
3. Substitua `seu_client_id_aqui` pelo ID do cliente copiado

### 6. Instalar e Executar

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev
```

### 7. Testar

1. Acesse `http://localhost:3000`
2. Clique em "Entrar com Google"
3. Faça login com sua conta Google
4. Autorize o acesso ao Google Drive
5. Você deve ver seus vídeos listados!

## 🔒 Configurações de Segurança Adicionais

### Restringir Acesso aos Vídeos

Para garantir que os vídeos só sejam acessíveis através do app:

1. No Google Drive, compartilhe os vídeos apenas com sua conta
2. Ou configure as permissões para "Apenas você"
3. Os vídeos serão acessíveis apenas através da autenticação OAuth

### Configurar Domínios Autorizados (Produção)

Quando for fazer deploy:

1. No Google Cloud Console, vá em **APIs e Serviços** > **Credenciais**
2. Edite seu ID do Cliente OAuth
3. Adicione seus domínios de produção em:
   - **Origens JavaScript autorizadas**
   - **URIs de redirecionamento autorizados**

## ⚠️ Problemas Comuns

### Erro: "Access blocked: This app's request is invalid"

- Verifique se o Client ID está correto no `.env`
- Verifique se as URIs de redirecionamento estão configuradas corretamente
- Certifique-se de que está usando `http://localhost:3000` (não `https`)

### Erro: "API key not valid"

- Verifique se a chave de API está correta no `.env`
- Verifique se a Google Drive API está ativada
- Verifique se a chave não tem restrições que bloqueiem o uso

### Vídeos não aparecem

- Verifique se há vídeos no seu Google Drive
- Verifique se você autorizou o acesso ao Drive durante o login
- Verifique o console do navegador para erros

## 📚 Recursos Adicionais

- [Documentação Google Drive API](https://developers.google.com/drive/api/v3/about-sdk)
- [Guia OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)

