# 🚀 Guia de Deploy

## 📦 Commit Realizado

✅ **Commit realizado com sucesso!**
- Arquivos commitados: 3 novos arquivos de documentação
- Push para GitHub: ✅ Concluído

---

## 🌐 Opções de Deploy

### 1. Vercel (Recomendado - Mais Fácil)

#### Passo a Passo:

1. **Acesse:** https://vercel.com
2. **Faça login** com sua conta GitHub
3. **Clique em "Add New Project"**
4. **Importe o repositório** `Visualizador_Drive`
5. **Configure o projeto:**
   - Framework Preset: **Vite**
   - Build Command: `npm run build` (já configurado)
   - Output Directory: `dist` (já configurado)
   - Install Command: `npm install` (já configurado)

6. **Configure Variáveis de Ambiente:**
   - Clique em "Environment Variables"
   - Adicione:
     - `VITE_GOOGLE_API_KEY` = `AIzaSyAYzcg6KlktoHNnhlY0GteMY7VScCK1wg4`
     - `VITE_GOOGLE_CLIENT_ID` = `90490674854-clne9usjo771k280mo2l3t370fb42adj.apps.googleusercontent.com`

7. **Clique em "Deploy"**
8. **Aguarde o deploy** (2-3 minutos)
9. **Pronto!** Sua aplicação estará online

#### ⚠️ Importante - Configurar OAuth:

Após o deploy, você precisará:

1. **Adicionar o domínio do Vercel** nas URIs autorizadas do Google Cloud:
   - Acesse: https://console.cloud.google.com/apis/credentials
   - Edite o OAuth Client ID
   - Em "Authorized JavaScript origins", adicione:
     - `https://seu-projeto.vercel.app`
   - Em "Authorized redirect URIs", adicione:
     - `https://seu-projeto.vercel.app`
   - Salve

2. **Atualizar o Firebase:**
   - Acesse: https://console.firebase.google.com/project/lwdigitalforge-577c4/authentication/settings
   - Em "Authorized domains", adicione:
     - `seu-projeto.vercel.app`
   - Salve

---

### 2. Netlify

#### Passo a Passo:

1. **Acesse:** https://app.netlify.com
2. **Faça login** com sua conta GitHub
3. **Clique em "Add new site" > "Import an existing project"**
4. **Conecte ao GitHub** e selecione o repositório
5. **Configure:**
   - Build command: `npm run build`
   - Publish directory: `dist`

6. **Configure Variáveis de Ambiente:**
   - Site settings > Environment variables
   - Adicione as mesmas variáveis do Vercel

7. **Deploy!**

#### Configurar OAuth (mesmo processo do Vercel)

---

### 3. Firebase Hosting

#### Passo a Passo:

1. **Instale Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login no Firebase:**
   ```bash
   firebase login
   ```

3. **Inicialize o projeto:**
   ```bash
   firebase init hosting
   ```
   - Selecione o projeto: `lwdigitalforge-577c4`
   - Public directory: `dist`
   - Single-page app: `Yes`
   - Build command: `npm run build`

4. **Crie arquivo `.env.production`** (opcional, ou use variáveis do Firebase):
   ```env
   VITE_GOOGLE_API_KEY=AIzaSyAYzcg6KlktoHNnhlY0GteMY7VScCK1wg4
   VITE_GOOGLE_CLIENT_ID=90490674854-clne9usjo771k280mo2l3t370fb42adj.apps.googleusercontent.com
   ```

5. **Deploy:**
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

---

## ⚙️ Configurações Necessárias Após Deploy

### 1. Google Cloud Console

Adicione o domínio de produção nas URIs autorizadas:

1. Acesse: https://console.cloud.google.com/apis/credentials
2. Edite o OAuth Client ID: `90490674854-clne9usjo771k280mo2l3t370fb42adj.apps.googleusercontent.com`
3. Adicione em "Authorized JavaScript origins":
   - `https://seu-dominio.vercel.app` (ou netlify.app, firebaseapp.com)
4. Adicione em "Authorized redirect URIs":
   - `https://seu-dominio.vercel.app`
5. Salve

### 2. Firebase Console

Adicione o domínio autorizado:

1. Acesse: https://console.firebase.google.com/project/lwdigitalforge-577c4/authentication/settings
2. Em "Authorized domains", clique em "Add domain"
3. Adicione: `seu-dominio.vercel.app` (sem https://)
4. Salve

---

## 🔄 Deploy Automático

### Vercel e Netlify

- ✅ **Deploy automático** a cada push no `main`
- ✅ Build automático
- ✅ Preview de PRs

### Firebase Hosting

- ⚠️ Deploy manual ou configure GitHub Actions

---

## 📝 Checklist de Deploy

- [ ] Fazer commit e push no GitHub
- [ ] Escolher plataforma de deploy (Vercel/Netlify/Firebase)
- [ ] Configurar variáveis de ambiente
- [ ] Fazer deploy
- [ ] Adicionar domínio no Google Cloud Console
- [ ] Adicionar domínio no Firebase Console
- [ ] Testar login e funcionalidades
- [ ] Verificar se vídeos carregam corretamente

---

## 🎯 Recomendação

**Use Vercel** - É a opção mais simples e rápida:
- ✅ Deploy automático
- ✅ HTTPS gratuito
- ✅ CDN global
- ✅ Fácil configuração
- ✅ Preview de PRs

---

## 🔗 Links Úteis

- **Vercel:** https://vercel.com
- **Netlify:** https://app.netlify.com
- **Firebase Hosting:** https://console.firebase.google.com
- **Google Cloud Console:** https://console.cloud.google.com
- **Firebase Console:** https://console.firebase.google.com

---

**Boa sorte com o deploy! 🚀**

