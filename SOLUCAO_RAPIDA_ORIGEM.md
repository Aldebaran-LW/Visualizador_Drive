# 🚨 SOLUÇÃO RÁPIDA - Adicionar Origem Autorizada

## ⚡ Ação Imediata Necessária

Você **PRECISA** adicionar `http://localhost:3000` no Google Cloud Console. Não há como contornar isso pelo código.

---

## 🎯 Passos Rápidos (2 minutos)

### 1️⃣ Abrir o Link Direto

**Clique neste link:**
👉 **https://console.cloud.google.com/apis/credentials**

### 2️⃣ Encontrar Seu Cliente OAuth

1. Na lista, procure por: **"Visualizador Drive Web"** (ou o nome que você deu)
2. Ou procure pelo ID: `90490674854-clne9usjo771k280mo2l3t370fb42adj`
3. Clique no **ícone de lápis** ✏️ (editar) à direita

### 3️⃣ Adicionar a Origem

Na página que abrir, você verá duas seções importantes:

#### Seção 1: "Origens JavaScript autorizadas"
1. Clique em **"+ ADICIONAR URI"**
2. Digite: `http://localhost:3000`
3. Pressione Enter ou clique fora

#### Seção 2: "URIs de redirecionamento autorizados"
1. Verifique se já tem:
   - `http://localhost:3000`
   - `http://localhost:3000/login`
2. Se não tiver, adicione clicando em **"+ ADICIONAR URI"**

### 4️⃣ SALVAR (MUITO IMPORTANTE!)

1. **Role a página até o final**
2. Clique no botão azul **"SALVAR"** (ou "SAVE")
3. **AGUARDE** alguns segundos (pode levar até 1 minuto para aplicar)

### 5️⃣ Testar

1. Volte para `http://localhost:3000`
2. **Recarregue a página** (F5 ou Ctrl+R)
3. Tente fazer login novamente

---

## ⚠️ Erros Comuns

### ❌ "Eu adicionei mas ainda dá erro"
- Você **SALVOU** as alterações? (botão SALVAR no final da página)
- Você aguardou alguns segundos após salvar?
- Você recarregou a página da aplicação?

### ❌ "Não encontro a seção"
- Certifique-se de que está editando o **ID do Cliente OAuth** correto
- Procure por "Origens JavaScript autorizadas" ou "Authorized JavaScript origins"
- Pode estar em uma seção expansível - clique para expandir

### ❌ "Está dando erro ao salvar"
- Verifique se você digitou corretamente: `http://localhost:3000`
- Não use `https://`
- Não adicione barra no final (`/`)
- Não use `127.0.0.1` - use `localhost`

---

## 📸 Como Deve Ficar

**Origens JavaScript autorizadas:**
```
http://localhost:3000
```

**URIs de redirecionamento autorizados:**
```
http://localhost:3000
http://localhost:3000/login
```

---

## ✅ Checklist Final

- [ ] Acessei o Google Cloud Console
- [ ] Encontrei e editei o ID do Cliente OAuth
- [ ] Adicionei `http://localhost:3000` em "Origens JavaScript autorizadas"
- [ ] Verifiquei/adicionei as URIs de redirecionamento
- [ ] **SALVEI as alterações** (botão SALVAR)
- [ ] Aguardei alguns segundos
- [ ] Recarreguei a página da aplicação (F5)
- [ ] Tentei fazer login novamente

---

## 🆘 Ainda Não Funciona?

Se após seguir todos os passos ainda não funcionar:

1. **Limpe o cache do navegador:**
   - Pressione Ctrl+Shift+Delete
   - Selecione "Imagens e arquivos em cache"
   - Limpe

2. **Tente em uma aba anônima:**
   - Ctrl+Shift+N (Chrome) ou Ctrl+Shift+P (Firefox)
   - Acesse `http://localhost:3000`

3. **Verifique se você está no projeto correto:**
   - No topo do Google Cloud Console, verifique o nome do projeto
   - Deve ser "Visualizador Drive"

---

**Este é um passo OBRIGATÓRIO que não pode ser pulado!** ⚠️

