# 🔧 Corrigir Erro: Origem Não Autorizada

## ❌ Erro
```
Not a valid origin for the client: http://localhost:3000 has not been registered
```

## ✅ Solução: Adicionar Origem Autorizada

Você precisa adicionar `http://localhost:3000` como origem autorizada no Google Cloud Console.

---

## 📝 Passo a Passo

### 1. Acessar Google Cloud Console

1. Acesse: **https://console.cloud.google.com/**
2. Certifique-se de que está no projeto correto: **"Visualizador Drive"**

### 2. Ir para Credenciais

1. No menu lateral, clique em **"APIs e Serviços"** (ou "APIs & Services")
2. Clique em **"Credenciais"** (ou "Credentials")

### 3. Editar o ID do Cliente OAuth

1. Na lista de credenciais, encontre seu **ID do Cliente OAuth**
   - Nome: "Visualizador Drive Web" (ou o nome que você deu)
   - ID: `90490674854-clne9usjo771k280mo2l3t370fb42adj.apps.googleusercontent.com`

2. Clique no **ícone de lápis** (editar) ao lado do ID do Cliente

### 4. Adicionar Origens Autorizadas

Na página de edição, você verá várias seções:

1. Procure pela seção **"Origens JavaScript autorizadas"** (ou "Authorized JavaScript origins")

2. Clique em **"+ ADICIONAR URI"** (ou "+ ADD URI")

3. Adicione:
   ```
   http://localhost:3000
   ```

4. **IMPORTANTE**: Certifique-se de que também está em **"URIs de redirecionamento autorizados"**:
   - Se não estiver, adicione também:
     ```
     http://localhost:3000
     ```
     e
     ```
     http://localhost:3000/login
     ```

### 5. Salvar

1. Role a página até o final
2. Clique em **"SALVAR"** (ou "SAVE")
3. Aguarde alguns segundos para as alterações serem aplicadas

### 6. Testar Novamente

1. Volte para a aplicação
2. Recarregue a página (F5)
3. Tente fazer login novamente

---

## 📸 O Que Você Deve Ver

Na seção "Origens JavaScript autorizadas", você deve ter:

```
http://localhost:3000
```

Na seção "URIs de redirecionamento autorizados", você deve ter:

```
http://localhost:3000
http://localhost:3000/login
```

---

## ⚠️ Importante

- Use **`http://`** (não `https://`)
- Use **`localhost:3000`** (não `127.0.0.1:3000`)
- **Não** adicione barra no final (`http://localhost:3000/` está errado)
- Certifique-se de **salvar** as alterações

---

## ✅ Checklist

- [ ] Acessei o Google Cloud Console
- [ ] Estou no projeto correto
- [ ] Fui em "APIs e Serviços" > "Credenciais"
- [ ] Editei o ID do Cliente OAuth
- [ ] Adicionei `http://localhost:3000` em "Origens JavaScript autorizadas"
- [ ] Adicionei `http://localhost:3000` em "URIs de redirecionamento autorizados"
- [ ] Adicionei `http://localhost:3000/login` em "URIs de redirecionamento autorizados"
- [ ] Salvei as alterações
- [ ] Recarreguei a página da aplicação
- [ ] Tentei fazer login novamente

---

**Depois de fazer essas alterações, o erro deve desaparecer! 🎉**

