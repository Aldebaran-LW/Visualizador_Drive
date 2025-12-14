# 🔧 Solução: Dois Projetos - Habilitar Google Drive API

## 📊 Situação Atual

Você tem **2 projetos diferentes**:

### 1. **Projeto "Visualizador de Drive"** (sem restrições)
- **Project ID:** `visualizador-drive`
- **Client ID:** `90490674854-clne9usjo771k280mo2l3t370fb42adj.apps.googleusercontent.com`
- **API Key:** `AIzaSyAYzcg6KlktoHNnhlY0GteMY7VScCK1wg4`
- ✅ **Status:** Sem restrições de API

### 2. **Projeto "LW_Digital_Forge"** (Firebase - COM RESTRIÇÕES)
- **Project ID:** `lwdigitalforge-577c4`
- **Project Number:** `469330532024`
- **Client ID:** `469330532024-1sv5onbtikt2qoapn0js0u7pckt86k7j.apps.googleusercontent.com`
- **API Key:** `AIzaSyDDkqKtL4VtaykNWCho9Ozj3mTRKQNEUPQ`
- ❌ **Status:** Google Drive API **NÃO HABILITADA**

---

## ⚠️ Problema

O **Firebase está usando o projeto "LW_Digital_Forge"**, mas a **Google Drive API não está habilitada** nesse projeto.

---

## ✅ Solução: Habilitar Google Drive API no Projeto Firebase

### Passo 1: Acesse o Google Cloud Console

👉 **Link Direto:**
https://console.developers.google.com/apis/api/drive.googleapis.com/overview?project=469330532024

### Passo 2: Habilite a Google Drive API

1. Clique no botão **"ATIVAR"** ou **"ENABLE"**
2. Aguarde a confirmação

### Passo 3: Verifique se Está Habilitada

1. Vá em: https://console.cloud.google.com/apis/dashboard?project=469330532024
2. Procure por **"Google Drive API"** na lista
3. Deve aparecer como **"Habilitada"**

### Passo 4: Aguarde a Propagação

- ⏱️ Aguarde **2-5 minutos** após habilitar
- A API precisa se propagar pelos sistemas do Google

### Passo 5: Teste Novamente

1. Recarregue a página da aplicação (F5)
2. Tente carregar os vídeos novamente

---

## 🔄 Alternativa: Usar o Projeto "Visualizador de Drive"

Se preferir usar o projeto que já não tem restrições, você precisaria:

1. Criar um novo projeto Firebase no projeto "Visualizador de Drive"
2. Atualizar as credenciais no código

**Mas é mais fácil apenas habilitar a API no projeto atual!**

---

## 📋 Resumo Rápido

1. ✅ Acesse: https://console.developers.google.com/apis/api/drive.googleapis.com/overview?project=469330532024
2. ✅ Clique em **"ATIVAR"**
3. ✅ Aguarde 2-5 minutos
4. ✅ Recarregue a aplicação
5. ✅ Teste novamente

---

## 🔗 Links Úteis

- **Habilitar Drive API:** https://console.developers.google.com/apis/api/drive.googleapis.com/overview?project=469330532024
- **APIs Habilitadas:** https://console.cloud.google.com/apis/dashboard?project=469330532024
- **Google Cloud Console:** https://console.cloud.google.com/

---

**Após habilitar, aguarde alguns minutos e tente novamente!** ⏱️

