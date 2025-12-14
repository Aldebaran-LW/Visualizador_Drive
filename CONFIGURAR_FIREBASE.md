# 🔥 Configurar Firebase Authentication

## ✅ O que foi feito

A aplicação agora usa **Firebase Authentication** para login, o que resolve o problema de origem autorizada!

---

## 🔧 Configuração Necessária no Firebase Console

Para que funcione completamente, você precisa adicionar `localhost:3000` como domínio autorizado no Firebase:

### Passo 1: Acessar Firebase Console

1. Acesse: **https://console.firebase.google.com/**
2. Selecione seu projeto: **lwdigitalforge-577c4**

### Passo 2: Configurar Domínios Autorizados

1. No menu lateral, vá em **"Authentication"** (Autenticação)
2. Clique na aba **"Settings"** (Configurações) ou **"Configurações"**
3. Role até a seção **"Authorized domains"** (Domínios autorizados)
4. Clique em **"Add domain"** (Adicionar domínio)
5. Adicione: `localhost`
6. Clique em **"Add"** (Adicionar)

### Passo 3: Verificar Provedor Google

1. Ainda em **"Authentication"**, vá em **"Sign-in method"** (Método de login)
2. Verifique se o **Google** está habilitado
3. Se não estiver, clique em **Google** e habilite
4. Configure o **Email de suporte** e **Nome do projeto**
5. Salve

### Passo 4: Configurar Tela de Consentimento (Reduzir Avisos)

1. No Google Cloud Console (mesmo projeto do Firebase), vá em **"APIs e Serviços"** > **"Tela de consentimento OAuth"**
2. Configure:
   - **Tipo de usuário**: Externo (ou Interno se for apenas para sua organização)
   - **Nome do app**: Visualizador de Vídeos
   - **Email de suporte**: Seu email
   - **Email de contato do desenvolvedor**: Seu email
3. Em **"Usuários de teste"**, adicione seu email e de outros usuários de teste
4. Isso reduzirá os avisos de "app não verificado" para usuários de teste

---

## ✅ Vantagens do Firebase Authentication

1. ✅ **Não precisa configurar origens no Google Cloud Console** - Firebase gerencia isso
2. ✅ **Login mais simples e confiável**
3. ✅ **Gerenciamento automático de sessões**
4. ✅ **Suporte a múltiplos usuários nativo**

---

## 🚀 Como Funciona Agora

1. **Login**: Usa Firebase Authentication com Google Provider
2. **Token**: Obtém automaticamente o access token do Google OAuth
3. **Google Drive**: Usa o token para acessar a API do Google Drive
4. **Sessão**: Firebase gerencia automaticamente a sessão do usuário

---

## 📝 Notas Importantes

- O Firebase já está configurado com suas credenciais
- O domínio `localhost` já deve estar autorizado por padrão no Firebase
- Se ainda houver problemas, verifique as configurações acima

---

## 🆘 Se Ainda Não Funcionar

1. Verifique se o Google está habilitado em "Sign-in method"
2. Verifique se `localhost` está em "Authorized domains"
3. Limpe o cache do navegador
4. Tente em uma aba anônima

---

**Agora você pode testar o login! O Firebase deve resolver o problema de origem autorizada.** 🎉

