# 🔍 Diagnóstico - Erro de Origem Persiste

## ✅ Você já adicionou a origem, mas o erro continua?

Vamos diagnosticar o problema passo a passo.

---

## 🔍 Verificações Imediatas

### 1. Verificar se Salvou Corretamente

1. Volte para o Google Cloud Console
2. Edite o ID do Cliente OAuth novamente
3. Verifique se `http://localhost:3000` está realmente listado em:
   - **"Origens JavaScript autorizadas"**
   - **"URIs de redirecionamento autorizados"**

### 2. Verificar Formato Correto

Certifique-se de que está exatamente assim:
- ✅ `http://localhost:3000` (correto)
- ❌ `https://localhost:3000` (errado - não use https)
- ❌ `http://localhost:3000/` (errado - sem barra no final)
- ❌ `http://127.0.0.1:3000` (errado - use localhost)

### 3. Aguardar Propagação

As alterações podem levar **até 5 minutos** para serem aplicadas. Aguarde alguns minutos e tente novamente.

---

## 🧹 Limpar Cache e Testar

### Opção 1: Limpar Cache do Navegador

1. Pressione **Ctrl+Shift+Delete**
2. Selecione "Imagens e arquivos em cache"
3. Selecione "Última hora" ou "Todo o período"
4. Clique em "Limpar dados"
5. Recarregue a página (F5)

### Opção 2: Usar Modo Anônimo

1. Abra uma **aba anônima** (Ctrl+Shift+N no Chrome)
2. Acesse `http://localhost:3000`
3. Tente fazer login

### Opção 3: Limpar Dados do Site

1. Pressione **F12** (abrir DevTools)
2. Vá na aba **"Application"** (ou "Aplicativo")
3. No menu lateral, clique em **"Storage"** (ou "Armazenamento")
4. Clique em **"Clear site data"** (ou "Limpar dados do site")
5. Recarregue a página

---

## 🔄 Reiniciar Servidor

1. Pare o servidor (Ctrl+C no terminal)
2. Execute novamente:
   ```bash
   npm run dev
   ```
3. Aguarde o servidor iniciar completamente
4. Recarregue a página

---

## 🔍 Verificar Configuração no Console

Abra o console do navegador (F12) e verifique:

1. **Credenciais carregadas:**
   - Procure por: `🔍 Debug - Credenciais carregadas:`
   - Deve mostrar: `✅ Configurada` para ambas

2. **Erros no console:**
   - Veja se há outros erros além do de origem
   - Copie qualquer mensagem de erro

---

## ⚙️ Verificar Configuração no Google Cloud

### Verificar se está no Projeto Correto

1. No topo do Google Cloud Console, verifique o nome do projeto
2. Deve ser: **"Visualizador Drive"**
3. Se não for, selecione o projeto correto

### Verificar ID do Cliente

1. Certifique-se de que está editando o ID do Cliente correto:
   - ID: `90490674854-clne9usjo771k280mo2l3t370fb42adj.apps.googleusercontent.com`
2. Verifique se não há múltiplos IDs do Cliente
3. Edite o correto

### Verificar Tela de Consentimento

1. Vá em **"APIs e Serviços"** > **"Tela de consentimento OAuth"**
2. Verifique se está configurada como **"Externo"**
3. Verifique se seu email está em **"Usuários de teste"**

---

## 🆘 Solução Alternativa: Recriar o ID do Cliente

Se nada funcionar, podemos recriar o ID do Cliente:

1. No Google Cloud Console, vá em **"Credenciais"**
2. **Exclua** o ID do Cliente atual
3. Crie um novo:
   - Tipo: **"Aplicativo da Web"**
   - Nome: "Visualizador Drive Web 2"
   - **Origens JavaScript autorizadas**: `http://localhost:3000`
   - **URIs de redirecionamento**: `http://localhost:3000` e `http://localhost:3000/login`
4. Copie o novo Client ID
5. Atualize o arquivo `.env` com o novo Client ID
6. Reinicie o servidor

---

## 📋 Checklist Completo

- [ ] Verifiquei que a origem está salva no Google Cloud Console
- [ ] Verifiquei o formato correto (`http://localhost:3000`)
- [ ] Aguardei alguns minutos após salvar
- [ ] Limpei o cache do navegador
- [ ] Testei em modo anônimo
- [ ] Reiniciei o servidor
- [ ] Verifiquei que estou no projeto correto
- [ ] Verifiquei que estou editando o ID do Cliente correto
- [ ] Verifiquei que meu email está em usuários de teste

---

## 💡 Dica Final

Tire uma **captura de tela** da página de edição do ID do Cliente mostrando:
- As "Origens JavaScript autorizadas"
- As "URIs de redirecionamento autorizados"

Isso ajuda a verificar se está tudo correto.

---

**Se ainda não funcionar após todas essas verificações, me envie:**
1. Uma captura de tela da configuração do ID do Cliente
2. A mensagem de erro completa do console do navegador
3. O que você vê no console quando carrega a página

