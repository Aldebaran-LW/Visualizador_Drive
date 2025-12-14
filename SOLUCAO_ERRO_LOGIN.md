# 🔧 Solução para Erro de Login

## ⚠️ Problema Identificado

O erro "Erro ao fazer login: Object" geralmente acontece por:

1. **Variáveis de ambiente não carregadas** - O Vite precisa ser reiniciado após criar o arquivo `.env`
2. **Popup bloqueado** - O navegador pode estar bloqueando o popup de login
3. **Credenciais incorretas** - Client ID ou API Key podem estar errados

## ✅ Soluções

### Solução 1: Reiniciar o Servidor (MAIS COMUM)

**O Vite só carrega variáveis de ambiente quando inicia!**

1. **Pare o servidor** (Ctrl+C no terminal)
2. **Inicie novamente:**
   ```bash
   npm run dev
   ```
3. **Recarregue a página** no navegador (F5)

### Solução 2: Verificar Credenciais

1. Abra o console do navegador (F12)
2. Procure por mensagens que começam com "🔍 Debug - Credenciais carregadas:"
3. Verifique se mostra:
   - ✅ API Key: Configurada
   - ✅ Client ID: Configurado

Se mostrar "❌ NÃO CONFIGURADO", o arquivo `.env` não está sendo lido.

### Solução 3: Verificar Arquivo .env

1. Certifique-se de que o arquivo `.env` está na **raiz do projeto** (mesma pasta do `package.json`)
2. Verifique se o conteúdo está correto:
   ```env
   VITE_GOOGLE_API_KEY=AIzaSyAYzcg6KlktoHNnhlY0GteMY7VScCK1wg4
   VITE_GOOGLE_CLIENT_ID=90490674854-clne9usjo771k280mo2l3t370fb42adj.apps.googleusercontent.com
   ```
3. **Não** deve ter espaços antes ou depois do `=`
4. **Não** deve ter aspas ao redor dos valores

### Solução 4: Permitir Popups

1. No navegador, verifique se os popups estão bloqueados
2. Clique no ícone de bloqueio na barra de endereços
3. Permita popups para `localhost:3000`

### Solução 5: Verificar Usuário de Teste

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Vá em **APIs e Serviços** > **Tela de consentimento OAuth**
3. Clique na aba **"Público-alvo"**
4. Verifique se seu email está na lista de **"Usuários de teste"**
5. Se não estiver, adicione seu email

## 🔍 Debug Avançado

Se ainda não funcionar, abra o console do navegador (F12) e verifique:

1. **Erros no console** - Procure por mensagens em vermelho
2. **Credenciais** - Procure por "🔍 Debug - Credenciais carregadas:"
3. **Erros de rede** - Aba "Network" para ver requisições falhando

## 📝 Checklist Rápido

- [ ] Arquivo `.env` existe na raiz do projeto
- [ ] Arquivo `.env` tem as credenciais corretas
- [ ] Servidor foi **reiniciado** após criar o `.env`
- [ ] Página foi recarregada (F5)
- [ ] Email está na lista de usuários de teste
- [ ] Popups estão permitidos no navegador
- [ ] Console mostra "✅ Configurada" para ambas as credenciais

## 🆘 Se Nada Funcionar

1. Pare o servidor (Ctrl+C)
2. Delete a pasta `node_modules` (se existir)
3. Execute `npm install` novamente
4. Verifique o arquivo `.env` novamente
5. Execute `npm run dev`
6. Recarregue a página

---

**A solução mais comum é reiniciar o servidor após criar o arquivo .env!** 🔄

