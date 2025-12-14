# 🔍 Como Encontrar "Usuários de Teste" - Guia Detalhado

Se você não está encontrando a seção de "Usuários de teste", siga este guia passo a passo:

---

## 📍 Onde Está a Seção "Usuários de Teste"?

A seção "Usuários de teste" está na **Tela de Consentimento OAuth**, NÃO na seção de Credenciais!

---

## 🎯 Passo a Passo Detalhado

### 1. Acesse a Tela de Consentimento OAuth

1. No Google Cloud Console, no menu lateral esquerdo
2. Clique em **"APIs e Serviços"** (ou "APIs & Services")
3. No submenu que aparece, clique em **"Tela de consentimento OAuth"** (ou "OAuth consent screen")
   - ⚠️ **NÃO** clique em "Credenciais" - são coisas diferentes!

### 2. Se Você Já Configurou Antes

Se você já passou pela configuração inicial, você verá uma página com várias **abas** no topo:

- Visão geral
- Identidade visual  
- **Público-alvo** ← **CLIQUE AQUI!**
- Acesso a dados
- Central de verificação
- Configurações

**Clique na aba "Público-alvo"** (ou "Audience")

### 3. Encontrar "Usuários de Teste"

Na aba "Público-alvo", role a página para baixo. Você verá:

1. **Tipo de usuário**: Externo ou Interno
2. **Domínios autorizados**: (pode estar vazio)
3. **Usuários de teste** ← **ESTA É A SEÇÃO!**

Na seção "Usuários de teste", você verá:
- Uma lista de emails (pode estar vazia)
- Um botão **"+ ADICIONAR USUÁRIOS"** ou **"Adicionar usuários"**
- Ou um campo de texto com um botão "Adicionar"

### 4. Adicionar Seu Email

1. Clique em **"+ ADICIONAR USUÁRIOS"** ou **"Adicionar usuários"**
2. Uma caixa de diálogo ou campo de texto vai aparecer
3. Digite seu email (o mesmo que você usa no Google)
4. Clique em **"ADICIONAR"** ou **"ADD"**
5. Seu email deve aparecer na lista
6. Clique em **"SALVAR"** no final da página (se houver)

---

## 🆘 Se Ainda Não Encontrar

### Verifique se Você Está no Lugar Certo:

- ✅ Você está em: **APIs e Serviços** > **Tela de consentimento OAuth** > **Público-alvo**
- ❌ Você NÃO está em: **APIs e Serviços** > **Credenciais**

### Se Você Está na Primeira Vez Configurando:

Se você está configurando pela primeira vez, você verá um **wizard** (assistente) com vários passos:

1. **Passo 1**: Informações do app
2. **Passo 2**: Escopos
3. **Passo 3**: **Usuários de teste** ← Este é o passo que você precisa!
4. **Passo 4**: Resumo

Certifique-se de estar no **Passo 3** do wizard.

---

## 📸 O Que Você Deve Ver

Quando encontrar a seção correta, você verá algo assim:

```
┌─────────────────────────────────────┐
│ Usuários de teste                   │
├─────────────────────────────────────┤
│                                     │
│  [Lista de emails aqui]            │
│                                     │
│  [+ ADICIONAR USUÁRIOS]            │
│                                     │
└─────────────────────────────────────┘
```

---

## 💡 Dica Importante

**Você PRECISA adicionar seu email como usuário de teste** para poder fazer login na aplicação durante o desenvolvimento!

Sem isso, você receberá um erro dizendo que o acesso foi bloqueado.

---

## ✅ Checklist

Antes de continuar, verifique:

- [ ] Você está na página "Tela de consentimento OAuth"
- [ ] Você clicou na aba "Público-alvo" (se já configurou antes)
- [ ] Você encontrou a seção "Usuários de teste"
- [ ] Você adicionou seu email na lista
- [ ] Você salvou as alterações

---

## 🆘 Ainda com Problemas?

Se mesmo assim não conseguir encontrar:

1. **Tire uma captura de tela** da página onde você está
2. Verifique se você está no projeto correto (dropdown no topo)
3. Certifique-se de que você tem permissões de "Proprietário" ou "Editor" no projeto
4. Tente usar outro navegador ou limpar o cache

---

**Boa sorte! 🍀**

